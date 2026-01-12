import { Modal, Button, Form } from 'react-bootstrap';

interface LoginModalProps {
    show: boolean;
    handleClose: () => void;
    switchToRegister: () => void;
}

export const LoginModal = ({ show, handleClose, switchToRegister }: LoginModalProps) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-secondary text-white border-bottom-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                <Modal.Title style={{ fontFamily: 'Oswald, sans-serif' }}><i className="bi bi-person-circle me-2"></i>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Form>
                    <Form.Group className="mb-3" controlId="emailInput">
                        <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                        <Form.Control type="email" placeholder="nombre@ejemplo.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordInput">
                        <Form.Label className="fw-bold">Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="********" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="rememberCheck">
                        <Form.Check type="checkbox" label="Recordarme" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" type="submit">
                            Entrar
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
