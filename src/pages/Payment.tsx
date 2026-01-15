import { useState, useEffect } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { WebpaySimulation } from '../components/WebpaySimulation';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { saveOrder } from '../services/orderService';

export const Payment = () => {
    const { total, cart, clearCart } = useCart();
    const [status, setStatus] = useState<'processing' | 'success' | 'initial'>('initial');
    const navigate = useNavigate();

    useEffect(() => {
        // Only redirect if cart is empty and we are not in success state
        if (total === 0 && status !== 'success') {
            navigate('/cart');
        } else if (total > 0 && status === 'initial') {
            setStatus('processing');
        }
    }, [total, navigate, status]);


    const handlePaymentSuccess = () => {
        // Save order to localStorage before clearing cart
        const orderItems = cart.map(item => ({
            name: item.name,
            price: item.price,
            count: item.count,
            image: item.image
        }));

        saveOrder(orderItems, total);

        setStatus('success');
        clearCart();
    };

    const handlePaymentCancel = () => {
        navigate('/cart');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            {status === 'processing' && (
                <WebpaySimulation
                    amount={total}
                    onSuccess={handlePaymentSuccess}
                    onCancel={handlePaymentCancel}
                />
            )}

            {status === 'success' && (
                <Card className="text-center p-5 shadow border-0" style={{ maxWidth: '500px', width: '100%' }}>
                    <Card.Body>
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
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};
