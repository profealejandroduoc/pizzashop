import { Container, Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, total } = useCart();

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">Carrito de Compras</h2>
            {cart.length === 0 ? (
                <div className="text-center py-5">
                    <i className="bi bi-cart-x display-1 text-muted mb-3 d-block"></i>
                    <p className="lead">Tu carrito está vacío.</p>
                    <Button variant="dark" href="/menu">Volver al menú</Button>
                </div>
            ) : (
                <Row>
                    <Col md={8}>
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Body className="p-0">
                                <ListGroup variant="flush">
                                    {cart.map((item) => (
                                        <ListGroup.Item key={item.name} className="d-flex align-items-center justify-content-between p-4 border-bottom">
                                            <div className="d-flex align-items-center flex-grow-1">
                                                <Image src={item.image} rounded style={{ width: '100px', height: '100px', objectFit: 'cover' }} className="me-4 shadow-sm" />
                                                <div>
                                                    <h5 className="mb-1 fw-bold">{item.name}</h5>
                                                    <p className="mb-0 text-muted">{formatCurrency(item.price)}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="d-flex align-items-center border rounded-pill px-2 py-1 me-4 bg-light">
                                                    <Button variant="link" className="text-dark p-0 text-decoration-none" size="sm" onClick={() => decreaseQuantity(item.name)}>
                                                        <i className="bi bi-dash"></i>
                                                    </Button>
                                                    <span className="mx-3 fw-bold">{item.count}</span>
                                                    <Button variant="link" className="text-dark p-0 text-decoration-none" size="sm" onClick={() => increaseQuantity(item.name)}>
                                                        <i className="bi bi-plus"></i>
                                                    </Button>
                                                </div>
                                                <div className="fw-bold fs-5 text-end" style={{ minWidth: '100px' }}>
                                                    {formatCurrency(item.price * item.count)}
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm bg-light">
                            <Card.Body className="p-4">
                                <h4 className="fw-bold mb-4">Resumen del Pedido</h4>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Subtotal</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4 pb-3 border-bottom">
                                    <span className="text-muted">Envío</span>
                                    <span className="text-success fw-bold">Gratis</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fs-5 fw-bold">Total</span>
                                    <span className="fs-5 fw-bold">{formatCurrency(total)}</span>
                                </div>
                                <Button variant="dark" size="lg" className="w-100 fw-bold" href="/checkout">Ir a Pagar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};
