import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('', () => {
  it('renders the correct heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /The Cake Lab 3.0/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
