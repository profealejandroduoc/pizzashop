import axios from 'axios';

export interface Pizza {
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    badge?: { text: string; color: string };
}

export const getMenu = async (): Promise<Pizza[]> => {
    try {
        const response = await axios.get('/data/pizzas.json');
        return response.data;
    } catch (error) {
        console.error("Error fetching menu:", error);
        throw error;
    }
};
