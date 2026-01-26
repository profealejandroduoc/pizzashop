import axios from 'axios';

export interface Pizza {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    badge?: { text: string; color: string };
    ingredients?: string[];
}

const STORAGE_KEY = 'pizzas_menu';

// Helper to get from storage
const getFromStorage = (): Pizza[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

// Helper to save to storage
const saveToStorage = (pizzas: Pizza[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pizzas));
};

export const getMenu = async (): Promise<Pizza[]> => {
    // Check if we have data in storage
    const storedPizzas = getFromStorage();

    if (storedPizzas.length > 0) {
        let normalized = false;
        const normalizedPizzas = storedPizzas.map(pizza => {
            if (pizza.image?.startsWith('/src/assets/img/')) {
                normalized = true;
                return { ...pizza, image: pizza.image.replace('/src/assets/img/', '/img/') };
            }
            return pizza;
        });
        if (normalized) {
            saveToStorage(normalizedPizzas);
        }
        return normalizedPizzas;
    }

    // If not, fetch from JSON and seed
    try {
        const response = await axios.get('/data/pizzas.json');
        // Add IDs if missing
        const pizzasWithIds = response.data.map((p: any) => ({
            ...p,
            id: p.id || p.name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substr(2, 5)
        }));

        saveToStorage(pizzasWithIds);
        return pizzasWithIds;
    } catch (error) {
        console.error("Error fetching menu:", error);
        return [];
    }
};

export const savePizza = async (pizza: Pizza): Promise<void> => {
    const pizzas = await getMenu();
    // If updating (same ID)
    const index = pizzas.findIndex(p => p.id === pizza.id);

    if (index !== -1) {
        pizzas[index] = pizza;
    } else {
        // Create new
        if (!pizza.id) {
            pizza.id = Date.now().toString();
        }
        pizzas.push(pizza);
    }
    saveToStorage(pizzas);
};

export const deletePizza = async (id: string): Promise<void> => {
    const pizzas = await getMenu();
    const filtered = pizzas.filter(p => p.id !== id);
    saveToStorage(filtered);
};

export const getPizzaById = async (id: string): Promise<Pizza | undefined> => {
    const pizzas = await getMenu();
    return pizzas.find(p => p.id === id);
};
