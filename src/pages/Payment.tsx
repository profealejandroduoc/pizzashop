import { useState, useEffect } from 'react';
import { Container, Card, Spinner, Button, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

export const Payment = () => {
    const { total, clearCart } = useCart();
    const [status, setStatus] = useState<'processing' | 'success' | 'initial'>('initial');
    const navigate = useNavigate();

    useEffect(() => {
        // Start processing automatically when component mounts
        if (total > 0) {
            setStatus('processing');
            const timer = setTimeout(() => {
                setStatus('success');
                clearCart();
            }, 3000); // Simulate 3 seconds processing
            return () => clearTimeout(timer);
        } else if (status === 'initial') {
            // Redirect if cart is empty and not already processing/success
            navigate('/cart');
        }
    }, [total, clearCart, navigate, status]);


    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Card className="text-center p-5 shadow border-0" style={{ maxWidth: '500px', width: '100%' }}>
                <Card.Body>
                    {status === 'processing' && (
                        <>
                            <Spinner animation="border" variant="primary" className="mb-4" style={{ width: '4rem', height: '4rem' }} />
                            <h3 className="mb-3">Redirigiendo a Webpay...</h3>
                            <p className="text-muted">Por favor no cierres esta ventana.</p>
                            <div className="mt-4 p-3 bg-light rounded">
                                <small className="text-uppercase text-muted fw-bold">Total a pagar</small>
                                <div className="fs-3 fw-bold">{formatCurrency(total)}</div>
                            </div>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="mb-4 text-success">
                                <i className="bi bi-check-circle-fill display-1"></i>
                            </div>
                            <h2 className="mb-3 text-success">¡Pago Exitoso!</h2>
                            <p className="text-muted mb-4">Tu pedido ha sido confirmado y está siendo preparado.</p>
                            <Alert variant="info" className="mb-4">
                                <i className="bi bi-info-circle me-2"></i>
                                Te hemos enviado un comprobante a tu correo.
                            </Alert>
                            <Button variant="dark" size="lg" className="w-100" onClick={() => navigate('/')}>
                                Volver al Inicio
                            </Button>
                        </>
                    )}
                    {status === 'initial' && total === 0 && (
                        <p>Redirigiendo...</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};
