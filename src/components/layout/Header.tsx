import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/playground', label: '算法题库' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            加油！
          </Link>
          <nav className="flex space-x-1">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  location.pathname === to
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
