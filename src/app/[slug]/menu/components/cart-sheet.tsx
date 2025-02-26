'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import CartItemsComponent from "./cart-items-component";
import FinishOrderComponent from "./finish-order";


const CartSheetComponent = () => {

    const { isOpen, toggleCart, products, totalPedido } = useContext(CartContext);

    const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);

    return (

        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[90%]">
                <SheetHeader>
                    <SheetTitle>Sacola</SheetTitle>
                </SheetHeader>
                <div className="py-5 flex flex-col h-full">
                    <div className="flex-auto">
                        {products.map(product =>
                            <CartItemsComponent key={product.id} product={product}></CartItemsComponent>
                        )}
                    </div>
                    <Card className="mb-6">
                        <CardContent className="p-5">
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-sm font-semibold">
                                    {Intl.NumberFormat("pr-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    }).format(totalPedido)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Button className="w-full rounded-full" onClick={() => setFinishOrderDialogIsOpen(true)}>Finalizar Pedido</Button>
                    <FinishOrderComponent open={finishOrderDialogIsOpen} onOpenChange={setFinishOrderDialogIsOpen} />
                </div>
            </SheetContent>
        </Sheet>

    );
}

export default CartSheetComponent;