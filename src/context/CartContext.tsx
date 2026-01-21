import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Pizza } from '../services/pizzaService';

interface CartItem extends Pizza {
    count: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (pizza: Pizza) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (pizza: Pizza) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === pizza.id);
            if (existing) {
                return prev.map(item =>
                    item.id === pizza.id
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            }
            return [...prev, { ...pizza, count: 1 }];
        });
    };

    const increaseQuantity = (id: string) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, count: item.count + 1 } : item
        ));
    };

    const decreaseQuantity = (id: string) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, count: Math.max(0, item.count - 1) };
            }
            return item;
        }).filter(item => item.count > 0));
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.count), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
