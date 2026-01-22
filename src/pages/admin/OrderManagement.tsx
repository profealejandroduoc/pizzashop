import { useState, useEffect } from 'react';
import { Table, Badge, Accordion } from 'react-bootstrap';
import { getOrders, updateOrderStatus, type Order, type OrderStatus } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatCurrency';

export const OrderManagement = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const loadOrders = () => {
        // In a real app we'd fetch from API. 
        // Logic in orderService currently returns all orders from localStorage
        setOrders(getOrders().reverse());
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusChange = (id: string, status: OrderStatus) => {
        updateOrderStatus(id, status);
        loadOrders();
    };

    const getStatusBadge = (status: OrderStatus) => {
        switch (status) {
            case 'pendiente': return 'warning';
            case 'preparación': return 'info';
            case 'despachado': return 'primary';
            case 'entregado': return 'success';
            case 'cancelado': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <div>
            <h2 className="mb-4 fw-bold">Gestión de Pedidos</h2>

            <div className="bg-white rounded shadow-sm p-4">
                <Accordion defaultActiveKey="0">
                    {orders.map((order, index) => (
                        <Accordion.Item eventKey={order.id} key={order.id} className="mb-3 border rounded overflow-hidden">
                            <Accordion.Header>
                                <div className="d-flex align-items-center w-100 pe-3 flex-wrap gap-3">
                                    <div className="me-auto">
                                        <h6 className="mb-0 fw-bold">Pedido #{order.id}</h6>
                                        <small className="text-muted">{order.userId || 'Invitado'} • {new Date(order.date).toLocaleString()}</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <span className="fw-bold fs-5 text-primary">{formatCurrency(order.total)}</span>
                                        <Badge bg={getStatusBadge(order.status)} className="text-uppercase px-3 py-2 rounded-pill">
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className="bg-light">
                                <div className="row g-4">
                                    <div className="col-md-8">
                                        <h6 className="fw-bold mb-3 border-bottom pb-2">Detalle del Pedido</h6>
                                        <div className="table-responsive bg-white rounded border">
                                            <Table className="mb-0 table-sm" borderless>
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th className="ps-3">Producto</th>
                                                        <th className="text-center">Cant.</th>
                                                        <th className="text-end pe-3">Precio</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.items.map((item, idx) => (
                                                        <tr key={idx}>
                                                            <td className="ps-3">{item.name}</td>
                                                            <td className="text-center">{item.count}</td>
                                                            <td className="text-end pe-3">{formatCurrency(item.price)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h6 className="fw-bold mb-3 border-bottom pb-2">Acciones</h6>
                                        <div className="d-grid gap-2">
                                            <p className="small text-muted mb-1">Cambiar estado a:</p>
                                            <div className="btn-group-vertical w-100">
                                                <button className={`btn btn-outline-warning text-start ${order.status === 'pendiente' ? 'active' : ''}`} onClick={() => handleStatusChange(order.id, 'pendiente')}>
                                                    <i className="bi bi-hourglass me-2"></i> Pendiente
                                                </button>
                                                <button className={`btn btn-outline-info text-start ${order.status === 'preparación' ? 'active' : ''}`} onClick={() => handleStatusChange(order.id, 'preparación')}>
                                                    <i className="bi bi-fire me-2"></i> En Preparación
                                                </button>
                                                <button className={`btn btn-outline-primary text-start ${order.status === 'despachado' ? 'active' : ''}`} onClick={() => handleStatusChange(order.id, 'despachado')}>
                                                    <i className="bi bi-bicycle me-2"></i> Despachado
                                                </button>
                                                <button className={`btn btn-outline-success text-start ${order.status === 'entregado' ? 'active' : ''}`} onClick={() => handleStatusChange(order.id, 'entregado')}>
                                                    <i className="bi bi-check-circle me-2"></i> Entregado
                                                </button>
                                            </div>
                                            <hr />
                                            <button className="btn btn-outline-danger" onClick={() => handleStatusChange(order.id, 'cancelado')}>
                                                <i className="bi bi-x-circle me-2"></i> Cancelar Pedido
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
                {orders.length === 0 && (
                    <div className="text-center py-5 text-muted">
                        <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
                        No hay pedidos registrados
                    </div>
                )}
            </div>
        </div>
    );
};
