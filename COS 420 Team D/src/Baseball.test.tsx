import { render, screen } from '@testing-library/react';
import Baseball from './Baseball';

// Mock fetch request response
const mockGameData = {
  Game: {
    Type: "Baseball",
    HasStarted: true,
    IsComplete: false,
    Date: "October 15, 2023",
    HomeTeam: {
      Name: "Maine",
      Score: 5,
      Logo: "https://maine-logo.png",
    },
    VisitingTeam: {
      Name: "Boston College",
      Score: 3,
      Logo: "https://bc-logo.png",
    },
  }
};

// Mock global fetch
global.fetch = vi.fn();

describe('Baseball Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup mock fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => mockGameData
    });
  });

  it('renders the baseball component with loading state initially', async () => {
    const { container } = render(<Baseball />);
    // Initial render should show empty logos and scores of 0 by default
    expect(container.querySelector('img[alt="Home Team Logo"]')).toBeInTheDocument();
    expect(container.querySelector('img[alt="Visiting Team Logo"]')).toBeInTheDocument();
    expect(screen.getByText('0 - 0')).toBeInTheDocument();
  });

  it('fetches and displays baseball data correctly', async () => {
    render(<Baseball />);

    // Wait for the useEffect and fetch to complete
    await vi.waitFor(() => {
      expect(screen.getByText('5 - 3')).toBeInTheDocument();
    });

    expect(screen.getByText('October 15, 2023')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith("https://sidearmstats.com/umaine/baseball/game.json");
  });

  it('handles fetch error', async () => {
    // Testing when an API call fails
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<Baseball />);
    
    // Verify error is properly logged to the console
    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching game data:', expect.any(Error));
    });
    
    // Reset for next test
    consoleSpy.mockRestore();
  });

  it('properly updates state with fetched data', async () => {
    render(<Baseball />);

    await vi.waitFor(() => {
      // Test if all the data was updated right
      expect(screen.getByText('5 - 3')).toBeInTheDocument();

      const homeLogoImg = screen.getByAltText('Home Team Logo');
      const visitingLogoImg = screen.getByAltText('Visiting Team Logo');

      expect(homeLogoImg).toHaveAttribute('src', 'https://maine-logo.png');
      expect(visitingLogoImg).toHaveAttribute('src', 'https://bc-logo.png');
    });
  });

  //Checking if the logos render properly
  it('applies proper styling to the logos', async () => {
    render(<Baseball />);
    
    await vi.waitFor(() => {
      const homeLogoImg = screen.getByAltText('Home Team Logo');
      const visitingLogoImg = screen.getByAltText('Visiting Team Logo');
      
      expect(homeLogoImg).toHaveStyle({
        width: '100px',
        height: '100px'
      });
      
      expect(visitingLogoImg).toHaveStyle({
        width: '100px',
        height: '100px'
      });
    });
  });
});