import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import { getOrders, type Order } from '../services/orderService';
import { getMenu, type Pizza } from '../services/pizzaService';
import { formatCurrency } from '../utils/formatCurrency';
import { useAuth } from '../context/AuthContext';

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [menu, setMenu] = useState<Pizza[]>([]);

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const allOrders = getOrders();
            const userOrders = allOrders.filter(order => order.userId?.toLowerCase().trim() === user.email.toLowerCase().trim());
            setOrders(userOrders.reverse());
        } else {
            setOrders([]);
        }

        getMenu().then(data => setMenu(data)).catch(console.error);
    }, [user]);

    const getPizzaImage = (name: string) => {
        const pizza = menu.find(p => p.name === name);
        return pizza?.image || '/img/pizza_pepperoni.png'; // Fallback image from public
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4">Mis Pedidos</h2>
            {orders.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted fs-4">No tienes pedidos realizados aún.</p>
                </div>
            ) : (
                <Row>
                    {orders.map(order => (
                        <Col key={order.id} xs={12} className="mb-4">
                            <Card className="shadow-sm border-0">
                                <Card.Header className="bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
                                    <div>
                                        <strong>Pedido #{order.id}</strong>
                                        <div className="text-muted small">
                                            {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}
                                        </div>
                                    </div>
                                    <Badge
                                        bg={
                                            order.status === 'entregado' ? 'success' :
                                                order.status === 'cancelado' ? 'danger' :
                                                    'warning'
                                        }
                                        className="text-uppercase"
                                    >
                                        {order.status}
                                    </Badge>
                                </Card.Header>
                                <Card.Body className="px-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="d-flex align-items-center mb-3">
                                            <img
                                                src={getPizzaImage(item.name)}
                                                alt={item.name}
                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                className="rounded me-3"
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="mb-0">{item.name}</h6>
                                                <small className="text-muted">Cantidad: {item.count}</small>
                                            </div>
                                            <div className="fw-bold">
                                                {formatCurrency(item.price * item.count)}
                                            </div>
                                        </div>
                                    ))}
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className="fs-5">Total</span>
                                        <span className="fs-4 fw-bold">{formatCurrency(order.total)}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};
