
import { Row, Col, Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { getOrders } from '../../services/orderService';
import { getUserStats } from '../../services/userService';
import { getMenu } from '../../services/pizzaService';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        activeOrders: 0,
        totalUsers: 0,
        totalProducts: 0
    });
    const [salesData, setSalesData] = useState<any[]>([]);

    useEffect(() => {
        const orders = getOrders();
        const userStats = getUserStats();
        getMenu().then(menu => {
            setStats(prev => ({ ...prev, totalProducts: menu.length }));
        });

        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        const activeOrders = orders.filter(o => o.status === 'pendiente' || o.status === 'preparación').length;

        setStats({
            totalSales,
            activeOrders,
            totalUsers: userStats.total,
            totalProducts: stats.totalProducts
        });

        // Prepare chart data (Sales by date)
        const salesByDate = orders.reduce((acc: any, order) => {
            const date = new Date(order.date).toLocaleDateString();
            acc[date] = (acc[date] || 0) + order.total;
            return acc;
        }, {});

        const chartData = Object.keys(salesByDate).map(date => ({
            name: date,
            sales: salesByDate[date]
        }));

        setSalesData(chartData.slice(-7)); // Last 7 days
    }, []);

    const StatCard = ({ title, value, icon, color }: any) => (
        <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
                <div className={`rounded-circle bg-${color} bg-opacity-10 p-3 me-3`}>
                    <i className={`bi ${icon} text-${color} fs-3`}></i>
                </div>
                <div>
                    <h6 className="text-muted mb-1">{title}</h6>
                    <h3 className="mb-0 fw-bold">{value}</h3>
                </div>
            </Card.Body>
        </Card>
    );

    return (
        <div>
            <h2 className="mb-4 fw-bold">Dashboard</h2>

            {/* KPI Cards */}
            <Row className="g-3 mb-4">
                <Col md={3}>
                    <StatCard title="Ventas Totales" value={formatCurrency(stats.totalSales)} icon="bi-currency-dollar" color="success" />
                </Col>
                <Col md={3}>
                    <StatCard title="Pedidos Activos" value={stats.activeOrders} icon="bi-bag-check" color="primary" />
                </Col>
                <Col md={3}>
                    <StatCard title="Usuarios" value={stats.totalUsers} icon="bi-people" color="info" />
                </Col>
                <Col md={3}>
                    <StatCard title="Productos" value={stats.totalProducts} icon="bi-box-seam" color="warning" />
                </Col>
            </Row>

            {/* Charts */}
            <Row className="g-4">
                <Col md={8}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <h5 className="mb-4">Ventas Recientes</h5>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={salesData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                        <Bar dataKey="sales" fill="#0d6efd" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100 bg-primary text-white">
                        <Card.Body className="p-4">
                            <h5 className="mb-4">Resumen Rápido</h5>
                            <p className="mb-2 opacity-75">Última actualización</p>
                            <h4 className="mb-4">{new Date().toLocaleString()}</h4>

                            <hr className="border-white opacity-25" />

                            <div className="mb-3">
                                <div className="d-flex justify-content-between mb-1">
                                    <span>Meta Mensual</span>
                                    <span>75%</span>
                                </div>
                                <div className="progress" style={{ height: '6px' }}>
                                    <div className="progress-bar bg-white" role="progressbar" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
