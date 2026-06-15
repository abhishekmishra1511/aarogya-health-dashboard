import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';
import AppointmentCard from './components/AppointmentCard';
import ReportsTable from './components/ReportsTable';
import MetricChart from './components/MetricChart';

// Mock Data Definitions
const INITIAL_APPOINTMENTS = [
  {
    id: 1,
    doctorName: 'Dr. Sanjay Verma',
    specialty: 'Cardiologist',
    date: 'Jun 12, 2026',
    time: '10:30 AM',
    status: 'Confirmed',
    avatarText: 'SV'
  },
  {
    id: 2,
    doctorName: 'Dr. Amit Sharma',
    specialty: 'Endocrinologist',
    date: 'Jun 18, 2026',
    time: '02:15 PM',
    status: 'Pending',
    avatarText: 'AS'
  },
  {
    id: 3,
    doctorName: 'Dr. Priya Patel',
    specialty: 'General Practitioner',
    date: 'May 28, 2026',
    time: '09:00 AM',
    status: 'Completed',
    avatarText: 'PP'
  }
];

const MOCK_REPORTS = [
  { id: 1, name: 'Lipid Profile Panel', category: 'Blood Test', date: 'May 28, 2026', doctor: 'Dr. Priya Patel', status: 'Ready' },
  { id: 2, name: 'HbA1c & Fasting Glucose', category: 'Blood Test', date: 'May 28, 2026', doctor: 'Dr. Amit Sharma', status: 'Ready' },
  { id: 3, name: 'Electrocardiogram (ECG)', category: 'Cardiology', date: 'May 12, 2026', doctor: 'Dr. Sanjay Verma', status: 'Ready' },
  { id: 4, name: 'Chest X-Ray (Post-PA)', category: 'Imaging', date: 'May 10, 2026', doctor: 'Dr. Priya Patel', status: 'Ready' },
  { id: 5, name: 'Urinalysis Complete', category: 'Urine Test', date: 'Apr 15, 2026', doctor: 'Dr. Priya Patel', status: 'Ready' },
  { id: 6, name: 'Thyroid Stimulating Hormone', category: 'Blood Test', date: 'Jun 09, 2026', doctor: 'Dr. Amit Sharma', status: 'Processing' }
];

const METRICS_HISTORY = {
  glucose: {
    '7days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [102, 98, 110, 115, 95, 105, 99]
    },
    '30days': {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      values: [102, 98, 110, 115, 95, 105, 99, 103, 112, 97, 101, 105, 108, 96, 111, 114, 100, 94, 106, 102, 97, 109, 113, 98, 93, 104, 107, 101, 99, 105]
    },
    '6months': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [108, 105, 102, 99, 104, 101]
    }
  },
  bloodPressure: {
    '7days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      systolic: [122, 120, 125, 128, 119, 121, 118],
      diastolic: [82, 80, 84, 85, 79, 81, 78]
    },
    '30days': {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      systolic: [122, 120, 125, 128, 119, 121, 118, 124, 126, 120, 122, 121, 123, 119, 125, 127, 120, 118, 122, 121, 123, 126, 128, 122, 119, 121, 120, 124, 122, 119],
      diastolic: [82, 80, 84, 85, 79, 81, 78, 83, 85, 80, 82, 81, 83, 79, 84, 86, 80, 78, 82, 81, 83, 85, 86, 82, 79, 81, 80, 84, 82, 79]
    },
    '6months': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      systolic: [126, 124, 122, 120, 121, 119],
      diastolic: [85, 83, 82, 80, 81, 79]
    }
  },
  weight: {
    '7days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [78.2, 78.1, 78.4, 78.2, 77.9, 78.0, 77.8]
    },
    '30days': {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      values: [78.2, 78.1, 78.4, 78.2, 77.9, 78.0, 77.8, 77.9, 78.1, 78.0, 77.8, 77.6, 77.8, 77.7, 77.5, 77.4, 77.6, 77.5, 77.3, 77.4, 77.2, 77.1, 77.3, 77.2, 77.0, 76.9, 77.1, 77.0, 76.8, 76.9]
    },
    '6months': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [80.5, 79.8, 79.2, 78.5, 78.1, 77.8]
    }
  }
};

const DOCTOR_OPTIONS = [
  { name: 'Dr. Sanjay Verma', specialty: 'Cardiologist' },
  { name: 'Dr. Amit Sharma', specialty: 'Endocrinologist' },
  { name: 'Dr. Priya Patel', specialty: 'General Practitioner' },
  { name: 'Dr. Rajesh Patel', specialty: 'Dermatologist' },
  { name: 'Dr. Meera Iyer', specialty: 'Orthopedist' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [reports] = useState(MOCK_REPORTS);

  // Scroll to top when active tab changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Booking Modal States
  const [showBookModal, setShowBookModal] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(DOCTOR_OPTIONS[0].name);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  // Reschedule Modal States
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  // Form handling
  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime) return;

    const doc = DOCTOR_OPTIONS.find(d => d.name === selectedDoctor);
    const newAppointment = {
      id: Date.now(),
      doctorName: doc.name,
      specialty: doc.specialty,
      date: new Date(appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: appointmentTime,
      status: 'Confirmed',
      avatarText: doc.name.split(' ').map(n => n[0]).join('')
    };

    setAppointments([newAppointment, ...appointments]);
    setShowBookModal(false);
    setAppointmentDate('');
    setAppointmentTime('');
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter((app) => app.id !== id));
    }
  };

  const handleOpenReschedule = (id) => {
    setRescheduleId(id);
    const app = appointments.find(a => a.id === id);
    if (app) {
      // Default inputs to empty
      setRescheduleDate('');
      setRescheduleTime('');
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleDate || !rescheduleTime) return;

    setAppointments(appointments.map(app => {
      if (app.id === rescheduleId) {
        return {
          ...app,
          date: new Date(rescheduleDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: rescheduleTime,
          status: 'Confirmed'
        };
      }
      return app;
    }));

    setRescheduleId(null);
    setRescheduleDate('');
    setRescheduleTime('');
  };

  const handleDownloadReport = (report) => {
    alert(`Downloading ${report.name} ordered by ${report.doctor}.`);
  };

  // Quick stats computed values
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;

  return (
    <div className="container-fluid p-0 overflow-x-hidden position-relative" style={{ minHeight: '100vh' }}>
      {/* Background decorations */}

      <div className="bg-glow-radial glow-teal"></div>
      <div className="bg-glow-radial glow-blue"></div>

      <div className="row g-0">
        {/* Navigation Sidebar */}
        <div className="col-12 col-lg-3 col-xl-2">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Workspace */}
        <div className="col-12 col-lg-9 col-xl-10 main-content min-vh-100 p-3 p-md-4 p-xl-5 z-1">
          {/* Header */}
          <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom border-white border-opacity-10">
            <div>
              <span className="text-secondary small fw-medium text-uppercase tracking-wider">Patient Portal</span>
              <h2 className="mb-0 fw-bold heading-font text-white">Good Evening, Abhishek!</h2>
            </div>
            
            <div className="d-flex flex-wrap align-items-center gap-2">
              <div className="dashboard-stat-chip d-none d-sm-flex align-items-center gap-2">
                <i className="bi bi-calendar-check text-teal" style={{ color: '#34d399' }}></i>
                <span className="small text-secondary">Appointments: <strong className="text-white">{confirmedCount} confirmed</strong></span>
              </div>
              <button 
                onClick={() => setShowBookModal(true)}
                className="btn btn-teal text-white d-flex align-items-center gap-2"
                style={{ backgroundColor: '#0d9488' }}
              >
                <i className="bi bi-calendar-plus-fill"></i>
                Book Appointment
              </button>
            </div>
          </header>

          {/* Quick Health Summary banner */}
          <div className="alert glass-card border-success border-opacity-20 d-flex flex-column flex-md-row align-items-md-center justify-content-between p-3 rounded-4 mb-4 gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-shield-check fs-4"></i>
              </div>
              <div>
                <h6 className="mb-1 text-white fw-semibold">Overall Vitals: Stable</h6>
                <p className="mb-0 text-secondary small">Your last check-up reports indicate excellent cardiovascular and endocrine metrics.</p>
              </div>
            </div>
            <div className="text-md-end">
              <span className="small text-secondary d-block">Next Appointment</span>
              <span className="text-white fw-medium">{appointments.find(a => a.status === 'Confirmed')?.date || 'None scheduled'}</span>
            </div>
          </div>

          {/* Render Tab Contents */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Vitals Grid */}
              <h5 className="mb-3 fw-semibold text-white">Primary Vital Signs</h5>
              <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6 col-xl-3">
                  <MetricCard
                    title="Blood Pressure"
                    value="118/78"
                    unit="mmHg"
                    status="Normal"
                    trend="↓ 2% from yesterday"
                    icon="bi-heart-fill"
                    sparklineData={[122, 120, 125, 128, 119, 121, 118]}
                    onClick={() => setActiveTab('metrics')}
                  />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <MetricCard
                    title="Glucose Level"
                    value="99"
                    unit="mg/dL"
                    status="Normal"
                    trend="↓ 6% from morning"
                    icon="bi-droplet-fill"
                    sparklineData={[102, 98, 110, 115, 95, 105, 99]}
                    onClick={() => setActiveTab('metrics')}
                  />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <MetricCard
                    title="Weight Tracker"
                    value="77.8"
                    unit="kg"
                    status="Normal"
                    trend="↓ 0.4kg this week"
                    icon="bi-person-fill"
                    sparklineData={[78.2, 78.1, 78.4, 78.2, 77.9, 78.0, 77.8]}
                    onClick={() => setActiveTab('metrics')}
                  />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                  <MetricCard
                    title="Heart Rate"
                    value="72"
                    unit="bpm"
                    status="Normal"
                    trend="↑ 4% from rest"
                    icon="bi-activity"
                    sparklineData={[68, 70, 75, 73, 71, 74, 72]}
                  />
                </div>
              </div>

              {/* Lower Section: Chart & Appointments */}
              <div className="row g-4">
                <div className="col-12 col-xl-7">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 fw-semibold text-white">Vitals Graph</h5>
                    <a href="#metrics" onClick={(e) => { e.preventDefault(); setActiveTab('metrics'); }} className="small text-teal text-decoration-none" style={{ color: '#34d399' }}>Expand Graph</a>
                  </div>
                  <MetricChart metricData={METRICS_HISTORY} />
                </div>
                <div className="col-12 col-xl-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 fw-semibold text-white">Upcoming Appointments</h5>
                    {pendingCount > 0 && <span className="badge bg-warning bg-opacity-20 text-warning">{pendingCount} Pending Approval</span>}
                  </div>
                  {appointments.slice(0, 3).map((app) => (
                    <AppointmentCard
                      key={app.id}
                      appointment={app}
                      onCancel={handleCancelAppointment}
                      onReschedule={handleOpenReschedule}
                    />
                  ))}
                  {appointments.length === 0 && (
                    <div className="card glass-card text-center p-4">
                      <i className="bi bi-calendar-x fs-2 text-secondary mb-2"></i>
                      <span className="text-secondary small">No upcoming appointments</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0 fw-semibold text-white">Your Appointments Schedule</h5>
              </div>
              <div className="row">
                <div className="col-12">
                  {appointments.map((app) => (
                    <AppointmentCard
                      key={app.id}
                      appointment={app}
                      onCancel={handleCancelAppointment}
                      onReschedule={handleOpenReschedule}
                    />
                  ))}
                  {appointments.length === 0 && (
                    <div className="card glass-card text-center py-5">
                      <i className="bi bi-calendar-x fs-1 text-secondary mb-3"></i>
                      <h6 className="text-white">No Appointments Scheduled</h6>
                      <p className="text-secondary small mb-4">You have no upcoming or past appointments in records.</p>
                      <button 
                        onClick={() => setShowBookModal(true)}
                        className="btn btn-teal text-white mx-auto"
                        style={{ backgroundColor: '#0d9488' }}
                      >
                        Book Your First Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div>
              <h5 className="mb-4 fw-semibold text-white">Vitals and Metric Visualization</h5>
              <div className="row">
                <div className="col-12">
                  <MetricChart metricData={METRICS_HISTORY} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h5 className="mb-4 fw-semibold text-white">Diagnostic Laboratory Reports</h5>
              <div className="row">
                <div className="col-12">
                  <ReportsTable reports={reports} onDownload={handleDownloadReport} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Modal Dialogs (Conditional Rendering) --- */}

      {/* Booking Modal */}
      {showBookModal && (
        <div className="modal d-block bg-dark bg-opacity-70" tabIndex="-1" style={{ backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card bg-slate-900 border border-white border-opacity-10 text-white rounded-4 p-2">
              <div className="modal-header border-bottom border-white border-opacity-5">
                <h5 className="modal-title fw-bold">Book a Medical Appointment</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowBookModal(false)} aria-label="Close"></button>
              </div>
              <form onSubmit={handleBookAppointment}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label text-secondary small">Select Doctor & Department</label>
                    <select
                      className="form-select bg-dark border-white border-opacity-10 text-white"
                      style={{ backgroundColor: '#0f172a' }}
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                      {DOCTOR_OPTIONS.map((doc) => (
                        <option key={doc.name} value={doc.name}>
                          {doc.name} ({doc.specialty})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label text-secondary small">Appointment Date</label>
                      <input
                        type="date"
                        className="form-control bg-dark border-white border-opacity-10 text-white"
                        style={{ backgroundColor: '#0f172a' }}
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label text-secondary small">Select Time Slot</label>
                      <select
                        className="form-select bg-dark border-white border-opacity-10 text-white"
                        style={{ backgroundColor: '#0f172a' }}
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        required
                      >
                        <option value="">-- Choose Time --</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="11:15 AM">11:15 AM</option>
                        <option value="02:15 PM">02:15 PM</option>
                        <option value="03:30 PM">03:30 PM</option>
                        <option value="04:45 PM">04:45 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top border-white border-opacity-5 gap-2">
                  <button type="button" className="btn btn-outline-light border-opacity-15" onClick={() => setShowBookModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-teal text-white" style={{ backgroundColor: '#0d9488' }}>Confirm Booking</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleId !== null && (
        <div className="modal d-block bg-dark bg-opacity-70" tabIndex="-1" style={{ backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card bg-slate-900 border border-white border-opacity-10 text-white rounded-4 p-2">
              <div className="modal-header border-bottom border-white border-opacity-5">
                <h5 className="modal-title fw-bold">Reschedule Appointment</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setRescheduleId(null)} aria-label="Close"></button>
              </div>
              <form onSubmit={handleRescheduleSubmit}>
                <div className="modal-body py-3">
                  <p className="text-secondary small">
                    Rescheduling appointment with: <strong>{appointments.find(a => a.id === rescheduleId)?.doctorName}</strong>
                  </p>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label text-secondary small">New Date</label>
                      <input
                        type="date"
                        className="form-control bg-dark border-white border-opacity-10 text-white"
                        style={{ backgroundColor: '#0f172a' }}
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label text-secondary small">New Time Slot</label>
                      <select
                        className="form-select bg-dark border-white border-opacity-10 text-white"
                        style={{ backgroundColor: '#0f172a' }}
                        value={rescheduleTime}
                        onChange={(e) => setRescheduleTime(e.target.value)}
                        required
                      >
                        <option value="">-- Choose Time --</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="11:15 AM">11:15 AM</option>
                        <option value="02:15 PM">02:15 PM</option>
                        <option value="03:30 PM">03:30 PM</option>
                        <option value="04:45 PM">04:45 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top border-white border-opacity-5 gap-2">
                  <button type="button" className="btn btn-outline-light border-opacity-15" onClick={() => setRescheduleId(null)}>Cancel</button>
                  <button type="submit" className="btn btn-teal text-white" style={{ backgroundColor: '#0d9488' }}>Apply Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
