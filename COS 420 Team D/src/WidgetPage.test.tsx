import { render, screen, fireEvent } from '@testing-library/react';
import WidgetPage from './WidgetPage';

describe('WidgetPage', () => {
    it('renders the Add Widget button', () => {
        render(<WidgetPage />);
        expect(screen.getByText('Add Widget')).toBeInTheDocument();
    });

    it('opens the modal when Add Widget button is clicked', () => {
        render(<WidgetPage />);
        fireEvent.click(screen.getByText('Add Widget'));
        expect(screen.getByText('Select Widget Type')).toBeInTheDocument();
    });

    it('adds a Hockey widget when the Hockey button is clicked', () => {
        render(<WidgetPage />);
        fireEvent.click(screen.getByText('Add Widget'));
        fireEvent.click(screen.getByText('Hockey'));
        expect(screen.getByText('Hockey Widget')).toBeInTheDocument();
    });

    it('adds a Baseball widget when the Baseball button is clicked', () => {
        render(<WidgetPage />);
        fireEvent.click(screen.getByText('Add Widget'));
        fireEvent.click(screen.getByText('Baseball'));
        expect(screen.getByText('Baseball Widget')).toBeInTheDocument();
    });

    it('closes the modal when Cancel is clicked', () => {
        render(<WidgetPage />);
        fireEvent.click(screen.getByText('Add Widget'));
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Select Widget Type')).not.toBeInTheDocument();
    });

    it('renders multiple widgets without overlap', () => {
        render(<WidgetPage />);
        fireEvent.click(screen.getByText('Add Widget'));
        fireEvent.click(screen.getByText('Hockey'));
        fireEvent.click(screen.getByText('Add Widget'));
        fireEvent.click(screen.getByText('Baseball'));
        const hockeyWidget = screen.getByText('Hockey Widget');
        const baseballWidget = screen.getByText('Baseball Widget');
        expect(hockeyWidget).toBeInTheDocument();
        expect(baseballWidget).toBeInTheDocument();
        expect(hockeyWidget).not.toHaveStyle('left: 0px');
        expect(baseballWidget).not.toHaveStyle('left: 0px');
    });
    it('removes a widget when the remove button is clicked', () => {
        render(<WidgetPage />);
        fireEvent.click(screen.getByText('Add Widget'));
        fireEvent.click(screen.getByText('Hockey'));
        const removeButton = screen.getByText('✖');
        fireEvent.click(removeButton);
        expect(screen.queryByText('Hockey Widget')).not.toBeInTheDocument();
    });
});