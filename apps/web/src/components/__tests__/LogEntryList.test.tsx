
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogEntryList from '../LogEntryList';
import '@testing-library/jest-dom';

describe('LogEntryList', () => {
    const mockEntries = [
        {
            id: '1',
            name: 'John Doe',
            description: 'Test description 1',
            location: 'Test location 1',
            date: '2024-04-24',
            createdAt: '2024-04-22T10:00:00.000Z',
            updatedAt: '2024-04-22T10:00:00.000Z'
        },
        {
            id: '2',
            name: 'Jane Doe',
            description: 'Test description 2',
            location: 'Test location 2',
            date: '2024-04-23',
            createdAt: '2024-04-23T10:00:00.000Z',
            updatedAt: '2024-04-23T10:00:00.000Z'
        }
    ];

    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    beforeEach(() => {
        mockOnEdit.mockClear();
        mockOnDelete.mockClear();
    });

    it('renders empty state when no entries are provided', () => {
        render(<LogEntryList entries={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
        expect(screen.getByText(/no entries yet/i)).toBeInTheDocument();
    });

    it('renders all entries in the correct order', () => {
        render(<LogEntryList entries={mockEntries} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

        const entryElements = screen.getAllByRole('article');
        expect(entryElements).toHaveLength(2);

        // Check if entries are rendered in correct order (most recent first)
        const names = screen.getAllByText(/doe/i);
        // Assuming the first entry is the most recent
        expect(names[0]).toHaveTextContent('Jane Doe');
        expect(names[1]).toHaveTextContent('John Doe');
    });

    it('calls onEdit when edit button is clicked', async () => {
        render(<LogEntryList entries={mockEntries} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

        const editButtons = screen.getAllByRole('button', { name: /edit/i });
        await userEvent.click(editButtons[0]);

        expect(mockOnEdit).toHaveBeenCalledTimes(1);
        expect(mockOnEdit).toHaveBeenCalledWith(mockEntries[1]);
    });

    it('calls onDelete when delete button is clicked', async () => {
        render(<LogEntryList entries={mockEntries} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        await userEvent.click(deleteButtons[0]);

        expect(mockOnDelete).toHaveBeenCalledTimes(1);
        expect(mockOnDelete).toHaveBeenCalledWith(mockEntries[1].id);
    });
});
