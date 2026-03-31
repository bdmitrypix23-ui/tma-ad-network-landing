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

  it('содержит основные секции страницы', () => {
    const { container } = render(<App />);
    // есть главный контейнер
    expect(container.querySelector('main')).toBeInTheDocument();
    // есть секции
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });

  it('содержит кнопки действия', () => {
    const { container } = render(<App />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('рендерит карточки каналов', () => {
    const { container } = render(<App />);
    // карточки каналов — элементы с классом snap-center внутри горизонтального скролла
    const cards = container.querySelectorAll('.snap-center');
    expect(cards.length).toBeGreaterThanOrEqual(5);
  });

  it('отображает секцию "Нам доверяют"', () => {
    render(<App />);
    expect(screen.getByText('Нам доверяют')).toBeInTheDocument();
  });

  it('рендерит чипы клиентов', () => {
    render(<App />);
    expect(screen.getAllByText('Модели 30+').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('VPN Персик').length).toBeGreaterThanOrEqual(1);
  });

  it('не содержит бегущей строки', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.animate-marquee')).toBeNull();
  });
});
