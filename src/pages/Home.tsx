import { Carousel, Row, Col, Card, Button } from 'react-bootstrap';
// Import assets
import pizzaCar1 from '../assets/img/pizzacar1.png';
import pizzaCar2 from '../assets/img/pizzacar2.png';
import pizzaCar3 from '../assets/img/pizzacar3.png';
import pizza1 from '../assets/img/pizza1.jpg';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export const Home = () => {
    const { addToCart } = useCart();

    const offers = [
        {
            id: 'combo-pepperoni',
            name: 'Combo Pepperoni',
            price: 9990,
            image: pizza1,
            rating: 5,
            description: 'Disfruta de nuestra famosa pizza de pepperoni acompañada de tu bebida favorita.'
        },
        {
            id: 'combo-veggie',
            name: 'Combo Veggie',
            price: 11990,
            image: pizza1, // keeping same image as placeholder for now as in original
            rating: 4,
            description: 'Pizza vegetariana cargada de sabor + un postre dulce para terminar.'
        },
        {
            id: 'fiesta-pack',
            name: 'Fiesta Pack',
            price: 14990,
            image: pizza1,
            rating: 5,
            description: 'Pizza especial familiar + 2 bebidas grandes. ¡Ideal para compartir!'
        }
    ];

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
            <section id="ofertas" className="container my-5">
                <h2 className="text-center mb-5 display-5 fw-bold text-uppercase">Nuestras Ofertas Irresistibles</h2>
                <Row>
                    {offers.map((offer) => (
                        <Col lg={4} md={6} className="mb-4" key={offer.name}>
                            <Card className="h-100">
                                <Card.Img variant="top" src={offer.image} alt={offer.name} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{offer.name}</Card.Title>
                                    <Card.Text className="flex-grow-1">{offer.description}</Card.Text>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className="h4 text-primary mb-0">{formatCurrency(offer.price)}</span>
                                        <Button variant="primary" onClick={() => addToCart(offer as any)}>
                                            <i className="bi bi-cart-plus"></i> Ordenar
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </>
    );
};
