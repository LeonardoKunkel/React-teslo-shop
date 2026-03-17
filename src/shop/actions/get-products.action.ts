import { tesloApi } from "@/api/tesloApi"
import type { ProductsResponse } from "@/interfaces/products.response";

interface Options {
    limit: number | string | undefined;
    offset: number | string | undefined;
    sizes: string | undefined;
    gender: string | undefined;
}

export const getProductsAction = async (options: Options): Promise<ProductsResponse> => {

    const { limit, offset, gender, sizes } = options;

    const { data } = await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit,
            offset,
            gender,
            sizes
        }
    });

    const productsWithImagesUrl = data.products.map(product => ({
        ...product,
        images: product.images.map(
            image => `${import.meta.env.VITE_API_URL}/files/product/${image}`
        )
    }))


    return {
        ...data,
        products: productsWithImagesUrl
    }
}
