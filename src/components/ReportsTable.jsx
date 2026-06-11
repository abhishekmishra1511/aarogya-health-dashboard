import React, { useState } from 'react';

export default function ReportsTable({ reports, onDownload }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Available categories for filtering
  const categories = ['All', 'Blood Test', 'Imaging', 'Cardiology', 'Urine Test'];

  // Filter and search logic
  const filteredReports = reports.filter((report) => {
    const matchesSearch = 
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'All' || report.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card glass-card">
      <div className="card-header border-bottom border-white border-opacity-10 bg-transparent p-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <h5 className="mb-0 fw-semibold text-white">Medical Test Reports</h5>
          
          {/* Controls: Search and Filters */}
          <div className="d-flex flex-column flex-sm-row gap-2">
            <div className="input-group input-group-sm" style={{ maxWidth: '250px' }}>
              <span className="input-group-text bg-white bg-opacity-5 border-white border-opacity-10 text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search report or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="form-select form-select-sm bg-dark border-white border-opacity-10 text-white"
              style={{ maxWidth: '160px', backgroundColor: '#0f172a' }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Table Content */}
      <div className="card-body p-0 table-responsive">
        {filteredReports.length > 0 ? (
          <table className="table table-custom table-borderless align-middle mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">Report Name</th>
                <th className="py-3">Category</th>
                <th className="py-3">Date</th>
                <th className="py-3">Ordered By</th>
                <th className="py-3">Status</th>
                <th className="px-4 py-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-file-earmark-pdf-fill text-danger fs-5"></i>
                      <span className="fw-medium text-white">{report.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-secondary">{report.category}</td>
                  <td className="py-3 text-secondary">{report.date}</td>
                  <td className="py-3 text-secondary">{report.doctor}</td>
                  <td className="py-3">
                    {report.status?.toLowerCase() === 'ready' ? (
                      <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10 rounded-pill px-2 py-1">Ready</span>
                    ) : (
                      <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-10 rounded-pill px-2 py-1">Processing</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-end">
                    {report.status?.toLowerCase() === 'ready' ? (
                      <button
                        onClick={() => onDownload && onDownload(report)}
                        className="btn btn-sm btn-outline-teal text-teal border-teal border-opacity-30 hover-teal"
                        style={{ '--bs-btn-hover-bg': '#0d9488', '--bs-btn-hover-border-color': '#0d9488', color: '#34d399', borderColor: 'rgba(13,148,136,0.3)' }}
                      >
                        <i className="bi bi-download me-1"></i> Download
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-outline-secondary border-opacity-10" disabled>
                        <i className="bi bi-clock me-1"></i> Waiting
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-folder-x fs-1 text-secondary mb-3 d-block"></i>
            <span className="text-secondary">No reports match your filters.</span>
          </div>
        )}
      </div>
    </div>
  );
}
