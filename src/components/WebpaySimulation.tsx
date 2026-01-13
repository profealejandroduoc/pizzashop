import { useState, useEffect } from 'react';
import { Card, Button, Spinner, Container, Row, Col, Form } from 'react-bootstrap';
import { formatCurrency } from '../utils/formatCurrency';

interface WebpaySimulationProps {
    amount: number;
    onSuccess: () => void;
    onCancel: () => void;
}

type SimulationState = 'redirecting' | 'payment-form' | 'processing' | 'approved';

export const WebpaySimulation = ({ amount, onSuccess, onCancel }: WebpaySimulationProps) => {
    const [state, setState] = useState<SimulationState>('redirecting');

    useEffect(() => {
        if (state === 'redirecting') {
            const timer = setTimeout(() => {
                setState('payment-form');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state]);

    const handlePayment = () => {
        setState('processing');
        setTimeout(() => {
            setState('approved');
            setTimeout(() => {
                onSuccess();
            }, 2000);
        }, 3000);
    };

    if (state === 'redirecting') {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center bg-white p-5 rounded shadow-sm">
                <Spinner animation="grow" variant="danger" className="mb-3" />
                <h4 className="text-secondary">Conectando con Webpay...</h4>
                <p className="text-muted small">No cierres esta ventana</p>
            </div>
        );
    }

    if (state === 'processing') {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center bg-white p-5 rounded shadow-sm">
                <Spinner animation="border" variant="danger" className="mb-3" />
                <h4 className="text-secondary">Procesando tu pago...</h4>
                <p className="text-muted small">Estamos verificando tu transacción</p>
            </div>
        );
    }

    if (state === 'approved') {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center bg-white p-5 rounded shadow-sm">
                <div className="text-success mb-3">
                    <i className="bi bi-check-circle-fill display-1"></i>
                </div>
                <h3 className="text-success">¡Transacción Aprobada!</h3>
                <p className="text-muted">Redirigiendo al comercio...</p>
            </div>
        );
    }

    return (
        <Card className="shadow-lg border-0 overflow-hidden" style={{ maxWidth: '600px', width: '100%' }}>
            <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
                <span className="fw-bold">Webpay Plus</span>
                <small>Simulación</small>
            </div>
            <Card.Body className="p-4">
                <Container fluid>
                    <Row className="mb-4">
                        <Col className="text-center">
                            <h5 className="text-muted mb-1">Monto a pagar</h5>
                            <h2 className="fw-bold">{formatCurrency(amount)}</h2>
                        </Col>
                    </Row>

                    <Card className="bg-light border-0 mb-4">
                        <Card.Body>
                            <h6 className="mb-3">Selecciona tu medio de pago</h6>
                            <Row className="g-3">
                                <Col xs={6}>
                                    <Button variant="outline-dark" className="w-100 py-3 active">
                                        <i className="bi bi-credit-card-2-front fs-4 d-block mb-1"></i>
                                        Débito
                                    </Button>
                                </Col>
                                <Col xs={6}>
                                    <Button variant="outline-dark" className="w-100 py-3">
                                        <i className="bi bi-credit-card fs-4 d-block mb-1"></i>
                                        Crédito
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Número de Tarjeta</Form.Label>
                            <Form.Control type="text" placeholder="XXXX XXXX XXXX XXXX" defaultValue="5555 4444 3333 2222" readOnly />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mes/Año</Form.Label>
                                    <Form.Control type="text" defaultValue="12/28" readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="password" defaultValue="***" readOnly />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Card.Body>
            <Card.Footer className="p-3 bg-white border-top-0 d-flex justify-content-between">
                <Button variant="link" className="text-danger text-decoration-none" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="danger" className="px-5 rounded-pill" onClick={handlePayment}>
                    Pagar
                </Button>
            </Card.Footer>
        </Card>
    );
};
