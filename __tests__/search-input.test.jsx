import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../components/search-input'

const mockHandleSearchUpdate = jest.fn();

describe('Search Component', () => {
    it('renders the input and button correctly', () => {
        render(<Search placeholder="Search for trips" handleSearchUpdate={mockHandleSearchUpdate} />);
        const input = screen.getByPlaceholderText('Search for trips');
        const button = screen.getByText('Search');
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('updates the search input value on typing', () => {
        render(<Search placeholder="Search for trips" handleSearchUpdate={mockHandleSearchUpdate} />);
        const input = screen.getByPlaceholderText('Search for trips');
        fireEvent.change(input, { target: { value: 'Trip 1' } });
        expect(input).toHaveValue('Trip 1');
    });

    it('calls handleSearchUpdate when the button is clicked', () => {
        render(<Search placeholder="Search for trips" handleSearchUpdate={mockHandleSearchUpdate} />);

        const input = screen.getByPlaceholderText('Search for trips');
        fireEvent.change(input, { target: { value: 'Trip 1' } });

        const button = screen.getByText('Search');
        fireEvent.click(button);

        expect(mockHandleSearchUpdate).toHaveBeenCalledWith('Trip 1');
    });

    it('calls handleSearchUpdate when Enter is pressed in input', () => {
        render(<Search placeholder="Search for trips" handleSearchUpdate={mockHandleSearchUpdate} />);

        const input = screen.getByPlaceholderText('Search for trips');
        fireEvent.change(input, { target: { value: 'Trip 1' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(mockHandleSearchUpdate).toHaveBeenCalledWith('Trip 1');
    });
});