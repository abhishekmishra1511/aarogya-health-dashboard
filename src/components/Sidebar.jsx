import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
    { id: 'appointments', label: 'Appointments', icon: 'bi-calendar3' },
    { id: 'metrics', label: 'Health Metrics', icon: 'bi-activity' },
    { id: 'reports', label: 'Lab Reports', icon: 'bi-file-earmark-medical' },
  ];

  return (
    <div className="sidebar-wrapper p-3">
      {/* Brand */}
      <div className="d-none d-lg-flex align-items-center gap-2 mb-4 px-3">
        <div className="bg-teal text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#0d9488' }}>
          <i className="bi bi-heart-pulse-fill fs-4 text-white"></i>
        </div>
        <span className="fs-4 fw-bold heading-font tracking-tight text-white">
          Aarogya<span style={{ color: '#0d9488' }}>Health</span>
        </span>
      </div>

      {/* User profile preview on desktop */}
      <div className="d-none d-lg-flex flex-column align-items-center text-center mb-4 p-3 rounded-4 bg-white bg-opacity-5 border border-white border-opacity-5">
        <div className="position-relative mb-2">
          <div className="rounded-circle bg-teal bg-opacity-20 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px', border: '2px solid #0d9488' }}>
            <span className="fs-3 fw-bold text-teal" style={{ color: '#34d399' }}>AB</span>
          </div>
          <span className="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle pulse-dot" style={{ width: '12px', height: '12px' }}></span>
        </div>
        <h6 className="mb-0 fw-semibold text-white">Abhishek</h6>
        <span className="text-secondary small">ID: PT-88204</span>
      </div>

      {/* Navigation Links */}
      <ul className="nav nav-pills flex-row flex-lg-column mb-auto gap-1 w-100 justify-content-around justify-content-lg-start">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
              }}
              className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
            >
              <i className={`bi ${item.icon}`}></i>
              <span className="d-none d-lg-inline">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Footer / Settings link on desktop */}
      <div className="d-none d-lg-block pt-3 border-top border-white border-opacity-10 mt-auto">
        <div className="d-flex align-items-center justify-content-between px-3 text-secondary">
          <span className="small">v1.2.0</span>
          <a href="#logout" className="text-secondary text-decoration-none hover-white">
            <i className="bi bi-box-arrow-right fs-5"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
