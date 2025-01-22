import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import EditTrip from '../components/forms/edit-trip';
import { useTripsDispatch } from '../lib/trips-context';

jest.mock('../lib/trips-context', () => ({
    useTripsDispatch: jest.fn(),
}));

describe('EditTrip Component', () => {
    const mockDispatch = jest.fn();
    const mockCloseModal = jest.fn();
    const mockTrip = {
        id: 1,
        title: 'Trip to Italy',
        introduction: 'From Rome to Venice...',
        description: 'Discover the wonders of the Roman empire...',
        photo_url: 'https://example.com/italy.jpg',
        status: 'todo',
        itinerary: [
            { day: 1, location: 'Rome', description: 'Visit the Colosseum' },
            { day: 2, location: 'Venice', description: 'Ride a gondola' },
        ],
    };

    beforeEach(() => {
        (useTripsDispatch).mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders form elements with trip data', () => {
        render(<EditTrip trip={mockTrip} closeModal={mockCloseModal} />);

        expect(screen.getByLabelText(/name/i)).toHaveValue('Trip to Italy');
        expect(screen.getByLabelText(/introduction/i)).toHaveValue('From Rome to Venice...');
        expect(screen.getByLabelText(/description/i)).toHaveValue('Discover the wonders of the Roman empire...');
        expect(screen.getByLabelText(/image/i)).toHaveValue('https://example.com/italy.jpg');
        expect(screen.getByText(/rome/i)).toBeInTheDocument();
        expect(screen.getByText(/venice/i)).toBeInTheDocument();
    });

    test('allows adding an itinerary', () => {
        render(<EditTrip trip={mockTrip} closeModal={mockCloseModal} />);

        const addButton = screen.getByTitle('Add an itinerary');
        fireEvent.click(addButton);

        expect(screen.getAllByPlaceholderText(/location/i)).toHaveLength(3);
    });

    test('closes modal when clicking the close button', () => {
        render(<EditTrip trip={mockTrip} closeModal={mockCloseModal} />);

        fireEvent.click(screen.getByTitle(/close popup/i));

        expect(mockCloseModal).toHaveBeenCalled();
    });
});
