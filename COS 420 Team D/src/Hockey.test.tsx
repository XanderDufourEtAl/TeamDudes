import { render, screen } from '@testing-library/react';
import Hockey from './Hockey';


//Tests limited for this file since data is hardcoded


//Using Vitest to mock the data for a hockey game

vi.mock('./assets/jsons/Hockey.json', () => ({
  default: {
    meta: {
      title: 'Maine vs Penn State',
      description: 'Hockey Game - Oct 15, 2023',
      teams: [
        { id: '1', shortName: 'Maine' },
        { id: '2', shortName: 'Penn State' }
      ]
    },
    teams: [
      {
        teamId: 1,
        totalStats: {
          goals: '3',
          assists: '5',
          shots: '28'
        },
        playerStats: [],
        playerTotals: {
          goals: '3',
          assists: '5',
          shots: '28'
        }
      },
      {
        teamId: 2,
        totalStats: {
          goals: '2',
          assists: '4',
          shots: '25'
        },
        playerStats: [],
        playerTotals: {
          goals: '2',
          assists: '4',
          shots: '25'
        }
      }
    ]
  }
}));

describe('Hockey Component', () => {
  beforeEach(() => {
    // Clear any mocks that were made previously
    vi.clearAllMocks();
  });

  //Checking that information is properly rendered given the JSON data
  it('renders the component with correct game description', () => {
    render(<Hockey />);
    expect(screen.getByText('Hockey Game - Oct 15, 2023')).toBeInTheDocument();
  });

  it('displays correct team names', () => {
    render(<Hockey />);
    expect(screen.getByText('Maine | Penn State')).toBeInTheDocument();
  });

  it('displays the correct score', () => {
    render(<Hockey />);
    expect(screen.getByText('3 - 2')).toBeInTheDocument();
  });

  it('has the correct class names for styling', () => {
    const { container } = render(<Hockey />);
    expect(container.querySelector('.hockey-container')).toBeInTheDocument();
    expect(container.querySelector('.teams')).toBeInTheDocument();
  });

  it('presents correct data structure and format', () => {
    render(<Hockey />);
    
    // Check if the structure contains all expected elements
    const container = screen.getByText('Hockey Game - Oct 15, 2023').closest('.hockey-container');
    expect(container).toBeInTheDocument();
    
    const teamsElement = container?.querySelector('.teams');
    expect(teamsElement).toBeInTheDocument();
    
    // Verify child elements
    expect(teamsElement?.children.length).toBeGreaterThanOrEqual(2);
  });
});