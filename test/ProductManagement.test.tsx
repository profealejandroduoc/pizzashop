import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductManagement } from '../src/pages/admin/ProductManagement';
import { getMenu, savePizza, deletePizza } from '../src/services/pizzaService';

vi.mock('../src/services/pizzaService', () => ({
    getMenu: vi.fn(),
    savePizza: vi.fn(),
    deletePizza: vi.fn()
}));

const samplePizzas = [
    {
        id: 'margarita',
        name: 'Margarita',
        description: 'Clásica con tomate y queso',
        price: 8500,
        image: '/img/pizza_margarita.png',
        rating: 4.8
    },
    {
        id: 'pepperoni',
        name: 'Pepperoni',
        description: 'Extra pepperoni',
        price: 10500,
        image: '/img/pizza_pepperoni.png',
        rating: 4.6
    }
];

describe('ProductManagement - formulario de registro de productos', () => {
    const getControlByLabelText = (root: HTMLElement, labelText: string) => {
        const label = within(root).getByText(labelText);
        const container = label.closest('div');
        const control = container?.querySelector('input, textarea');
        if (!control) {
            throw new Error(`No se encontró control para la etiqueta: ${labelText}`);
        }
        return control as HTMLInputElement | HTMLTextAreaElement;
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(getMenu).mockResolvedValue(samplePizzas);
    });

    it('renderiza la tabla de productos y sus componentes principales', async () => {
        render(<ProductManagement />);

        expect(await screen.findByText('Margarita')).toBeInTheDocument();
        expect(screen.getByText('Pepperoni')).toBeInTheDocument();

        expect(screen.getByRole('columnheader', { name: 'Producto' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Precio' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Rating' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Acciones' })).toBeInTheDocument();
    });

    it('expone validaciones requeridas en el formulario', async () => {
        render(<ProductManagement />);

        const openButton = await screen.findByRole('button', { name: /nuevo producto/i });
        await userEvent.click(openButton);
        const dialog = await screen.findByRole('dialog');

        expect(getControlByLabelText(dialog, 'Nombre')).toBeRequired();
        expect(getControlByLabelText(dialog, 'Precio')).toBeRequired();
        expect(getControlByLabelText(dialog, 'Descripción')).toBeRequired();
        expect(getControlByLabelText(dialog, 'URL Imagen')).not.toBeRequired();
    });

    it('guarda un producto nuevo usando imagen por defecto si no se especifica', async () => {
        vi.mocked(getMenu).mockResolvedValueOnce(samplePizzas).mockResolvedValueOnce(samplePizzas);
        render(<ProductManagement />);

        const openButton = await screen.findByRole('button', { name: /nuevo producto/i });
        await userEvent.click(openButton);
        const dialog = await screen.findByRole('dialog');

        await userEvent.type(getControlByLabelText(dialog, 'Nombre'), 'Veggie');
        await userEvent.clear(getControlByLabelText(dialog, 'Precio'));
        await userEvent.type(getControlByLabelText(dialog, 'Precio'), '12000');
        await userEvent.type(getControlByLabelText(dialog, 'Descripción'), 'Vegetales frescos');

        await userEvent.click(screen.getByRole('button', { name: /guardar/i }));

        await waitFor(() => {
            expect(savePizza).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: 'Veggie',
                    description: 'Vegetales frescos',
                    price: 12000,
                    image: '/img/pizza_pepperoni.png'
                })
            );
        });
    });

    it('coincide con el snapshot del estado actual', async () => {
        const { container } = render(<ProductManagement />);

        await screen.findByText('Margarita');
        expect(container).toMatchSnapshot();
    });
});
