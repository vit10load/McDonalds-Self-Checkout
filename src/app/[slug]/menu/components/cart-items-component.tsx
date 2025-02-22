'use client';

import Image from "next/image";
import { CartProduct } from "../context/cart";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";

interface CartItemProps {
    product: CartProduct;
}

const CartItemsComponent = ({ product }: CartProduct) => {
    return (
        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 rounded-xl bg-gray-100">
                    <Image src={product.imageUrl} alt={product.name} fill />
                </div>

                <div className="space-y-1">
                    <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                    <p className="text-sm font-semibold">{product.price}</p>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" className="h-7 w-7 rounded-lg">
                            <ChevronLeftIcon size={16} />
                        </Button>
                        <p className="w-8 text-xs">{product.quantity}</p>
                        <Button variant="destructive" className="h-7 w-7 rounded-lg">
                            <ChevronRightIcon size={16} />
                        </Button>
                    </div>
                </div>

                <Button size="icon" variant="outline">
                    <TrashIcon></TrashIcon>
                </Button>

            </div>

        </div>
    );
}

export default CartItemsComponent;