import { useMutation, useQuery } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

// Este Hook se va a encargar a todo lo relacionado a un solo producto
export const useProduct = (id: string) => {

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            console.log('Todo salión bien', product);
            // TODO: 
            // Invalidar caché
            // Actualizar queryData
        }
    })

    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log(productLike);
    // }

    return {
        ...query,
        mutation
    }
}
