'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../context/cart";
import CartItemsComponent from "./cart-items-component";


const CartSheetComponent = () => {

    const { isOpen, toggleCart, products } = useContext(CartContext);

    return (

        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[80%]">
                <SheetHeader>
                    <SheetTitle>Sacola</SheetTitle>
                </SheetHeader>
                <div className="py-5">
                    {products.map(product =>
                        <CartItemsComponent key={product.id} product={product}></CartItemsComponent>
                    )}
                </div>
            </SheetContent>
        </Sheet>

    );
}

export default CartSheetComponent;