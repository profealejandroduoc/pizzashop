
import { useState, useEffect } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { getUsers, toggleUserStatus, type User } from '../../services/userService';

export const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);

    const loadUsers = () => {
        setUsers(getUsers());
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleToggleStatus = (id: string) => {
        if (window.confirm('¿Cambiar estado del usuario?')) {
            toggleUserStatus(id);
            loadUsers();
        }
    };

    return (
        <div>
            <h2 className="mb-4 fw-bold">Gestión de Usuarios</h2>

            <div className="bg-white rounded shadow-sm overflow-hidden">
                <Table hover responsive className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="border-0 py-3 ps-4">Usuario</th>
                            <th className="border-0 py-3">RUT</th>
                            <th className="border-0 py-3">Rol</th>
                            <th className="border-0 py-3">Estado</th>
                            <th className="border-0 py-3 text-end pe-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="ps-4">
                                    <div className="fw-bold">{user.name} {user.surname}</div>
                                    <div className="small text-muted">{user.email}</div>
                                </td>
                                <td>{user.rut}</td>
                                <td>
                                    <Badge bg={user.role === 'admin' ? 'purple' : 'info'} style={{ backgroundColor: user.role === 'admin' ? '#6f42c1' : '#0dcaf0' }}>
                                        {user.role}
                                    </Badge>
                                </td>
                                <td>
                                    {user.esActivo ? (
                                        <Badge bg="success">Activo</Badge>
                                    ) : (
                                        <Badge bg="danger">Bloqueado</Badge>
                                    )}
                                </td>
                                <td className="text-end pe-4">
                                    {user.role !== 'admin' && (
                                        <Button
                                            variant={user.esActivo ? "outline-danger" : "outline-success"}
                                            size="sm"
                                            onClick={() => handleToggleStatus(user.id)}
                                        >
                                            <i className={`bi ${user.esActivo ? 'bi-slash-circle' : 'bi-check-circle'}`}></i>
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
