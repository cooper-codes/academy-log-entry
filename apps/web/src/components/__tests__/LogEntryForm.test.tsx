
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogEntryForm from '../LogEntryForm';
import '@testing-library/jest-dom';

describe('LogEntryForm', () => {
    const mockOnSave = vi.fn();

    beforeEach(() => {
        mockOnSave.mockClear();
    });

    it('should not call onSave when required fields are empty', async () => {
        render(<LogEntryForm onSave={mockOnSave} />);

        // Find the submit button and click it
        const submitButton = screen.getByRole('button', { name: /save entry/i });
        await userEvent.click(submitButton);

        // Verify onSave was not called
        expect(mockOnSave).not.toHaveBeenCalled();
    });

    it('should call onSave when all required fields are filled', async () => {
        render(<LogEntryForm onSave={mockOnSave} />);

        // Fill out the form
        await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
        await userEvent.type(screen.getByLabelText(/description/i), 'Test description');
        await userEvent.type(screen.getByLabelText(/location/i), 'Test location');

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /save entry/i });
        await userEvent.click(submitButton);

        // Verify onSave was called with correct data
        expect(mockOnSave).toHaveBeenCalledTimes(1);
        expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
            name: 'John Doe',
            description: 'Test description',
            location: 'Test location',
            date: expect.any(String)
        }));
    });

    it('should populate form with existing entry data', () => {
        const existingEntry = {
            id: '1',
            name: 'John Doe',
            description: 'Test description',
            location: 'Test location',
            date: '2024-04-24',
            createdAt: '2024-04-24T00:00:00.000Z',
            updatedAt: '2024-04-25T00:00:00.000Z'
        };

        render(<LogEntryForm existingEntry={existingEntry} onSave={mockOnSave} />);

        expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
        expect(screen.getByLabelText(/description/i)).toHaveValue('Test description');
        expect(screen.getByLabelText(/location/i)).toHaveValue('Test location');
        expect(screen.getByLabelText(/date/i)).toHaveValue('2024-04-24');
    });
});