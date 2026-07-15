import React from 'react';
import { useSelector } from 'react-redux';
import { FiGrid, FiActivity, FiShoppingCart, FiUsers } from 'react-icons/fi';

function Dashboard() {
    // Extracting live user profile metrics directly from the centralized global state auth slice
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="pt-2">
            {/* Premium Welcome Greetings Card */}
            <div className="card border-0 bg-white p-4 shadow-sm rounded-3 mb-4 border-start border-4 border-primary">
                <div className="card-body p-0">
                    <h2 className="fw-bold text-dark mb-1">Welcome Back, {user?.name || 'Authorized Professional'}</h2>
                    <p className="text-muted mb-0 font-monospace small">
                        System Workspace Role: <span className="badge bg-info text-dark fw-bold px-2.5 py-1 rounded-2">{user?.role || 'Procurement Coordinator'}</span>
                    </p>
                </div>
            </div>

            {/* Real-time Procurement Analytics Overview Grid Widgets */}
            <h4 className="fw-bold text-secondary mb-3 d-flex align-items-center">
                <FiGrid className="me-2 text-primary" /> Operational Metrics Overview
            </h4>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card border-0 bg-white p-4 shadow-sm rounded-3 h-100 position-relative overflow-hidden transition-hover">
                        <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary me-3">
                                <FiActivity size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted fw-semibold mb-1 small uppercase tracking-wider">Catalogue Items</h6>
                                <h3 className="fw-bold text-dark mb-0">4 Categories</h3>
                            </div>
                        </div>
                        <div className="position-absolute bottom-0 start-0 end-0 bg-primary opacity-75" style={{ height: '3px' }}></div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 bg-white p-4 shadow-sm rounded-3 h-100 position-relative overflow-hidden transition-hover">
                        <div className="d-flex align-items-center">
                            <div className="bg-success bg-opacity-10 p-3 rounded-3 text-success me-3">
                                <FiShoppingCart size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted fw-semibold mb-1 small uppercase tracking-wider">Active Pipeline</h6>
                                <h3 className="fw-bold text-dark mb-0">0 Pending Orders</h3>
                            </div>
                        </div>
                        <div className="position-absolute bottom-0 start-0 end-0 bg-success opacity-75" style={{ height: '3px' }}></div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 bg-white p-4 shadow-sm rounded-3 h-100 position-relative overflow-hidden transition-hover">
                        <div className="d-flex align-items-center">
                            <div className="bg-warning bg-opacity-10 p-3 rounded-3 text-warning me-3">
                                <FiUsers size={24} />
                            </div>
                            <div>
                                <h6 className="text-muted fw-semibold mb-1 small uppercase tracking-wider">System User Node</h6>
                                <h3 className="fw-bold text-dark mb-0">Local Node Active</h3>
                            </div>
                        </div>
                        <div className="position-absolute bottom-0 start-0 end-0 bg-warning opacity-75" style={{ height: '3px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;