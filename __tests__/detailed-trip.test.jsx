import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailedTrip from '../components/forms/detailed-trip';
import { useTripsDispatch } from '../lib/trips-context';

jest.mock('../lib/trips-context', () => ({
    useTripsDispatch: jest.fn(),
}));

describe('DetailedTrip Component', () => {
    const mockDispatch = jest.fn();
    const mockCloseModal = jest.fn();
    const mockTrip = {
        id: 1,
        title: 'Trip to Tokyo',
        description: 'A fantastic journey to Japan.',
        photo_url: 'https://example.com/tokyo.jpg',
        status: 'todo',
        itinerary: [
            { day: 1, location: 'Shibuya', description: 'Explore Shibuya Crossing.' },
            { day: 2, location: 'Akihabara', description: 'Visit electronics stores and anime shops.' },
        ],
    };

    beforeEach(() => {
        (useTripsDispatch).mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders trip details correctly', () => {
        render(<DetailedTrip trip={mockTrip} closeModal={mockCloseModal} />);

        expect(screen.getByText(/trip to tokyo/i)).toBeInTheDocument();
        expect(screen.getByText(/a fantastic journey to japan/i)).toBeInTheDocument();
        expect(screen.getByAltText(/tokyo/i)).toBeInTheDocument();
    });

    test('renders itinerary details', () => {
        render(<DetailedTrip trip={mockTrip} closeModal={mockCloseModal} />);

        expect(screen.getByText(/day 1: shibuya/i)).toBeInTheDocument();
        expect(screen.getByText(/explore shibuya crossing/i)).toBeInTheDocument();
        expect(screen.getByText(/day 2: akihabara/i)).toBeInTheDocument();
        expect(screen.getByText(/visit electronics stores and anime shops/i)).toBeInTheDocument();
    });

    test('handles marking trip as completed', () => {
        render(<DetailedTrip trip={mockTrip} closeModal={mockCloseModal} />);

        const statusButton = screen.getByRole('button', { name: /mark as completed/i });
        fireEvent.click(statusButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'changeStatus',
            trip: mockTrip,
            status: 'done',
        });
    });

    test('closes modal when clicking the close button', () => {
        render(<DetailedTrip trip={mockTrip} closeModal={mockCloseModal} />);

        fireEvent.click(screen.getByTitle('Close popup'));

        expect(mockCloseModal).toHaveBeenCalled();
    });
});
