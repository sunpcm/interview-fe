import { Button, Card } from '@/components';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Algorithm Page
        </h1>
        <p className="text-gray-600 mb-6">这是使用 React Router 创建的首页。</p>
        <Button>开始探索</Button>
      </Card>
    </div>
  );
}
