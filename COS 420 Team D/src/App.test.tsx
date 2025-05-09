import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the homepage content', () => {
    render(<App />);
    expect(screen.getByText('Black Bear Bulletin')).toBeInTheDocument();
    expect(screen.getByText('Click here for the Dashboard!')).toBeInTheDocument();
   // expect(screen.getByText('Click here for the Baseball')).toBeInTheDocument();
  });

  it('shows navigation buttons', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

});