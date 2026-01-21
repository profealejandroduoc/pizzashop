
import { useState, useEffect } from 'react';
import { Table, Badge, Dropdown } from 'react-bootstrap';
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

            <div className="bg-white rounded shadow-sm overflow-hidden">
                <Table hover responsive className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="border-0 py-3 ps-4">Pedido #</th>
                            <th className="border-0 py-3">Cliente</th>
                            <th className="border-0 py-3">Fecha</th>
                            <th className="border-0 py-3">Items</th>
                            <th className="border-0 py-3">Total</th>
                            <th className="border-0 py-3">Estado</th>
                            <th className="border-0 py-3 text-end pe-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="ps-4 fw-bold">{order.id}</td>
                                <td>{order.userId || 'Invitado'}</td>
                                <td>{new Date(order.date).toLocaleString()}</td>
                                <td>
                                    {order.items.length} items
                                    <div className="text-muted small text-truncate" style={{ maxWidth: '200px' }}>
                                        {order.items.map(i => i.name).join(', ')}
                                    </div>
                                </td>
                                <td className="fw-bold">{formatCurrency(order.total)}</td>
                                <td>
                                    <Badge bg={getStatusBadge(order.status)} className="text-uppercase">
                                        {order.status}
                                    </Badge>
                                </td>
                                <td className="text-end pe-4">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-dark" size="sm" id={`dropdown-basic-${order.id}`}>
                                            Actualizar
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleStatusChange(order.id, 'pendiente')}>Pendiente</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatusChange(order.id, 'preparación')}>Preparación</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatusChange(order.id, 'despachado')}>Despachado</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatusChange(order.id, 'entregado')}>Entregado</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={() => handleStatusChange(order.id, 'cancelado')} className="text-danger">Cancelar</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
