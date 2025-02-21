'use client';

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Product {
    quantity: number;
}

export interface IcartContext {
    isOpen: boolean;
    products: CartProduct[];
    total: number;
    toggleCart: () => void;
}

export const CartContext = createContext<IcartContext>({
    isOpen: false,
    products: [],
    total: 0,
    toggleCart: () => { },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products] = useState<CartProduct[]>([]);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <CartContext.Provider value={{
            isOpen: isOpen,
            products: products,
            total: 0,
            toggleCart: toggleCart
        }}>
            {children}
        </CartContext.Provider>
    )
}