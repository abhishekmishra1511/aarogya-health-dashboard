import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import AppointmentCard from './AppointmentCard';

describe('AppointmentCard Component', () => {
  const mockAppointment = {
    id: 1,
    doctorName: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    date: 'Jun 12, 2026',
    time: '10:30 AM',
    status: 'Confirmed',
    avatarText: 'SJ'
  };

  test('renders appointment details correctly', () => {
    render(
      <AppointmentCard
        appointment={mockAppointment}
        onCancel={vi.fn()}
        onReschedule={vi.fn()}
      />
    );

    expect(screen.getByText('Dr. Sarah Jenkins')).toBeInTheDocument();
    expect(screen.getByText('Cardiologist')).toBeInTheDocument();
    expect(screen.getByText('Jun 12, 2026')).toBeInTheDocument();
    expect(screen.getByText('10:30 AM')).toBeInTheDocument();
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
  });

  test('calls onCancel and onReschedule when buttons are clicked', () => {
    const handleCancel = vi.fn();
    const handleReschedule = vi.fn();

    render(
      <AppointmentCard
        appointment={mockAppointment}
        onCancel={handleCancel}
        onReschedule={handleReschedule}
      />
    );

    const rescheduleBtn = screen.getByRole('button', { name: /reschedule/i });
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });

    fireEvent.click(rescheduleBtn);
    expect(handleReschedule).toHaveBeenCalledWith(1);

    fireEvent.click(cancelBtn);
    expect(handleCancel).toHaveBeenCalledWith(1);
  });

  test('does not show reschedule/cancel buttons if completed', () => {
    const completedAppointment = {
      ...mockAppointment,
      status: 'Completed'
    };

    render(
      <AppointmentCard
        appointment={completedAppointment}
        onCancel={vi.fn()}
        onReschedule={vi.fn()}
      />
    );

    expect(screen.queryByRole('button', { name: /reschedule/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});
