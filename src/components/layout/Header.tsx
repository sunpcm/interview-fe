import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            加油！
          </Link>
          <nav className="flex space-x-4">
            <Link to="/">
              <Button variant="ghost">加油！</Button>
            </Link>
            {/* <Link to="/about">
              <Button variant="ghost">加油！</Button>
            </Link> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
