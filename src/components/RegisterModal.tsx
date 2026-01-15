import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useState } from 'react';

interface RegisterModalProps {
    show: boolean;
    handleClose: () => void;
    switchToLogin: () => void;
}

export const RegisterModal = ({ show, handleClose, switchToLogin }: RegisterModalProps) => {
    const [formData, setFormData] = useState({
        rut: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.rut.trim()) newErrors.rut = 'El RUT es obligatorio';
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
        if (!formData.surname.trim()) newErrors.surname = 'El apellido es obligatorio';
        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
        if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        // Clear error when typing
        if (errors[e.target.id]) {
            setErrors({
                ...errors,
                [e.target.id]: ''
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false);
        if (validate()) {
            // Get existing users
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            // Add new user
            const { confirmPassword, ...userToSave } = formData;
            const newUser = { ...userToSave, id: Date.now(), esActivo: true }; // simple ID generation
            existingUsers.push(newUser);
            // Save to local storage
            localStorage.setItem('users', JSON.stringify(existingUsers));

            setSuccess(true);
            // Optional: Auto switch to login or close after delay
            setTimeout(() => {
                setSuccess(false);
                setFormData({ rut: '', name: '', surname: '', email: '', phone: '', password: '', confirmPassword: '' });
                switchToLogin();
            }, 2000);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton className="bg-secondary text-white border-bottom-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                <Modal.Title style={{ fontFamily: 'Oswald, sans-serif' }}><i className="bi bi-person-plus-fill me-2"></i>Crear Cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                {success && <Alert variant="success">¡Registro exitoso! Redirigiendo al login...</Alert>}
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="rut">
                                <Form.Label className="fw-bold">RUT</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="12.345.678-9"
                                    value={formData.rut}
                                    onChange={handleChange}
                                    isInvalid={!!errors.rut}
                                />
                                <Form.Control.Feedback type="invalid">{errors.rut}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="phone">
                                <Form.Label className="fw-bold">Teléfono Móvil</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="+56 9 1234 5678"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    isInvalid={!!errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="name">
                                <Form.Label className="fw-bold">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Juan"
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="surname">
                                <Form.Label className="fw-bold">Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Pérez"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    isInvalid={!!errors.surname}
                                />
                                <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group className="mb-4" controlId="email">
                        <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="nombre@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="password">
                                <Form.Label className="fw-bold">Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="******"
                                    value={formData.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-3">
                            <Form.Group controlId="confirmPassword">
                                <Form.Label className="fw-bold">Confirmar Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="******"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    isInvalid={!!errors.confirmPassword}
                                />
                                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" type="submit">
                            Registrarse
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center bg-light">
                <p className="mb-0 small">¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); switchToLogin(); }} className="text-primary fw-bold">Inicia Sesión</a></p>
            </Modal.Footer>
        </Modal>
    );
};
