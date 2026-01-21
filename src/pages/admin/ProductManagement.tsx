
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Badge, Row, Col } from 'react-bootstrap';
import { getMenu, savePizza, deletePizza, type Pizza } from '../../services/pizzaService';
import { formatCurrency } from '../../utils/formatCurrency';

export const ProductManagement = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingPizza, setEditingPizza] = useState<Pizza | null>(null);

    // Form Stats
    const [formData, setFormData] = useState<Partial<Pizza>>({
        name: '',
        description: '',
        price: 0,
        image: '',
        rating: 5,
        ingredients: [] // using ingredients field if supported or add it to interface
    });

    const loadPizzas = async () => {
        const data = await getMenu();
        setPizzas(data);
    };

    useEffect(() => {
        loadPizzas();
    }, []);

    const handleOpenModal = (pizza?: Pizza) => {
        if (pizza) {
            setEditingPizza(pizza);
            setFormData(pizza);
        } else {
            setEditingPizza(null);
            setFormData({ name: '', description: '', price: 0, image: '', rating: 5 });
        }
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            await deletePizza(id);
            loadPizzas();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // For simplicity, reusing image or default if empty
            const image = formData.image || '/src/assets/img/pizza_pepperoni.png';

            await savePizza({
                ...formData as Pizza,
                image,
                id: editingPizza?.id || '' // Service handles empty ID as new
            });

            setShowModal(false);
            loadPizzas();
        } catch (error) {
            console.error(error);
            alert('Error al guardar');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Gestión de Productos</h2>
                <Button variant="primary" onClick={() => handleOpenModal()}>
                    <i className="bi bi-plus-lg me-2"></i> Nuevo Producto
                </Button>
            </div>

            <div className="bg-white rounded shadow-sm overflow-hidden">
                <Table hover responsive className="mb-0 align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="border-0 py-3 ps-4">Producto</th>
                            <th className="border-0 py-3">Precio</th>
                            <th className="border-0 py-3">Rating</th>
                            <th className="border-0 py-3 text-end pe-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pizzas.map(pizza => (
                            <tr key={pizza.id}>
                                <td className="ps-4">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={pizza.image}
                                            alt={pizza.name}
                                            className="rounded me-3 object-fit-cover"
                                            width="48"
                                            height="48"
                                        />
                                        <div>
                                            <div className="fw-bold">{pizza.name}</div>
                                            <small className="text-muted text-truncate d-block" style={{ maxWidth: '250px' }}>{pizza.description}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>{formatCurrency(pizza.price)}</td>
                                <td>
                                    <Badge bg="warning" text="dark">
                                        <i className="bi bi-star-fill me-1"></i>{pizza.rating}
                                    </Badge>
                                </td>
                                <td className="text-end pe-4">
                                    <Button variant="light" size="sm" className="me-2" onClick={() => handleOpenModal(pizza)}>
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(pizza.id)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editingPizza ? 'Editar Pizza' : 'Nueva Pizza'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>URL Imagen</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};
