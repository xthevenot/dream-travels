import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateTrip from '../components/forms/create-trip';
import { useTripsDispatch } from '../lib/trips-context';

jest.mock('../lib/trips-context', () => ({
    useTripsDispatch: jest.fn(),
}));

describe('CreateTrip Component', () => {
    const mockDispatch = jest.fn();
    const mockCloseModal = jest.fn();

    beforeEach(() => {
        (useTripsDispatch).mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders form elements correctly', () => {
        render(<CreateTrip closeModal={mockCloseModal} />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/introduction/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
        expect(screen.getByText(/day by day itinerary/i)).toBeInTheDocument();
    });

    test('allows adding an itinerary', () => {
        render(<CreateTrip closeModal={mockCloseModal} />);

        const addButton = screen.getByTitle('Add an itinerary');
        fireEvent.click(addButton);

        expect(screen.getAllByPlaceholderText(/location/i)).toHaveLength(2);
    });

    test('closes modal when clicking the close button', () => {
        render(<CreateTrip closeModal={mockCloseModal} />);

        fireEvent.click(screen.getByTitle(/close popup/i));

        expect(mockCloseModal).toHaveBeenCalled();
    });
});
