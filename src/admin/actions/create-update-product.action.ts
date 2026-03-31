import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface"

export const createUpdateProductAction = async (
    productLike: Partial<Product>
): Promise<Product> => {

    const { id, user, images = [], ...dataToPost } = productLike;

    const isCreating = id === 'new';

    dataToPost.stock = Number(dataToPost.stock || 0);
    dataToPost.price = Number(dataToPost.price || 0);

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: dataToPost
    })

}
