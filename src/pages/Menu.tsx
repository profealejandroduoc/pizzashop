import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { PizzaCard } from '../components/PizzaCard';
import { useEffect, useState } from 'react';
import { getMenu, type Pizza } from '../services/pizzaService';
import pizzaCar1 from '../assets/img/pizzacar1.png';

export const Menu = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getMenu();
                setPizzas(data);
            } catch (err) {
                console.error("Error fetching menu:", err);
                setError("Error al cargar el menú.");
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    return (
        <>
            <header className="bg-dark text-white text-center py-5 mb-5" style={{ background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${pizzaCar1})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <Container className="px-4 px-lg-5 my-5">
                    <h1 className="display-3 fw-bold text-white">Nuestro Menú</h1>
                    <p className="lead text-white-50 mb-0">Sabores auténticos hechos con pasión</p>
                </Container>
            </header>

            <section className="container py-5">
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2">Cargando menú...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">{error}</Alert>
                ) : (
                    <Row className="gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center">
                        {pizzas.map((pizza) => (
                            <Col className="mb-5" key={pizza.id}>
                                <PizzaCard {...pizza} />
                            </Col>
                        ))}
                    </Row>
                )}
            </section>
        </>
    );
};
