import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { path: '/admin', icon: 'bi-speedometer2', label: 'Dashboard' },
        { path: '/admin/products', icon: 'bi-box-seam', label: 'Productos' },
        { path: '/admin/users', icon: 'bi-people', label: 'Usuarios' },
        { path: '/admin/orders', icon: 'bi-receipt', label: 'Pedidos' },
    ];

    return (
        <div className="d-flex min-vh-100 bg-light">
            {/* Sidebar */}
            <div
                className={`bg-dark text-white p-3 d-flex flex-column transition-all ${sidebarOpen ? 'w-250px' : 'w-80px'}`}
                style={{ width: sidebarOpen ? '280px' : '80px', transition: 'width 0.3s' }}
            >
                <div className="d-flex align-items-center mb-4 text-decoration-none text-white overflow-hidden">
                    <i className="bi bi-pizza fs-2 me-2 text-primary"></i>
                    {sidebarOpen && <span className="fs-4 fw-bold">AdminPanel</span>}
                </div>

                <Nav className="flex-column flex-grow-1">
                    {navItems.map((item) => (
                        <Nav.Link
                            key={item.path}
                            as={Link}
                            to={item.path}
                            className={`text-white mb-2 d-flex align-items-center ${location.pathname === item.path ? 'bg-primary rounded' : ''}`}
                            title={!sidebarOpen ? item.label : ''}
                        >
                            <i className={`bi ${item.icon} fs-5 ${sidebarOpen ? 'me-3' : 'mx-auto'}`}></i>
                            {sidebarOpen && <span>{item.label}</span>}
                        </Nav.Link>
                    ))}
                </Nav>

                <div className="mt-auto pt-3 border-top border-secondary">
                    <div className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className={`rounded-circle bg-primary check d-flex align-items-center justify-content-center ${sidebarOpen ? 'me-2' : 'mx-auto'}`} style={{ width: 32, height: 32 }}>
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        {sidebarOpen && <strong>{user?.name || 'Admin'}</strong>}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column" style={{ overflowX: 'hidden' }}>
                <Navbar bg="white" className="shadow-sm px-4">
                    <Button variant="link" className="text-dark p-0 me-3" onClick={toggleSidebar}>
                        <i className="bi bi-list fs-4"></i>
                    </Button>
                    <Navbar.Brand className="me-auto">
                        Administración
                    </Navbar.Brand>
                    <div className="d-flex align-items-center gap-3">
                        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-1"></i> Salir
                        </Button>
                    </div>
                </Navbar>

                <Container fluid className="p-4 overflow-auto">
                    <Outlet />
                </Container>
            </div>
        </div>
    );
};
