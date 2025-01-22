import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Toggle from '../components/group-buttons'
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
}));

describe('Toggle Component', () => {
    it('renders all toggle links correctly', () => {
        usePathname.mockReturnValue('/');
        render(<Toggle />);

        expect(screen.getByText('All')).toBeInTheDocument();
        expect(screen.getByText('Upcoming')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('highlights the active link based on the pathname', () => {
        usePathname.mockReturnValue('/upcoming');
        render(<Toggle />);

        const upcomingLink = screen.getByText('Upcoming');
        expect(upcomingLink).toHaveClass('bg-gray-200');
    });

    it('does not highlight inactive links', () => {
        usePathname.mockReturnValue('/upcoming');
        render(<Toggle />);

        const allLink = screen.getByText('All');
        expect(allLink).not.toHaveClass('bg-gray-200');
    });
});