import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import SignUp from './SignUp';

// Mock the Firebase auth module
vi.mock('./firebase', () => ({
  auth: {}
}));

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn()
}));

import { createUserWithEmailAndPassword } from 'firebase/auth';


//Test that the signup page renders correctly
describe('SignUp Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the sign up form with proper heading', () => {
    render(<SignUp />);
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('renders all form fields with correct labels', () => {
    render(<SignUp />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('updates form fields on user input', () => {
    render(<SignUp />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    expect(usernameInput).toHaveValue('testuser');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  it('shows error when passwords do not match', async () => {
    const { container } = render(<SignUp />);
    
    // Test of filling out the form
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'differentpassword' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    // 
    await waitFor(() => {
      const errorElement = container.querySelector('.error-message');
      expect(errorElement).not.toBeNull();
      expect(errorElement?.textContent).toBe('Passwords do not match');
    });
    
    // Verify the auth function was not called
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it('calls createUserWithEmailAndPassword when form is submitted with matching passwords', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: 'test-uid' }
    });
    
    // Spy on console.log
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<SignUp />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
    });
    
    // Verify console.log was called with success message
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('User created successfully!');
    });
    
    consoleLogSpy.mockRestore();
  });

  it('displays Firebase auth errors', async () => {
    const errorMessage = 'Firebase: Error (auth/email-already-in-use).';
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );
    
    const { container } = render(<SignUp />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);
    
    // Check for error message 
    await waitFor(() => {
      const errorElement = container.querySelector('.error-message');
      expect(errorElement).not.toBeNull();
      expect(errorElement?.textContent).toBe(errorMessage);
    });
  });

  it('properly contains a link to login page', () => {
    render(<SignUp />);
    
    // Ensure link text renders properly
    const textElement = screen.getByText('Already have an account?');
    expect(textElement).toBeInTheDocument();
    
    // Typescript did not like the possibility of this being null for some reason
    const parentElement = textElement.parentElement;
    expect(parentElement).not.toBeNull();
    
    if (parentElement) {
      // Ensure login link renders properly
      const loginLink = within(parentElement).getByRole('link');
      expect(loginLink).toHaveTextContent('Log in');
      expect(loginLink).toHaveAttribute('href', '/login');
    }
  });

  it('has the correct CSS classes for styling', () => {
    const { container } = render(<SignUp />);
    
    expect(container.querySelector('.signup-container')).toBeInTheDocument();
    expect(container.querySelector('.signup-form')).toBeInTheDocument();
    expect(container.querySelector('.form-group')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toHaveClass('signup-button');
    expect(container.querySelector('.login-link')).toBeInTheDocument();
  });
});