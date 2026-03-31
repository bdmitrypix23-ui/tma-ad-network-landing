import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

// framer-motion использует IntersectionObserver, которого нет в jsdom
class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver;

afterEach(cleanup);

describe('App', () => {
  it('рендерится без ошибок', () => {
    render(<App />);
  });

  it('показывает заголовок героя', () => {
    render(<App />);
    // текст "50 000" внутри h1 вместе с другими элементами
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('50 000');
    expect(heading).toHaveTextContent('твой пост');
  });

  it('показывает кнопки CTA', () => {
    render(<App />);
    expect(screen.getByText('Беру')).toBeInTheDocument();
    expect(screen.getByText('Разместиться')).toBeInTheDocument();
  });

  it('показывает все каналы', () => {
    render(<App />);
    expect(screen.getByText('Pussy Shit')).toBeInTheDocument();
    expect(screen.getByText('Horny shit')).toBeInTheDocument();
    expect(screen.getByText('Буба Клаб')).toBeInTheDocument();
    expect(screen.getByText('Shitty Kitty')).toBeInTheDocument();
  });

  it('показывает заголовок "Площадки"', () => {
    render(<App />);
    expect(screen.getByText('Площадки')).toBeInTheDocument();
  });

  it('показывает цену', () => {
    render(<App />);
    expect(screen.getByText('$150')).toBeInTheDocument();
    expect(screen.getByText(/Пакет/)).toBeInTheDocument();
  });

  it('показывает список преимуществ в прайсинге', () => {
    render(<App />);
    expect(screen.getByText('10 каналов разом')).toBeInTheDocument();
    expect(screen.getByText('1/24 или 2/48 формат')).toBeInTheDocument();
    expect(screen.getByText('~50 000 просмотров')).toBeInTheDocument();
  });

  it('показывает клиентов в бегущей строке', () => {
    render(<App />);
    const topors = screen.getAllByText('Топор');
    expect(topors.length).toBe(4);
  });

  it('показывает подпись "ответ в течение часа"', () => {
    render(<App />);
    expect(screen.getByText('ответ в течение часа')).toBeInTheDocument();
  });
});
