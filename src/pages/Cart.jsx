import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, decrementQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { placeOrder } from '../store/slices/orderSlice';
import { toast } from 'react-toastify';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiCheckCircle, FiX, FiLock } from 'react-icons/fi';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems, totalAmount } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    // State to control real-looking secure payment modal
    const [showGateway, setShowGateway] = useState(false);

    const handleIncrement = (item) => {
        if (item.quantity >= item.stock) {
            toast.error(`Only ${item.stock} units available in stock.`);
            return;
        }
        dispatch(addToCart(item));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handleDelete = (id, name) => {
        dispatch(removeFromCart(id));
        toast.success(`${name} removed from cart.`);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.info('Cart cleared.');
    };

    const handleCheckoutTrigger = () => {
        if (cartItems.length === 0) return;
        setShowGateway(true); // Open payment window
    };

    const handlePaymentExecution = () => {
        setShowGateway(false);
        toast.success('Payment Received Successfully via Razorpay Secure Routing!');

        const uniqueOrderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);
        const currentSystemDate = new Date().toLocaleDateString('en-IN', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        // Save order globally and inside browser local storage
        dispatch(placeOrder({
            id: uniqueOrderId,
            date: currentSystemDate,
            amount: totalAmount,
            items: cartItems
        }));

        dispatch(clearCart());
        navigate(`/orders/${uniqueOrderId}`); // Go straight to invoice
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <div className="p-5 bg-white rounded-3 shadow-sm border border-opacity-10">
                    <h3 className="fw-bold text-dark mb-3">Your Procurement Cart is Empty</h3>
                    <p className="text-muted mb-4 small">Go to the materials catalogue to add raw materials.</p>
                    <Link to="/materials" className="btn btn-primary fw-bold px-4 py-2 rounded-3">
                        <FiArrowLeft className="me-2" /> Browse Materials
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-2 animate-fade-in position-relative">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-dark mb-0">Review Procurement Items</h4>
                <button className="btn btn-outline-danger btn-sm fw-bold rounded-3" onClick={handleClearCart}>
                    <FiTrash2 className="me-1" /> Clear Entire Cart
                </button>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-3 bg-white p-3">
                        {cartItems.map((item) => (
                            <div key={item.id} className="d-flex align-items-center justify-content-between p-3 mb-3 border-bottom pb-3">
                                <div className="d-flex align-items-center col-md-6">
                                    <img src={item.image} alt={item.name} className="rounded-3 me-3 object-cover" style={{ width: '70px', height: '70px' }} />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1 text-truncate" style={{ maxWidth: '250px' }}>{item.name}</h6>
                                        <span className="badge bg-light text-secondary border small">{item.category}</span>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-center col-md-3">
                                    <button className="btn btn-sm btn-outline-secondary rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }} onClick={() => handleDecrement(item.id)}>
                                        <FiMinus size={14} />
                                    </button>
                                    <span className="mx-3 fw-bold text-dark">{item.quantity}</span>
                                    <button className="btn btn-sm btn-outline-secondary rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }} onClick={() => handleIncrement(item)}>
                                        <FiPlus size={14} />
                                    </button>
                                </div>

                                <div className="text-end col-md-3">
                                    <h6 className="fw-bold text-primary mb-1">₹{(item.price * item.quantity).toLocaleString('en-IN')}</h6>
                                    <button className="btn text-danger btn-sm p-0 border-0 bg-transparent small" onClick={() => handleDelete(item.id, item.name)}>
                                        <FiTrash2 size={14} className="me-1" /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-3 bg-white p-4">
                        <h5 className="fw-bold text-dark mb-3">Procurement Summary</h5>
                        <hr className="text-muted opacity-25" />
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-secondary small">Total Estimate:</span>
                            <h4 className="fw-extrabold text-primary mb-0">₹{totalAmount.toLocaleString('en-IN')}</h4>
                        </div>
                        <p className="text-muted extra-small mb-4" style={{ fontSize: '11px' }}>*Taxes and logistics processing calculations are added globally.</p>

                        <button className="btn btn-success w-100 p-2.5 fw-bold shadow-sm rounded-3 border-0 d-flex align-items-center justify-content-center" onClick={handleCheckoutTrigger}>
                            <FiCheckCircle className="me-2" size={18} /> Proceed To Checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* 🛠️ BUILDCART OFFICIAL LOOKING INTEGRATION CHECKOUT PANEL */}
            {showGateway && (
                <div className="position-fixed top-0 start-0 min-vh-100 w-100 d-flex align-items-center justify-content-center z-3" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }}>
                    <div className="card border-0 bg-white shadow-lg rounded-4 overflow-hidden position-relative" style={{ maxWidth: '420px', width: '90%' }}>

                        {/* Header bar mirroring Razorpay corporate styling layout */}
                        <div className="bg-dark p-4 text-white text-center position-relative border-bottom border-primary border-3">
                            <button className="btn btn-sm position-absolute top-0 end-0 m-2 text-white border-0 bg-transparent opacity-75" onClick={() => setShowGateway(false)}>
                                <FiX size={20} />
                            </button>
                            <h5 className="fw-bold mb-1 text-primary">BuildCart Checkout</h5>
                            <p className="text-muted small mb-0 font-monospace" style={{ fontSize: '11px' }}>Secure Test Gateway Connection Node</p>
                        </div>

                        <div className="p-4 bg-light">
                            <div className="p-3 bg-white rounded-3 shadow-sm mb-4 border text-start">
                                <span className="text-secondary small d-block mb-1">Payable Procurement Amount:</span>
                                <h3 className="fw-extrabold text-dark mb-0">₹{totalAmount.toLocaleString('en-IN')}</h3>
                            </div>

                            <div className="text-start mb-4">
                                <label className="form-label small fw-bold text-secondary">Preferred Checkout Simulation Method</label>
                                <div className="card p-3 border-primary bg-primary bg-opacity-10 rounded-3 d-flex flex-row align-items-center">
                                    <FiLock className="text-primary me-3" size={24} />
                                    <div>
                                        <h6 className="fw-bold text-dark mb-0 small">Standard Test Netbanking</h6>
                                        <span className="text-muted extra-small" style={{ fontSize: '11px' }}>No external keys script dependencies needed</span>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-primary w-100 p-2.5 fw-bold shadowrounded-3 border-0" onClick={handlePaymentExecution}>
                                Complete Payment & Generate Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;