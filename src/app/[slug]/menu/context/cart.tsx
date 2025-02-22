'use client';

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, 'name' | 'price' | 'id' | 'imageUrl'> {
    quantity: number;
}

export interface IcartContext {
    isOpen: boolean;
    products: CartProduct[];
    totalPedido: number;
    toggleCart: () => void;
    addProducts: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProduct: (productId: string) => void;
}

export const CartContext = createContext<IcartContext>({
    isOpen: false,
    products: [],
    totalPedido: 0,
    toggleCart: () => { },
    addProducts: () => { },
    decreaseProductQuantity: () => { },
    increaseProductQuantity: () => { },
    removeProduct: () => { },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<CartProduct[]>([]);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }

    const totalPedido = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const addProducts = (product: CartProduct) => {

        const productAlreadyCart = products.some(prevProduct => prevProduct.id === product.id);

        if (!productAlreadyCart) {
            setProducts((prev) => [...prev, product]);
            return;
        }

        setProducts(prevProducts =>
            prevProducts.map(prevProduct =>
                prevProduct.id === product.id
                    ? { ...prevProduct, quantity: prevProduct.quantity + product.quantity }
                    : prevProduct
            )
        );
    }

    const decreaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {

                if (prevProducts.id !== productId || prevProducts.quantity === 1) {
                    return prevProducts;
                }

                return { ...prevProducts, quantity: prevProducts.quantity - 1 }

            })
        })
    }

    const increaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {

                if (prevProducts.id !== productId) {
                    return prevProducts;
                }

                return { ...prevProducts, quantity: prevProducts.quantity + 1 }

            })
        })
    }

    const removeProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(prevProducts => prevProducts.id !== productId));
    }

    return (
        <CartContext.Provider value={{
            isOpen: isOpen,
            products: products,
            totalPedido: totalPedido,
            toggleCart: toggleCart,
            addProducts: addProducts,
            decreaseProductQuantity: decreaseProductQuantity,
            increaseProductQuantity: increaseProductQuantity,
            removeProduct: removeProduct,
        }}>
            {children}
        </CartContext.Provider>
    )
}