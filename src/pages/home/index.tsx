import { Link } from 'react-router-dom';
import { Card } from '@/components';
import { algorithms } from '@/data/algorithms';

const stats = {
  total: algorithms.length,
  easy: algorithms.filter(a => a.difficulty === 'Easy').length,
  medium: algorithms.filter(a => a.difficulty === 'Medium').length,
  hard: algorithms.filter(a => a.difficulty === 'Hard').length,
  algo: algorithms.filter(a => a.group === 'algorithm').length,
  js: algorithms.filter(a => a.group === 'javascript').length,
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          算法与 JS 手写题库
        </h1>
        <p className="text-gray-500 text-lg">
          在线浏览、编辑、运行你的算法实现，随时复习
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-500 mt-1">总题数</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600">{stats.easy}</div>
          <div className="text-sm text-gray-500 mt-1">Easy</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {stats.medium}
          </div>
          <div className="text-sm text-gray-500 mt-1">Medium</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-red-600">{stats.hard}</div>
          <div className="text-sm text-gray-500 mt-1">Hard</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            算法题 ({stats.algo})
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            排序搜索、数组操作、字符串、数学、数据结构
          </p>
          <Link
            to="/playground"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            开始练习 &rarr;
          </Link>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            JS 手写题 ({stats.js})
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            柯里化、深拷贝、防抖节流、设计模式、原型链
          </p>
          <Link
            to="/playground"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            开始练习 &rarr;
          </Link>
        </Card>
      </div>
    </div>
  );
}
