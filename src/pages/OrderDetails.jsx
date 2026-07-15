import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // Importing jsPDF Engine
import { FiArrowLeft, FiDownload, FiCheckCircle } from 'react-icons/fi';

function OrderDetails() {
    const { orderId } = useParams();
    const { ordersList } = useSelector((state) => state.orders);

    const order = ordersList.find((o) => o.id === orderId);

    // jsPDF Code for Dynamic Invoice Generation
    const handleDownloadInvoice = () => {
        if (!order) return;

        const doc = new jsPDF();

        // Title Section
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(13, 110, 253);
        doc.text('BUILDCART PRIVATE LTD.', 14, 20);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text('Greater Noida Industrial Zone, UP, India', 14, 26);

        doc.setDrawColor(200, 200, 200);
        doc.line(14, 34, 196, 34);

        // Metadata Details
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(33, 37, 41);
        doc.text(`INVOICE ID: ${order.id}`, 14, 44);

        doc.setFont('helvetica', 'normal');
        doc.text(`Transaction Date: ${order.date}`, 14, 51);
        doc.text(`Payment Status: Paid / Settled via Razorpay`, 14, 57);

        // Table Header Construction
        let currentY = 70;
        doc.setFont('helvetica', 'bold');
        doc.setFillColor(242, 244, 246);
        doc.rect(14, currentY, 182, 8, 'F');
        doc.text('Material Title', 16, currentY + 6);
        doc.text('Rate Price', 100, currentY + 6);
        doc.text('Qty', 145, currentY + 6);
        doc.text('Net Total', 170, currentY + 6);

        // Render Table Items
        order.items.forEach((item) => {
            currentY += 10;
            doc.setFont('helvetica', 'normal');
            doc.text(item.name.substring(0, 30), 16, currentY + 6);
            doc.text(`Rs.${item.price}`, 100, currentY + 6);
            doc.text(`${item.quantity} ${item.unit}`, 145, currentY + 6);
            doc.text(`Rs.${item.price * item.quantity}`, 170, currentY + 6);
        });

        // Grand Total Row
        currentY += 16;
        doc.line(14, currentY, 196, currentY);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(`GRAND TOTAL: Rs.${order.amount.toLocaleString('en-IN')}/-`, 120, currentY + 8);

        // Download command trigger
        doc.save(`BuildCart_Invoice_${order.id}.pdf`);
    };

    if (!order) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-warning">Invoice logging parameters mismatch.</div>
                <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="pt-2 animate-fade-in text-start">
            <div className="mb-4">
                <Link to="/orders" className="text-decoration-none text-secondary small fw-bold d-flex align-items-center">
                    <FiArrowLeft className="me-1" /> Back to Orders Logs
                </Link>
            </div>

            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm bg-white rounded-3 p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                            <div className="d-flex align-items-center">
                                <FiCheckCircle size={32} className="text-success me-3" />
                                <div>
                                    <h5 className="fw-bold text-dark mb-0">Order Summary: {order.id}</h5>
                                    <span className="text-muted extra-small">Receipt token generated successfully.</span>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-sm fw-bold rounded-3 px-3 d-flex align-items-center" onClick={handleDownloadInvoice}>
                                <FiDownload className="me-1.5" /> Download PDF Receipt
                            </button>
                        </div>

                        <h6 className="fw-bold text-secondary mb-3">Procured Raw Materials:</h6>
                        {order.items.map((item) => (
                            <div key={item.id} className="d-flex align-items-center justify-content-between bg-light p-3 rounded-3 mb-3 border">
                                <div className="d-flex align-items-center">
                                    <img src={item.image} alt={item.name} className="rounded-3 me-3 object-cover" style={{ width: '50px', height: '50px' }} />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-0 small">{item.name}</h6>
                                        <span className="text-muted extra-small" style={{ fontSize: '11px' }}>Category: {item.category}</span>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <h6 className="fw-bold text-primary mb-0 small">₹{(item.price * item.quantity).toLocaleString('en-IN')}</h6>
                                    <span className="text-muted extra-small d-block" style={{ fontSize: '11px' }}>Qty: {item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm bg-white rounded-3 p-4 border-top border-4 border-success">
                        <h5 className="fw-bold text-dark mb-3">Auditing Verification</h5>
                        <hr className="opacity-25" />
                        <div className="mb-3">
                            <span className="text-muted small d-block mb-1">Gateway Settlement:</span>
                            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2.5 py-1.5 fw-bold rounded-2">Paid via Razorpay</span>
                        </div>
                        <div className="mb-3">
                            <span className="text-muted small d-block mb-1">Total Paid Metrics Value:</span>
                            <h4 className="fw-extrabold text-primary">₹{order.amount.toLocaleString('en-IN')}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;