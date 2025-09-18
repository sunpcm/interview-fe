import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', async () => {
    render(<App />);
    // 等待懒加载组件加载完成
    await waitFor(() => {
      expect(screen.getByText('Algorithm Page')).toBeInTheDocument();
    });
  });

  it('displays the header with navigation', async () => {
    render(<App />);

    // 检查头部导航 - 检查 header 区域内的特定元素
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // 检查导航区域存在
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('displays the home page content', async () => {
    render(<App />);

    // 等待页面内容加载
    await waitFor(() => {
      expect(screen.getByText('Algorithm Page')).toBeInTheDocument();
    });

    // 检查首页内容
    expect(
      screen.getByText('这是使用 React Router 创建的首页。')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '开始探索' })
    ).toBeInTheDocument();
  });

  it('renders the page layout correctly', () => {
    render(<App />);

    // 检查布局结构
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main content
  });
});
