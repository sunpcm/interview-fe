import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
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

// ==================== SVG Icons ====================
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 6H6v8h8V6z" />
      <path
        fillRule="evenodd"
        d="M9.25 3V1.75a.75.75 0 011.5 0V3h1.5V1.75a.75.75 0 011.5 0V3h.5A2.75 2.75 0 0117 5.75v.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v.5A2.75 2.75 0 0114.25 17h-.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-.5A2.75 2.75 0 013 14.25v-.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-.5A2.75 2.75 0 015.75 3h.5V1.75a.75.75 0 011.5 0V3h1.5zM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ==================== Sub-components ====================
const difficultyDot: Record<Difficulty, string> = {
  Easy: 'bg-green-400',
  Medium: 'bg-yellow-400',
  Hard: 'bg-red-400',
};

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'bg-green-50 text-green-700 ring-green-600/20',
  Medium: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  Hard: 'bg-red-50 text-red-700 ring-red-600/20',
};

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        difficultyColors[difficulty]
      )}
    >
      {difficulty}
    </span>
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
  const [hasRun, setHasRun] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => algorithms.find(a => a.id === selectedId) ?? algorithms[0],
    [selectedId]
  );

  const buildFullCode = useCallback(
    (item: AlgorithmItem) =>
      `// ===== 源码 =====\n${item.sourceCode}\n// ===== 测试 =====\n${item.testCode}\n`,
    []
  );

  useEffect(() => {
    setCode(buildFullCode(selected));
    setOutput('');
    setError(null);
    setHasRun(false);
  }, [selected, buildFullCode]);

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

  const grouped = useMemo(() => {
    const map = new Map<string, AlgorithmItem[]>();
    for (const a of filtered) {
      const list = map.get(a.category) || [];
      list.push(a);
      map.set(a.category, list);
    }
    return map;
  }, [filtered]);

  // Category item counts (from full algorithms, not filtered)
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of algorithms) {
      if (activeGroup !== 'all' && a.group !== activeGroup) continue;
      counts.set(a.category, (counts.get(a.category) || 0) + 1);
    }
    return counts;
  }, [activeGroup]);

  const visibleCategories = useMemo(() => {
    if (activeGroup === 'all') return categories;
    return categories.filter(c =>
      algorithms.some(a => a.category === c && a.group === activeGroup)
    );
  }, [categories, activeGroup]);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setTimeout(() => {
      const result = runCode(code);
      setOutput(result.output);
      setError(result.error);
      setIsRunning(false);
      setHasRun(true);
    }, 10);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(buildFullCode(selected));
    setOutput('');
    setError(null);
    setHasRun(false);
  }, [selected, buildFullCode]);

  const handleClearOutput = useCallback(() => {
    setOutput('');
    setError(null);
    setHasRun(false);
  }, []);

  const highlightCode = useCallback(
    (code: string) =>
      Prism.highlight(code, Prism.languages.typescript, 'typescript'),
    []
  );

  // Group counts for tabs
  const groupCounts = useMemo(() => {
    const algo = algorithms.filter(a => a.group === 'algorithm').length;
    const js = algorithms.filter(a => a.group === 'javascript').length;
    return { all: algorithms.length, algorithm: algo, javascript: js };
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* ==================== Sidebar ==================== */}
      <aside className="flex w-72 flex-shrink-0 flex-col border-r border-gray-200 bg-white overflow-hidden">
        {/* Search */}
        <div className="p-3 pb-2">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索题目、标签..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
            />
          </div>
        </div>

        {/* Group tabs */}
        <div className="flex border-b border-gray-200 px-3">
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
                'relative px-3 py-2 text-xs font-medium transition-colors',
                activeGroup === key
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {label}
              <span
                className={cn(
                  'ml-1 text-[10px]',
                  activeGroup === key ? 'text-blue-400' : 'text-gray-400'
                )}
              >
                {groupCounts[key]}
              </span>
              {activeGroup === key && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5 px-3 py-2.5 border-b border-gray-100">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'rounded-md px-2 py-0.5 text-xs font-medium transition-all',
              !activeCategory
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            全部
          </button>
          {visibleCategories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(activeCategory === c ? null : c)}
              className={cn(
                'rounded-md px-2 py-0.5 text-xs font-medium transition-all',
                activeCategory === c
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {c}
              <span
                className={cn(
                  'ml-0.5 text-[10px]',
                  activeCategory === c ? 'text-blue-200' : 'text-gray-400'
                )}
              >
                {categoryCounts.get(c) || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Algorithm list */}
        <div ref={listRef} className="flex-1 overflow-y-auto">
          {Array.from(grouped.entries()).map(([category, items]) => (
            <div key={category} className="py-1">
              <h3 className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-4 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {category}
                <span className="ml-1 text-gray-300">{items.length}</span>
              </h3>
              <div className="px-2">
                {items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      'group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition-all',
                      selectedId === item.id
                        ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <span
                      className={cn(
                        'h-2 w-2 flex-shrink-0 rounded-full',
                        difficultyDot[item.difficulty]
                      )}
                    />
                    <span className="truncate leading-snug">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <SearchIcon className="h-8 w-8 mb-2" />
              <p className="text-sm">没有匹配的题目</p>
            </div>
          )}
        </div>

        {/* Stats footer */}
        <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-2 text-[11px] text-gray-400 flex items-center justify-between">
          <span>共 {algorithms.length} 题</span>
          <span>显示 {filtered.length} 题</span>
        </div>
      </aside>

      {/* ==================== Main content ==================== */}
      <main className="flex flex-1 flex-col overflow-hidden bg-gray-50">
        {/* Algorithm info bar */}
        <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold text-gray-900 truncate">
                  {selected.name}
                </h1>
                <DifficultyBadge difficulty={selected.difficulty} />
              </div>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                {selected.description}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              {selected.tags.map(t => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Divider */}
            {(selected.timeComplexity || selected.spaceComplexity) && (
              <span className="hidden sm:block h-4 w-px bg-gray-200" />
            )}

            {/* Complexity */}
            {selected.timeComplexity && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <ClockIcon className="h-3.5 w-3.5 text-gray-400" />
                {selected.timeComplexity}
              </span>
            )}
            {selected.spaceComplexity && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <CpuIcon className="h-3.5 w-3.5 text-gray-400" />
                {selected.spaceComplexity}
              </span>
            )}
          </div>
        </div>

        {/* ==================== Editor + Output ==================== */}
        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          {/* Code editor panel */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Editor toolbar */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700">Code</span>
                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                  TypeScript
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="rounded-md px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all',
                    isRunning
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:scale-[0.97]'
                  )}
                >
                  <PlayIcon className="h-3 w-3" />
                  {isRunning ? 'Running...' : 'Run'}
                  {!isRunning && (
                    <kbd className="ml-1 rounded bg-emerald-500/30 px-1 py-px text-[10px] text-emerald-100">
                      {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}+Enter
                    </kbd>
                  )}
                </button>
              </div>
            </div>

            {/* Editor body */}
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
          <div className="flex w-full flex-col overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-200 lg:w-[420px]">
            {/* Output toolbar */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700">
                  Output
                </span>
                {hasRun && !error && (
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 ring-1 ring-inset ring-emerald-500/20">
                    Success
                  </span>
                )}
                {error && (
                  <span className="inline-flex items-center rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-medium text-red-600 ring-1 ring-inset ring-red-500/20">
                    Error
                  </span>
                )}
              </div>
              {(output || error) && (
                <button
                  onClick={handleClearOutput}
                  className="rounded-md px-2 py-0.5 text-[11px] text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Output body */}
            <div
              className={cn(
                'flex-1 overflow-auto',
                error && !output ? 'bg-red-50/50' : 'bg-[#1e1e1e]'
              )}
            >
              {!output && !error && (
                <div className="flex h-full flex-col items-center justify-center text-gray-500">
                  <TerminalIcon className="h-10 w-10 mb-3 text-gray-600" />
                  <p className="text-sm text-gray-500">等待运行</p>
                  <p className="mt-1 text-xs text-gray-600">
                    点击 Run 或按{' '}
                    <kbd className="rounded border border-gray-600 bg-gray-700 px-1 py-px text-[10px] text-gray-300">
                      {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}
                    </kbd>
                    +
                    <kbd className="rounded border border-gray-600 bg-gray-700 px-1 py-px text-[10px] text-gray-300">
                      Enter
                    </kbd>
                  </p>
                </div>
              )}
              {(output || error) && (
                <pre className="p-4 font-mono text-[13px] leading-relaxed">
                  {output && <span className="text-gray-200">{output}</span>}
                  {error && (
                    <span className="text-red-400">
                      {output ? '\n\n' : ''}
                      <span className="font-semibold">Error:</span> {error}
                    </span>
                  )}
                </pre>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
