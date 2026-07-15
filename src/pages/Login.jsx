import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';
import { toast, ToastContainer } from 'react-toastify';

function Login() {
    // Initializing local component state variables to handle local controlled inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Setting up Redux interaction hooks to trigger actions and read target storage state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth);

    // Monitoring token initialization parameters to perform automatic route forwards
    useEffect(() => {
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [token, navigate]);

    // Capturing operational failure logs from global slice states to trigger alert toasts
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Form submission handler to intercept browser event loops and execute login thunk
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning('Please enter valid email and password credentials.');
            return;
        }

        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(() => {
                toast.success('Authentication successful! Welcome to BuildCart.');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-lg p-4 border-0 rounded-3">
                        <div className="card-body">
                            <h3 className="text-center mb-2 fw-bold text-primary">BuildCart Portal</h3>
                            <p className="text-center text-muted mb-4 small">Procurement & Inventory Management System</p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-secondary">Corporate Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control p-2 text-dark"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold text-secondary">Security Password</label>
                                    <input
                                        type="password"
                                        className="form-control p-2 text-dark"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 p-2 fw-bold shadow-sm"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    ) : null}
                                    {loading ? 'Verifying Credentials...' : 'Sign In To Workspace'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* ToastContainer instance injected to manage visual micro-feedbacks stack overlay */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}

export default Login;