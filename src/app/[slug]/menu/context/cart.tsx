'use client';

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, 'name' | 'price' | 'id' | 'imageUrl'> {
    quantity: number;
}

export interface IcartContext {
    isOpen: boolean;
    products: CartProduct[];
    total: number;
    toggleCart: () => void;
    addProducts: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<IcartContext>({
    isOpen: false,
    products: [],
    total: 0,
    toggleCart: () => { },
    addProducts: () => { },
    decreaseProductQuantity: () => { },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<CartProduct[]>([]);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }

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

    return (
        <CartContext.Provider value={{
            isOpen: isOpen,
            products: products,
            total: 0,
            toggleCart: toggleCart,
            addProducts: addProducts,
            decreaseProductQuantity: decreaseProductQuantity
        }}>
            {children}
        </CartContext.Provider>
    )
}