import CartProduct from "./cart-product";

interface IcartContext {
    isOpen: boolean;
    products: CartProduct[];
    totalPedido: number;
    toggleCart: () => void;
    addProducts: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProduct: (productId: string) => void;
};

export default IcartContext;