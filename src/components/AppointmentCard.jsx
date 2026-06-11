import React from 'react';

export default function AppointmentCard({ appointment, onCancel, onReschedule }) {
  const { id, doctorName, specialty, date, time, status, avatarText } = appointment;

  const getStatusClass = (statusStr) => {
    switch (statusStr?.toLowerCase()) {
      case 'confirmed':
        return 'appointment-confirmed';
      case 'pending':
        return 'appointment-pending';
      case 'completed':
        return 'appointment-completed';
      default:
        return '';
    }
  };

  const getStatusBadge = (statusStr) => {
    switch (statusStr?.toLowerCase()) {
      case 'confirmed':
        return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-20 px-2 py-1 rounded-pill small">Confirmed</span>;
      case 'pending':
        return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-20 px-2 py-1 rounded-pill small">Pending</span>;
      case 'completed':
        return <span className="badge bg-secondary bg-opacity-10 text-secondary border border-white border-opacity-10 px-2 py-1 rounded-pill small">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`card glass-card appointment-list-item ${getStatusClass(status)} mb-3`}
      data-testid={`appointment-card-${id}`}
    >
      <div className="card-body p-3">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
          {/* Doctor Info */}
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle bg-teal bg-opacity-10 text-teal d-flex align-items-center justify-content-center fw-bold border border-teal border-opacity-20" style={{ width: '48px', height: '48px', color: '#0d9488' }}>
              {avatarText || doctorName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h6 className="mb-0 fw-semibold text-white">{doctorName}</h6>
              <span className="text-secondary small">{specialty}</span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2 bg-white bg-opacity-5 px-3 py-2 rounded-3 border border-white border-opacity-5">
              <i className="bi bi-calendar-event text-teal" style={{ color: '#34d399' }}></i>
              <div className="d-flex flex-column">
                <span className="fw-semibold text-white small" style={{ lineHeight: '1.2' }}>{date}</span>
                <span className="text-secondary small" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>{time}</span>
              </div>
            </div>
          </div>

          {/* Status and Action Buttons */}
          <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-3 flex-grow-1 flex-sm-grow-0">
            {getStatusBadge(status)}
            
            {status?.toLowerCase() !== 'completed' && (
              <div className="d-flex gap-2">
                <button 
                  onClick={() => onReschedule && onReschedule(id)}
                  className="btn btn-sm btn-outline-light border-opacity-20"
                  aria-label="Reschedule Appointment"
                >
                  Reschedule
                </button>
                <button 
                  onClick={() => onCancel && onCancel(id)}
                  className="btn btn-sm btn-outline-danger border-opacity-20"
                  aria-label="Cancel Appointment"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
