import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    show: boolean;
    handleClose: () => void;
    switchToRegister: () => void;
}

export const LoginModal = ({ show, handleClose, switchToRegister }: LoginModalProps) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const loggedUser = await login(email, password);
            setEmail('');
            setPassword('');
            handleClose();

            // Redirect admin users to admin panel
            if (loggedUser && loggedUser.role === 'admin') {
                navigate('/admin');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-secondary text-white border-bottom-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                <Modal.Title style={{ fontFamily: 'Oswald, sans-serif' }}><i className="bi bi-person-circle me-2"></i>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError('')}>
                        <i className="bi bi-exclamation-circle-fill me-2"></i>
                        {error}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="emailInput">
                        <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordInput">
                        <Form.Label className="fw-bold">Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="rememberCheck">
                        <Form.Check type="checkbox" label="Recordarme" disabled={loading} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Iniciando sesión...
                                </>
                            ) : (
                                'Entrar'
                            )}
                        </Button>
                    </div>
                </Form>
                <div className="text-center mt-3">
                    <a href="#" className="text-decoration-none small text-muted">¿Olvidaste tu contraseña?</a>
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center bg-light">
                <p className="mb-0 small">¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); switchToRegister(); }} className="text-primary fw-bold">Regístrate</a></p>
            </Modal.Footer>
        </Modal>
    );
};
