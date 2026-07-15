import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPackage, FiCalendar, FiEye } from 'react-icons/fi';

function Orders() {
    const { ordersList } = useSelector((state) => state.orders);

    if (ordersList.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <div className="p-5 bg-white rounded-3 shadow-sm border">
                    <h4 className="fw-bold text-dark mb-3">No Procurement Orders Found</h4>
                    <p className="text-muted mb-4 small">You haven't placed any raw material procurement orders yet.</p>
                    <Link to="/materials" className="btn btn-primary fw-bold px-4 rounded-3">
                        Go to Materials Catalogue
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-2 animate-fade-in">
            <h4 className="fw-bold text-dark mb-4 d-flex align-items-center">
                <FiPackage className="me-2 text-primary" /> Procurement Logs & History
            </h4>

            <div className="card border-0 shadow-sm bg-white rounded-3 p-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0 text-start">
                        <thead className="table-light text-secondary small uppercase">
                            <tr>
                                <th className="ps-3">Order ID</th>
                                <th>Date Placed</th>
                                <th>Total Items</th>
                                <th>Final Amount (Paid)</th>
                                <th className="text-center">Action Controls</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList.map((order) => (
                                <tr key={order.id}>
                                    <td className="fw-bold text-dark font-monospace ps-3">{order.id}</td>
                                    <td className="text-muted small">
                                        <FiCalendar className="me-1 text-primary" /> {order.date}
                                    </td>
                                    <td className="fw-semibold text-secondary">{order.items.length} Materials Line</td>
                                    <td className="fw-bold text-success">₹{order.amount.toLocaleString('en-IN')}</td>
                                    <td className="text-center">
                                        <Link to={`/orders/${order.id}`} className="btn btn-sm btn-light border fw-bold text-primary rounded-2 px-3">
                                            <FiEye className="me-1" /> View Invoice
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Orders;