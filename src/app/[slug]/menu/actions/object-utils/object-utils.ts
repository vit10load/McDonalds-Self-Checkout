import { Product } from "@prisma/client";

function getObjectProductsWithPrices(products: Array<{ id: string, quantity: number }>, productsWithPrices: Product[]) {
    return products.map(product => {
        return {
            productId: product.id,
            quantity: product.quantity,
            price: productsWithPrices.find(p => p.id === product.id)?.price
        };
    });
}

export { getObjectProductsWithPrices };