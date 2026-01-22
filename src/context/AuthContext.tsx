import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Extend User interface to include role
export interface User {
    email: string;
    token: string;
    role: 'admin' | 'user';
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<User>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    // Seed Admin User if not exists
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const adminExists = users.some((u: any) => u.email === 'admin@admin.cl');

        if (!adminExists) {
            const adminUser = {
                id: 'admin-001',
                email: 'admin@admin.cl',
                password: 'admin', // In a real app, hash this!
                name: 'Super',
                surname: 'Admin',
                phone: '00000000',
                role: 'admin',
                esActivo: true
            };
            users.push(adminUser);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }, []);

    const login = async (email: string, password: string) => {
        return new Promise<User>((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const foundUser = users.find((u: any) => u.email === email.toLowerCase().trim() && u.password === password);

                if (foundUser) {
                    if (!foundUser.esActivo) {
                        reject(new Error('Usuario bloqueado. Contacte al administrador.'));
                        return;
                    }

                    const userSession: User = {
                        email: foundUser.email,
                        token: 'mock-token-' + Date.now(),
                        role: foundUser.role || 'user', // Default to user if undefined
                        name: foundUser.name
                    };
                    setUser(userSession);
                    resolve(userSession);
                } else {
                    reject(new Error('Credenciales inválidas'));
                }
            }, 500); // Simulate network delay
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
