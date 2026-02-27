import { useState, useCallback, useEffect, useMemo } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-okaidia.css';
import {
  algorithms,
  getCategories,
  type AlgorithmItem,
  type Difficulty,
} from '@/data/algorithms';
import { cn } from '@/utils';

// ==================== Type Stripping ====================
function stripTypeScript(code: string): string {
  let result = code;

  // Remove export keywords
  result = result.replace(/\bexport\s+/g, '');

  // Remove interface blocks (multiline)
  result = result.replace(/interface\s+\w+[\s\S]*?\n\}/g, '');

  // Remove type alias declarations
  result = result.replace(/^\s*type\s+\w+\s*=\s*[^;]+;/gm, '');

  // Remove access modifiers
  result = result.replace(/\b(private|public|protected|readonly)\s+/g, '');

  // Remove generic type params (handle nested)
  let prev = '';
  while (prev !== result) {
    prev = result;
    result = result.replace(/<[^<>(){}]*?>/g, '');
  }

  // Remove 'as Type' assertions
  result = result.replace(/\s+as\s+\w+(\[\])?/g, '');

  // Remove function return type annotations: ): Type => or ): Type {
  result = result.replace(
    /\)\s*:\s*[A-Za-z][A-Za-z0-9_.|[\] ]*(?=\s*[{=>])/g,
    ')'
  );

  // Remove parameter/property type annotations: name: Type or name?: Type
  // Matches word(optional ?): TypeExpr before , ) = ; {
  result = result.replace(
    /(\w)\??\s*:\s*(?:\{[^}]*\}|[A-Za-z][A-Za-z0-9_.|[\] ]*)(?=\s*[,)=;{])/g,
    '$1'
  );

  // Remove variable declaration type annotations: let/const/var name: Type =
  result = result.replace(
    /((?:let|const|var)\s+\w+)\s*:\s*(?:\{[^}]*\}|[A-Za-z][A-Za-z0-9_.|[\] ]*)(?=\s*=)/g,
    '$1'
  );

  return result;
}

// ==================== Code Runner ====================
function formatValue(val: unknown): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'function') return val.toString();
  try {
    return JSON.stringify(val, null, 2);
  } catch {
    return String(val);
  }
}

function runCode(code: string): { output: string; error: string | null } {
  const logs: string[] = [];
  const savedLog = console.log;
  const savedTime = console.time;
  const savedTimeEnd = console.timeEnd;
  const timers: Record<string, number> = {};

  try {
    console.log = (...args: unknown[]) => {
      logs.push(args.map(formatValue).join(' '));
    };
    console.time = (label = 'default') => {
      timers[label] = performance.now();
    };
    console.timeEnd = (label = 'default') => {
      const start = timers[label];
      if (start !== undefined) {
        const elapsed = (performance.now() - start).toFixed(3);
        logs.push(`${label}: ${elapsed}ms`);
        delete timers[label];
      }
    };

    // Strip TS types and execute
    const jsCode = stripTypeScript(code);
    new Function(jsCode)();

    return { output: logs.join('\n'), error: null };
  } catch (e) {
    return {
      output: logs.join('\n'),
      error: e instanceof Error ? e.message : String(e),
    };
  } finally {
    console.log = savedLog;
    console.time = savedTime;
    console.timeEnd = savedTimeEnd;
  }
}

// ==================== Difficulty Badge ====================
const difficultyColors: Record<Difficulty, string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
};

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={cn(
        'inline-block rounded px-2 py-0.5 text-xs font-medium',
        difficultyColors[difficulty]
      )}
    >
      {difficulty}
    </span>
  );
}

// ==================== Tag ====================
function Tag({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-2.5 py-0.5 text-xs transition-colors',
        active
          ? 'border-blue-500 bg-blue-50 text-blue-700'
          : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
      )}
    >
      {label}
    </button>
  );
}

// ==================== Main Component ====================
export default function Playground() {
  const categories = useMemo(() => getCategories(), []);
  const [selectedId, setSelectedId] = useState<string>(algorithms[0].id);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<
    'all' | 'algorithm' | 'javascript'
  >('all');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const selected = useMemo(
    () => algorithms.find(a => a.id === selectedId) ?? algorithms[0],
    [selectedId]
  );

  // Build full editable code from source + test
  const buildFullCode = useCallback(
    (item: AlgorithmItem) =>
      `// ===== 源码 =====\n${item.sourceCode}\n// ===== 测试 =====\n${item.testCode}\n`,
    []
  );

  // Update code when selection changes
  useEffect(() => {
    setCode(buildFullCode(selected));
    setOutput('');
    setError(null);
  }, [selected, buildFullCode]);

  // Filter algorithms
  const filtered = useMemo(() => {
    return algorithms.filter(a => {
      if (activeGroup !== 'all' && a.group !== activeGroup) return false;
      if (activeCategory && a.category !== activeCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, activeCategory, activeGroup]);

  // Group filtered by category
  const grouped = useMemo(() => {
    const map = new Map<string, AlgorithmItem[]>();
    for (const a of filtered) {
      const list = map.get(a.category) || [];
      list.push(a);
      map.set(a.category, list);
    }
    return map;
  }, [filtered]);

  // Visible categories based on active group
  const visibleCategories = useMemo(() => {
    if (activeGroup === 'all') return categories;
    return categories.filter(c =>
      algorithms.some(a => a.category === c && a.group === activeGroup)
    );
  }, [categories, activeGroup]);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    // Use setTimeout to let UI update
    setTimeout(() => {
      const result = runCode(code);
      setOutput(result.output);
      setError(result.error);
      setIsRunning(false);
    }, 10);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(buildFullCode(selected));
    setOutput('');
    setError(null);
  }, [selected, buildFullCode]);

  const highlightCode = useCallback(
    (code: string) =>
      Prism.highlight(code, Prism.languages.typescript, 'typescript'),
    []
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="flex w-72 flex-shrink-0 flex-col border-r bg-gray-50 overflow-hidden">
        {/* Search */}
        <div className="border-b p-3">
          <input
            type="text"
            placeholder="搜索算法..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Group filter */}
        <div className="flex gap-1 border-b p-3">
          {(
            [
              ['all', '全部'],
              ['algorithm', '算法'],
              ['javascript', 'JS手写'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveGroup(key);
                setActiveCategory(null);
              }}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                activeGroup === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1 border-b p-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'rounded-full px-2 py-0.5 text-xs transition-colors',
              !activeCategory
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            全部分类
          </button>
          {visibleCategories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(activeCategory === c ? null : c)}
              className={cn(
                'rounded-full px-2 py-0.5 text-xs transition-colors',
                activeCategory === c
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Algorithm list */}
        <div className="flex-1 overflow-y-auto p-2">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <div key={category} className="mb-3">
              <h3 className="mb-1 px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {category}
              </h3>
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                    selectedId === item.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <DifficultyBadge difficulty={item.difficulty} />
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-2 py-4 text-center text-sm text-gray-400">
              没有匹配的算法
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="border-t bg-white px-3 py-2 text-xs text-gray-400">
          共 {algorithms.length} 题 | 显示 {filtered.length} 题
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header bar */}
        <div className="border-b bg-white px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {selected.name}
              </h1>
              <p className="mt-0.5 text-sm text-gray-500">
                {selected.description}
              </p>
            </div>
            <DifficultyBadge difficulty={selected.difficulty} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {selected.tags.map(t => (
              <Tag key={t} label={t} />
            ))}
            {selected.timeComplexity && (
              <span className="ml-2 text-xs text-gray-400">
                Time: {selected.timeComplexity}
              </span>
            )}
            {selected.spaceComplexity && (
              <span className="text-xs text-gray-400">
                Space: {selected.spaceComplexity}
              </span>
            )}
          </div>
        </div>

        {/* Editor + Output */}
        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          {/* Code editor */}
          <div className="flex flex-1 flex-col border-r overflow-hidden">
            <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
              <span className="text-xs font-medium text-gray-500">
                代码编辑器
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="rounded border border-gray-300 bg-white px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  重置
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="rounded bg-green-600 px-4 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {isRunning ? '运行中...' : '运行 ⌘↵'}
                </button>
              </div>
            </div>
            <div
              className="flex-1 overflow-auto bg-[#272822]"
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleRun();
                }
              }}
            >
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={highlightCode}
                padding={16}
                className="min-h-full"
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: '#f8f8f2',
                  caretColor: '#f8f8f2',
                }}
              />
            </div>
          </div>

          {/* Output panel */}
          <div className="flex w-full flex-col overflow-hidden lg:w-96">
            <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
              <span className="text-xs font-medium text-gray-500">
                运行结果
              </span>
              {error && (
                <span className="text-xs font-medium text-red-500">Error</span>
              )}
            </div>
            <pre
              className={cn(
                'flex-1 overflow-auto p-4 font-mono text-sm',
                error ? 'bg-red-50' : 'bg-gray-900 text-gray-100'
              )}
            >
              {output && <span>{output}</span>}
              {error && (
                <span className="text-red-400">
                  {output ? '\n\n' : ''}
                  Error: {error}
                </span>
              )}
              {!output && !error && (
                <span className="text-gray-500">
                  点击「运行」按钮或按 ⌘+Enter 执行代码
                </span>
              )}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
