export interface OrderItem {
    id?: string;
    name: string;
    price: number;
    count: number;
}

export type OrderStatus = 'pendiente' | 'preparación' | 'despachado' | 'entregado' | 'cancelado';

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    date: string;
    status: OrderStatus;
    userId?: string;
}

export const saveOrder = (items: OrderItem[], total: number, userId?: string): Order => {
    const newOrder: Order = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        items,
        total,
        date: new Date().toISOString(),
        status: 'pendiente',
        userId
    };

    const existingOrders = getOrders();
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    return newOrder;
};

export const getOrders = (): Order[] => {
    const ordersJson = localStorage.getItem('orders');
    return ordersJson ? JSON.parse(ordersJson) : [];
};

export const updateOrderStatus = (orderId: string, newStatus: OrderStatus): boolean => {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex === -1) return false;

    orders[orderIndex].status = newStatus;
    localStorage.setItem('orders', JSON.stringify(orders));

    return true;
};
