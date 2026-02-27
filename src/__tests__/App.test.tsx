import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock algorithms data module (uses import.meta.glob which Jest cannot handle)
jest.mock('@/data/algorithms', () => ({
  algorithms: [
    {
      id: 'test',
      name: 'Test',
      category: 'Test',
      group: 'algorithm',
      difficulty: 'Easy',
      tags: [],
    },
  ],
  getCategories: () => ['Test'],
  getAllTags: () => [],
}));

import App from '../App';

describe('App Component', () => {
  it('renders without crashing', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('算法与 JS 手写题库')).toBeInTheDocument();
    });
  });

  it('displays the header with navigation', async () => {
    render(<App />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('displays the home page content', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('算法与 JS 手写题库')).toBeInTheDocument();
    });

    expect(
      screen.getByText('在线浏览、编辑、运行你的算法实现，随时复习')
    ).toBeInTheDocument();
  });

  it('renders the page layout correctly', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
