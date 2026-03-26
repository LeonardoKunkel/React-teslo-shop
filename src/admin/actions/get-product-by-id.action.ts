import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";

// Preguntamos por el Id -------------------v
export const getProductByIdAction = async (id: string): Promise<Product> => {

    if (!id) throw new Error('Id is required');

    // Si el Id es 'new', regresamos este objeto
    if (id === 'new') {
        return {
            id: 'new',
            title: '',
            price: 0,
            description: '',
            slug: '',
            stock: 0,
            sizes: [],
            gender: 'men',
            tags: [],
            images: []
        } as unknown as Product;
    }

    // Si el Id tiene algún valor lanzamos esta petición
    const { data } = await tesloApi.get<Product>(`/products/${id}`);

    const images = data.images.map(image => {

        if (images.includes('http')) return image;
        return `${import.meta.env.VITE_API_URL}/files/product/${image}`;

    });

    return {
        ...data,
        images: images
    }

}