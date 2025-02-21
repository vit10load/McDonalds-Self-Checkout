'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../context/cart";


const CartSheetComponent = () => {

    const { isOpen, toggleCart, products } = useContext(CartContext);

    return (

        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                {products.map(product =>
                    <h2>{product.name}</h2>
                )}
            </SheetContent>
        </Sheet>

    );
}

export default CartSheetComponent;