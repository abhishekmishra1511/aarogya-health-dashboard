import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import MetricCard from './MetricCard';

describe('MetricCard Component', () => {
  test('renders basic info correctly', () => {
    render(
      <MetricCard
        title="Blood Pressure"
        value="120/80"
        unit="mmHg"
        status="Normal"
        trend="↓ 2% from yesterday"
        icon="bi-heart-fill"
      />
    );

    expect(screen.getByText('Blood Pressure')).toBeInTheDocument();
    expect(screen.getByText('120/80')).toBeInTheDocument();
    expect(screen.getByText('mmHg')).toBeInTheDocument();
    expect(screen.getByText('↓ 2% from yesterday')).toBeInTheDocument();
  });

  test('displays status badge correctly for normal status', () => {
    render(
      <MetricCard
        title="Glucose"
        value="90"
        unit="mg/dL"
        status="Normal"
      />
    );

    const badge = screen.getByTestId('status-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Normal');
    expect(badge).toHaveClass('badge-normal');
  });

  test('displays status badge correctly for critical status', () => {
    render(
      <MetricCard
        title="Glucose"
        value="200"
        unit="mg/dL"
        status="Critical"
      />
    );

    const badge = screen.getByTestId('status-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Critical');
    expect(badge).toHaveClass('badge-critical');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <MetricCard
        title="Blood Pressure"
        value="120/80"
        unit="mmHg"
        status="Normal"
        onClick={handleClick}
      />
    );

    const card = screen.getByTestId('metric-card');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders sparkline when data is provided', () => {
    const data = [1, 2, 3, 4, 5];
    render(
      <MetricCard
        title="Heart Rate"
        value="72"
        unit="bpm"
        status="Normal"
        sparklineData={data}
      />
    );

    expect(screen.getByTestId('sparkline')).toBeInTheDocument();
  });
});
