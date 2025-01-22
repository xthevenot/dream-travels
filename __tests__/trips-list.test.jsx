import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TripsList from '../components/trips/trips-list';
import { useTrips, useTripsDispatch } from '../lib/trips-context';
import { filterTrips } from '../lib/endpoint';
import Modal from 'react-modal';

// Mock dependencies
jest.mock('../lib/trips-context', () => ({
    useTrips: jest.fn(),
    useTripsDispatch: jest.fn(),
}));
jest.mock('../lib/endpoint', () => ({
    filterTrips: jest.fn(),
}));
jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => '/mock-path'),
}));
jest.mock('shimmer-effects-react', () => ({
    ShimmerDiv: jest.fn(),
    ShimmerText: jest.fn(),
    ShimmerTitle: jest.fn(),
}));

describe('TripsList Component', () => {
    const mockDispatch = jest.fn();
    const mockTrips = [
        {
            id: 1,
            title: 'Trip to Rome',
            introduction: 'A wonderful journey through history.',
            photo_url: 'https://example.com/rome.jpg',
            status: 'todo',
            itinerary: [{
                day: 1,
                description: 'Visit the city of Vatican',
                location: 'Vatican'
            }],
            randomStart: false,
        },
        {
            id: 2,
            title: 'Trip to Venice',
            introduction: 'Explore the beauty of canals.',
            photo_url: 'https://example.com/venice.jpg',
            status: 'completed',
            itinerary: [{
                day: 1,
                description: 'Visit the San MArco Basilic',
                location: 'San Marco'
            }],
            randomStart: true,
        },
    ];

    beforeEach(() => {
        (useTrips).mockReturnValue(mockTrips);
        (useTripsDispatch).mockReturnValue(mockDispatch);
        (filterTrips).mockResolvedValue(mockTrips);
        Modal.setAppElement(document.createElement('div'));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        (filterTrips).mockReturnValue(new Promise(() => { })); // Pending promise
        render(<TripsList searchInput="" />);
        expect(screen.getByTitle('Loading trips')).toBeInTheDocument();
    });

    test('renders trips after loading', async () => {
        render(<TripsList searchInput="" />);
        await waitFor(() => expect(screen.getByText('Trip to Rome')).toBeInTheDocument());
        expect(screen.getByText('Trip to Venice')).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: /see trip details/i })).toHaveLength(2);
    });

    test('filters trips based on searchInput', async () => {
        (filterTrips).mockResolvedValueOnce([mockTrips[0]]);
        render(<TripsList searchInput="Rome" />);
        await waitFor(() => expect(screen.getByText('Trip to Rome')).toBeInTheDocument());
        expect(screen.queryByText('Trip to Venice')).not.toBeInTheDocument();
    });

    test('handles delete trip action', async () => {
        render(<TripsList searchInput="" />);
        await waitFor(() => expect(screen.getByText('Trip to Rome')).toBeInTheDocument());

        const deleteButton = screen.getAllByRole('button', { name: /Delete/i })[0];
        fireEvent.click(deleteButton);

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'deleted', id: 1 });
    });

    test('handles modal open and close for details', async () => {
        render(<TripsList searchInput="" />);
        await waitFor(() => expect(screen.getByText('Trip to Rome')).toBeInTheDocument());

        const detailsButton = screen.getAllByRole('button', { name: /See trip details/i })[0];
        fireEvent.click(detailsButton);

        expect(screen.getByTitle('Close popup')).toBeInTheDocument();
        fireEvent.click(screen.getByTitle('Close popup'));

        await waitFor(() => expect(screen.queryByTitle('Close popup')).not.toBeInTheDocument());
    });

    test('renders "No result found" when no trips are available', async () => {
        (filterTrips).mockResolvedValueOnce([]);
        render(<TripsList searchInput="NonExistent" />);
        await waitFor(() => expect(screen.getByText(/No result found/i)).toBeInTheDocument());
    });
});
