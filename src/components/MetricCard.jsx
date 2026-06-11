import React from 'react';

export default function MetricCard({ title, value, unit, status, trend, icon, sparklineData, onClick }) {
  // Determine badge styling based on status
  const getStatusBadge = (statusName) => {
    switch (statusName?.toLowerCase()) {
      case 'normal':
        return <span className="metric-badge badge-normal" data-testid="status-badge"><span className="bg-success rounded-circle" style={{ width: '6px', height: '6px' }}></span>Normal</span>;
      case 'warning':
        return <span className="metric-badge badge-warning" data-testid="status-badge"><span className="bg-warning rounded-circle" style={{ width: '6px', height: '6px' }}></span>Warning</span>;
      case 'critical':
        return <span className="metric-badge badge-critical" data-testid="status-badge"><span className="bg-danger rounded-circle" style={{ width: '6px', height: '6px' }}></span>Critical</span>;
      default:
        return null;
    }
  };

  // Convert sparkline array into SVG path points
  const generateSparklinePath = (data) => {
    if (!data || data.length < 2) return '';
    const width = 100;
    const height = 30;
    const padding = 2;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    return data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * (width - padding * 2) + padding;
        const y = height - ((val - min) / range) * (height - padding * 2) - padding;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const isPositiveTrend = trend && !trend.startsWith('-');

  return (
    <div 
      className="card glass-card glass-card-hover h-100 cursor-pointer" 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      data-testid="metric-card"
    >
      <div className="card-body p-3 d-flex flex-column justify-content-between">
        {/* Card Header: Icon & Badge */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="rounded-3 bg-teal bg-opacity-10 p-2 text-teal d-flex align-items-center justify-content-center" style={{ color: '#0d9488', width: '40px', height: '40px' }}>
            <i className={`bi ${icon} fs-5`}></i>
          </div>
          {getStatusBadge(status)}
        </div>

        {/* Card Value & Title */}
        <div className="mb-2">
          <span className="text-secondary small d-block mb-1">{title}</span>
          <div className="d-flex align-items-baseline gap-1">
            <h3 className="mb-0 fw-bold tracking-tight text-white">{value}</h3>
            <span className="text-secondary small">{unit}</span>
          </div>
        </div>

        {/* Card Footer: Trend & Mini-sparkline */}
        <div className="d-flex align-items-center justify-content-between pt-2 border-top border-white border-opacity-5 mt-2">
          <span className={`small d-flex align-items-center gap-1 ${isPositiveTrend ? 'text-success' : 'text-danger'}`}>
            <i className={`bi ${isPositiveTrend ? 'bi-arrow-up-short' : 'bi-arrow-down-short'} fs-5`}></i>
            {trend}
          </span>

          {sparklineData && sparklineData.length > 0 && (
            <div className="sparkline-container" data-testid="sparkline">
              <svg width="100%" height="100%" viewBox="0 0 100 30">
                <path
                  d={generateSparklinePath(sparklineData)}
                  fill="none"
                  stroke={status?.toLowerCase() === 'critical' ? '#f43f5e' : '#0d9488'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
