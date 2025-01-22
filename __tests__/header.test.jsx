import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Header from '../components/header'

describe('Header Component', () => {
    it('renders the logo correctly', () => {
        render(<Header />);
        const logo = screen.getByAltText('Dream Trips by Exoticca');
        expect(logo).toBeInTheDocument();
    });

    it('renders the \'choose a destination for me\' button', () => {
        render(<Header />);
        const button = screen.getByText('Choose a destination for me!');
        expect(button).toBeInTheDocument();
    });

    it('renders the create trip button', () => {
        render(<Header />);
        const button = screen.getByText('Create new trip');
        expect(button).toBeInTheDocument();
    });

    it('opens the modal when create trip button is clicked', () => {
        render(<Header />);
        const button = screen.getByText('Create new trip');
        fireEvent.click(button);
        const modalContent = screen.getByText('Create');
        expect(modalContent).toBeInTheDocument();
    });

    it('closes the modal when the close function is triggered', async () => {
        render(<Header />);
        const button = screen.getByText('Create new trip');
        fireEvent.click(button);
        const modalContent = screen.getByText('Create');
        expect(modalContent).toBeInTheDocument();

        // Mock close modal behavior
        const closeButton = screen.getByTitle('Close popup');
        fireEvent.click(closeButton);
        expect(modalContent).not.toBeInTheDocument();
    });
})