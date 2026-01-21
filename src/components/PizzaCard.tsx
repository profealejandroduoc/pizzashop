import { Card, Button, Badge } from 'react-bootstrap';

interface PizzaCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number; // 0-5
    badge?: { text: string; color: string };
    ingredients?: string[];
}

import { formatCurrency } from '../utils/formatCurrency';

import { useCart } from '../context/CartContext';

export const PizzaCard = ({ id, name, description, price, image, rating, badge, ingredients }: PizzaCardProps) => {
    const { addToCart } = useCart();

    return (
        <Card className="h-100">
            {badge && (
                <Badge bg={badge.color} className="position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
                    {badge.text}
                </Badge>
            )}
            <Card.Img variant="top" src={image} alt={name} />
            <Card.Body className="p-4 d-flex flex-column">
                <div className="text-center">
                    <h5 className="fw-bolder" style={{ color: 'var(--secondary-color)' }}>{name}</h5>
                    <div className="d-flex justify-content-center small text-warning mb-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`bi ${i < Math.floor(rating) ? 'bi-star-fill' : i < rating ? 'bi-star-half' : 'bi-star'}`}></div>
                        ))}
                    </div>
                    {formatCurrency(price)}
                </div>
                <p className="card-text text-center text-muted small mt-2 flex-grow-1">{description}</p>
            </Card.Body>
            <Card.Footer className="p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                    <Button variant="primary" className="mt-auto" onClick={() => addToCart({ id, name, description, price, image, rating, badge, ingredients })}>Añadir al carrito</Button>
                </div>
            </Card.Footer>
        </Card>
    );
};
