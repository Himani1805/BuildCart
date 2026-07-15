import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice'; // Importing the global cart addition action mutator
import { toast } from 'react-toastify';
import { FiSearch, FiLayers, FiPackage, FiInfo, FiPlus } from 'react-icons/fi';

function Materials() {
    // Local states to track search input queries and category filters configuration parameters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const dispatch = useDispatch();

    // Extracting active database items and global cart array logs to compute dynamic states
    const { items, loading, error } = useSelector((state) => state.products);
    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Caching the search evaluation algorithm processes via useMemo hook configurations
    const filteredProducts = useMemo(() => {
        return items.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [items, searchQuery, selectedCategory]);

    const categories = useMemo(() => {
        const list = items.map((p) => p.category);
        return ['All', ...new Set(list)];
    }, [items]);

    // Action event execution interceptor to push items payload to global slice state
    const handleAddToCart = (product) => {
        // Checking current cart allocation buffers constraints before pushing mutation data
        const existingInCart = cartItems.find((item) => item.id === product.id);

        if (existingInCart && existingInCart.quantity >= product.stock) {
            toast.error(`Procurement allocation limit breached. Only ${product.stock} units available in stock repository.`);
            return;
        }

        dispatch(addToCart(product));
        toast.success(`${product.name} appended to procurement cart buffers pipeline.`);
    };

    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center py-5 mt-5">
                <div className="spinner-border text-primary spinner-border-lg mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                <h5 className="text-secondary fw-bold">Synchronizing Inventory Database...</h5>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger d-flex align-items-center m-4 shadow-sm border-2 rounded-3" role="alert">
                <FiInfo size={24} className="me-3 flex-shrink-0" />
                <div>
                    <h5 className="alert-heading fw-bold mb-1">Operational Retrieval Exception Crash</h5>
                    <p className="mb-0 small">{error} — Please verify mock API endpoint configurations.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-2 animate-fade-in">
            {/* Search Input Controls and Filter Header Components Panel Cards Blocks */}
            <div className="card border-0 bg-white p-4 shadow-sm rounded-3 mb-4">
                <div className="row g-3 align-items-center">
                    <div className="col-md-5">
                        <div className="input-group input-group-merge position-relative search-box-wrapper">
                            <span className="input-group-text bg-light border-0 text-muted ps-3 position-absolute start-0 top-50 translate-middle-y z-3">
                                <FiSearch size={18} />
                            </span>
                            <input
                                type="text"
                                className="form-control bg-light border-0 p-2.5 ps-5 rounded-3 text-dark"
                                placeholder="Search raw materials by title description parameters logs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="d-flex flex-wrap gap-2 justify-content-md-end align-items-center">
                            <span className="text-secondary small fw-semibold me-1 d-flex align-items-center">
                                <FiLayers className="me-1 text-primary" /> Filter Categories:
                            </span>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`btn btn-sm px-3 py-2 fw-semibold rounded-pill tracking-wide transition-all shadow-sm ${selectedCategory === category
                                            ? 'btn-primary text-white border-0'
                                            : 'btn-outline-secondary bg-white text-dark border-1 border-opacity-25'
                                        }`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Catalogue Grid Sections Wrapper Layout Title Node Displays Banner */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="fw-bold text-dark mb-0 d-flex align-items-center">
                    <FiPackage className="me-2 text-primary" /> Procurement Catalogue Roster
                </h4>
                <span className="badge bg-secondary bg-opacity-10 text-primary border border-primary border-opacity-25 fw-bold px-3 py-2 rounded-3">
                    Records Available: {filteredProducts.length} Items
                </span>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="card text-center p-5 border-0 bg-white shadow-sm rounded-3">
                    <div className="card-body">
                        <FiInfo size={48} className="text-warning mb-3 opacity-75" />
                        <h5 className="fw-bold text-dark mb-1">Zero Match Evaluation Records Mismatch</h5>
                        <p className="text-muted small mb-0">No raw materials track indices found matching the input matrix filters query standard criteria.</p>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {filteredProducts.map((product) => {
                        // Computing localized items parameters data to display reactive real-time text updates status values
                        const cartItemIndex = cartItems.find((item) => item.id === product.id);
                        const itemsInCartCount = cartItemIndex ? cartItemIndex.quantity : 0;

                        return (
                            <div className="col-md-6 col-lg-4 col-xl-3" key={product.id}>
                                <div className="card border-0 bg-white h-100 shadow-sm rounded-3 overflow-hidden position-relative">
                                    <div className="position-relative overflow-hidden" style={{ height: '180px' }}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-100 h-100 object-cover img-fluid"
                                            loading="lazy"
                                        />
                                        <span className="position-absolute top-0 end-0 bg-dark bg-opacity-75 text-info text-uppercase extra-small-tag fw-bold px-2.5 py-1 m-2 rounded-2 small shadow-sm" style={{ fontSize: '10px' }}>
                                            {product.category}
                                        </span>
                                    </div>

                                    <div className="card-body d-flex flex-column p-4">
                                        <h5 className="card-title fw-bold text-dark text-truncate mb-1" title={product.name}>
                                            {product.name}
                                        </h5>
                                        <p className="card-text text-muted small line-clamp-2 mb-3 flex-grow-1" style={{ fontSize: '12.5px', height: '38px', overflow: 'hidden' }}>
                                            {product.description}
                                        </p>

                                        <div className="d-flex align-items-baseline mb-3 bg-light p-2.5 rounded-3 border border-dark border-opacity-5">
                                            <span className="text-primary fw-extrabold fs-4 lh-1">₹{product.price.toLocaleString('en-IN')}</span>
                                            <span className="text-secondary small ms-1 fw-medium">/ per {product.unit}</span>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <span className="small text-secondary fw-semibold">Availability Stock:</span>
                                            <span className={`badge px-2.5 py-1.5 rounded-2 fw-bold small ${product.stock > 20 ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-25' : 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25'
                                                }`}>
                                                {product.stock} {product.unit}s Left
                                            </span>
                                        </div>

                                        {/* Interactive Operational Submit Clicks Toggle Framework Action Components Trigger */}
                                        <button
                                            className={`btn btn-sm w-100 p-2 fw-bold shadow-sm d-flex align-items-center justify-content-center border-0 rounded-3 ${itemsInCartCount > 0 ? 'btn-success text-white' : 'btn-primary'
                                                }`}
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <FiPlus className="me-1.5" />
                                            {itemsInCartCount > 0 ? `Procured (${itemsInCartCount} ${product.unit}s)` : 'Request Procurement'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Materials;