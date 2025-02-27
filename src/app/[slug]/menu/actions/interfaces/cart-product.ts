import { Product } from "@prisma/client";

interface CartProduct extends Pick<Product, 'name' | 'price' | 'id' | 'imageUrl'> {
    quantity: number;
}

export default CartProduct;