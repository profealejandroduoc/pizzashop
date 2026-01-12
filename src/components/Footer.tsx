export const Footer = () => {
    return (
        <footer className="text-white py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4 mb-md-0">
                        <h4 className="mb-4">Pizza Shop</h4>
                        <p className="text-white-50">La mejor pizza de la ciudad, hecha con pasión y los ingredientes más frescos.</p>
                    </div>
                    <div className="col-md-4 mb-4 mb-md-0">
                        <h5 className="mb-3">Contacto</h5>
                        <ul className="list-unstyled text-white-50">
                            <li className="mb-2"><i className="bi bi-geo-alt me-2"></i>Calle Ficticia 123, Ciudad</li>
                            <li className="mb-2"><i className="bi bi-telephone me-2"></i>(555) 123-4567</li>
                            <li><i className="bi bi-envelope me-2"></i>info@pizzashop.com</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5 className="mb-3">Síguenos</h5>
                        <div className="d-flex gap-3">
                            <a href="https://wa.me/1234567890" target="_blank" className="fs-4 text-accent"><i className="bi bi-whatsapp"></i></a>
                            <a href="#" className="fs-4 text-accent"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="fs-4 text-accent"><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-secondary" />
                <div className="text-center text-white-50">
                    <small>&copy; 2024 Pizza Shop. Todos los derechos reservados.</small>
                </div>
            </div>
        </footer>
    );
};
