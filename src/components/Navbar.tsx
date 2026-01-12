import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const location = useLocation();
    const { total } = useCart();

    const handleSwitchToRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    const handleSwitchToLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    return (
        <>
            <BsNavbar expand="lg" sticky="top" className="navbar">
                <Container>
                    <BsNavbar.Brand as={Link} to="/">
                        <i className="bi bi-pizza fs-2 me-2"></i>Pizza Shop
                    </BsNavbar.Brand>
                    <BsNavbar.Toggle aria-controls="navbarNav" />
                    <BsNavbar.Collapse id="navbarNav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/menu" active={location.pathname === '/menu'}>Menú</Nav.Link>
                            <Nav.Link href="#">Ofertas</Nav.Link>
                            <Nav.Link href="#">Contacto</Nav.Link>
                            <Nav.Item className="ms-lg-3">
                                <Button as={Link} to="/cart" variant="outline-primary" className="rounded-pill px-4 me-2">
                                    <i className="bi bi-cart-fill me-1"></i> {formatCurrency(total)}
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant="outline-light" className="rounded-pill px-4" onClick={() => setShowLogin(true)}>
                                    <i className="bi bi-person-fill me-1"></i> Entrar
                                </Button>
                            </Nav.Item>
                        </Nav>
                    </BsNavbar.Collapse>
                </Container>
            </BsNavbar>
            <LoginModal
                show={showLogin}
                handleClose={() => setShowLogin(false)}
                switchToRegister={handleSwitchToRegister}
            />
            <RegisterModal
                show={showRegister}
                handleClose={() => setShowRegister(false)}
                switchToLogin={handleSwitchToLogin}
            />
        </>
    );
};
