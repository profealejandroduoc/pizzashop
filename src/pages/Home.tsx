import { Carousel, Row, Col, Card, Button } from 'react-bootstrap';
// Import assets
import pizzaCar1 from '../assets/img/pizzacar1.png';
import pizzaCar2 from '../assets/img/pizzacar2.png';
import pizzaCar3 from '../assets/img/pizzacar3.png';
import pizza1 from '../assets/img/pizza1.jpg';

import { formatCurrency } from '../utils/formatCurrency';

export const Home = () => {
    return (
        <>
            {/* Carousel */}
            <section className="container-fluid p-0">
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block w-100" src={pizzaCar1} alt="Pizza pepperoni" />
                        <Carousel.Caption className="d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                            <h3>La Clásica Pepperoni</h3>
                            <p>Sabor intenso que nunca pasa de moda.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={pizzaCar2} alt="Pizza vegetariana" />
                        <Carousel.Caption className="d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                            <h3>Frescura Vegetariana</h3>
                            <p>Ingredientes seleccionados de la huerta a tu mesa.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={pizzaCar3} alt="Pizza margarita con burrata" />
                        <Carousel.Caption className="d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                            <h3>Especial Margarita</h3>
                            <p>Con auténtica burrata italiana.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>

            {/* Offers */}
            <section className="container my-5">
                <h2 className="text-center mb-5 display-5 fw-bold text-uppercase">Nuestras Ofertas Irresistibles</h2>
                <Row>
                    <Col lg={4} md={6} className="mb-4">
                        <Card className="h-100">
                            <Card.Img variant="top" src={pizza1} alt="Pizza 1" />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>Combo Pepperoni</Card.Title>
                                <Card.Text className="flex-grow-1">Disfruta de nuestra famosa pizza de pepperoni acompañada de tu bebida favorita.</Card.Text>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="h4 text-primary mb-0">{formatCurrency(9990)}</span>
                                    <Button variant="primary"><i className="bi bi-cart-plus"></i> Ordenar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} className="mb-4">
                        <Card className="h-100">
                            <Card.Img variant="top" src={pizza1} alt="Pizza 2" />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>Combo Veggie</Card.Title>
                                <Card.Text className="flex-grow-1">Pizza vegetariana cargada de sabor + un postre dulce para terminar.</Card.Text>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="h4 text-primary mb-0">{formatCurrency(11990)}</span>
                                    <Button variant="primary"><i className="bi bi-cart-plus"></i> Ordenar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} className="mb-4">
                        <Card className="h-100">
                            <Card.Img variant="top" src={pizza1} alt="Pizza 3" />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>Fiesta Pack</Card.Title>
                                <Card.Text className="flex-grow-1">Pizza especial familiar + 2 bebidas grandes. ¡Ideal para compartir!</Card.Text>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="h4 text-primary mb-0">{formatCurrency(14990)}</span>
                                    <Button variant="primary"><i className="bi bi-cart-plus"></i> Ordenar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
        </>
    );
};
