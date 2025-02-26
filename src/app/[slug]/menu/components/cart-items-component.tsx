'use client';

import Image from "next/image";
import { CartContext, CartProduct } from "../context/cart";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
    product: CartProduct;
}

const CartItemsComponent = ({ product }: CartProduct) => {

    const { decreaseProductQuantity, increaseProductQuantity, removeProduct } = useContext(CartContext);

    return (
        <div className="flex items-center justify-between">

            <div className="flex items-center gap-4 justify-between">
                <div className="relative h-20 w-20 rounded-xl bg-gray-100 my-2">
                    <Image src={product.imageUrl} alt={product.name} fill />
                </div>

                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">
                        {Intl.NumberFormat("pr-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(product.price)}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="h-7 w-7 rounded-lg" onClick={() => decreaseProductQuantity(product.id)}>
                            <ChevronLeftIcon size={16} />
                        </Button>
                        <p className="w-8 text-xs text-center">{product.quantity}</p>
                        <Button variant="destructive" className="h-7 w-7 rounded-lg" onClick={() => increaseProductQuantity(product.id)}>
                            <ChevronRightIcon size={16} />
                        </Button>
                    </div>
                </div>

                <Button className="absolute float-right right-10" size="icon" variant="outline" onClick={() => removeProduct(product.id)}>
                    <TrashIcon></TrashIcon>
                </Button>

            </div>

        </div>
    );
}

export default CartItemsComponent;