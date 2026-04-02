import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface"
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (
    productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {

    await sleep(1500);

    const { id, user, images = [], files = [], ...dataToPost } = productLike;

    const isCreating = id === 'new';

    dataToPost.stock = Number(dataToPost.stock || 0);
    dataToPost.price = Number(dataToPost.price || 0);

    // Preparar imágenes
    if (files.length > 0) {
        const newImagesNames = await uploadFiles(files);
        images.push(...newImagesNames);
    }

    const imagesToSave = images.map(image => {
        if (image.includes('http')) return image.split('/').pop() || '';
        return image;
    })

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...dataToPost,
            images: imagesToSave
        }
    });

    return {
        ...data,
        images: data.images.map(image => {
            if (image.includes('http')) return image;
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`
        })
    }

}

export interface FileUploadResponse {
    secureUrl: string;
    fileName: string;
}


const uploadFiles = async (files: File[]) => {

    const uploadPromises = files.map(async file => {

        const formData = new FormData();
        formData.append('file', file);

        // await tesloApi.post
        const { data } = await tesloApi<FileUploadResponse>({
            url: '/files/product',
            method: 'POST',
            data: formData
        })

        return data.fileName;
    });


    const uploadedFileNames = await Promise.all(uploadPromises);
    return uploadedFileNames

}
