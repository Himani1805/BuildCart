import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import { FiLogOut, FiShoppingCart, FiBox, FiTrendingUp } from 'react-icons/fi';

function MainLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { totalQuantity, totalAmount } = useSelector((state) => state.cart);

    const handleLogout = () => {
        dispatch(logout());
        toast.info('Logged out from the system workspace successfully.');
        navigate('/login', { replace: true });
    };

    return (
        <div className="min-vh-100 bg-light">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm border-bottom border-secondary">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary fs-4 d-flex align-items-center" to="/dashboard">
                        <FiBox className="me-2 text-info" /> BuildCart
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#enterpriseNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="enterpriseNavbar">
                        <div className="navbar-nav me-auto">
                            <Link className="nav-link text-white d-flex align-items-center me-3" to="/dashboard">
                                <FiTrendingUp className="me-1 text-success" /> Dashboard
                            </Link>
                            <Link className="nav-link text-white d-flex align-items-center me-3" to="/materials">
                                <FiBox className="me-1 text-warning" /> Materials
                            </Link>
                        </div>

                        <div className="navbar-nav ms-auto align-items-center">
                            {/* FIXED: Dynamic redirection link goes to /cart instead of /dashboard */}
                            <div className="nav-item me-4 position-relative">
                                <Link to="/cart" className="nav-link text-white d-flex align-items-center bg-dark p-2 rounded-3 border border-secondary">
                                    <FiShoppingCart className="me-2 text-warning" size={20} />
                                    <span className="fw-bold text-info me-1">{totalQuantity} Items</span>
                                    <span className="badge bg-light text-dark shadow-sm">₹{totalAmount.toLocaleString('en-IN')}</span>
                                </Link>
                            </div>

                            {user ? (
                                <div className="d-flex align-items-center bg-secondary bg-opacity-25 px-3 py-1.5 rounded-pill me-3 border border-secondary border-opacity-50">
                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-2 shadow-sm" style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div className="d-flex flex-column text-start">
                                        <span className="text-white fw-semibold small lh-1">{user.name}</span>
                                        <span className="text-info mt-0.5" style={{ fontSize: '10px' }}>{user.role}</span>
                                    </div>
                                </div>
                            ) : null}

                            <button
                                className="btn btn-outline-danger btn-sm fw-bold d-flex align-items-center px-3 py-2 shadow-sm border-2 rounded-3"
                                onClick={handleLogout}
                            >
                                <FiLogOut className="me-1.5" /> Terminate Session
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container pb-5">
                <div className="animate-fade-in">
                    <Outlet />
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} />
        </div>
    );
}

export default MainLayout;