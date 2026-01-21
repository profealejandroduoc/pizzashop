
export interface User {
    id: string;
    rut: string; // Added RUT as per RegisterModal
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: 'admin' | 'user';
    esActivo: boolean; // boolean status
}

const STORAGE_KEY = 'users';

export const getUsers = (): User[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveUser = (user: User): void => {
    const users = getUsers();
    const index = users.findIndex(u => u.email === user.email);

    if (index !== -1) {
        users[index] = user;
    } else {
        users.push(user);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const deleteUser = (userId: string): void => {
    const users = getUsers();
    const filtered = users.filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const toggleUserStatus = (userId: string): void => {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
        user.esActivo = !user.esActivo;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
};

export const getUserStats = () => {
    const users = getUsers();
    return {
        total: users.length,
        active: users.filter(u => u.esActivo).length,
        admins: users.filter(u => u.role === 'admin').length
    };
};
