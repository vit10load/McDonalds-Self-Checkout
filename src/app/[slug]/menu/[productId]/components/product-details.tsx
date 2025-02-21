'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import CartSheetComponent from "../../components/cart-sheet";
import { CartContext } from "../../context/cart";
import { log } from "console";

interface ProductDetailsComponentProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true;
                    avatarImageUrl: true
                }
            }
        }
    }>
}

const ProductDetailsComponent = ({ product }: ProductDetailsComponentProps) => {

    const { toggleCart, addProducts } = useContext(CartContext);

    const [quantity, setQuantity] = useState<number>(1);

    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
            if (prev === 1) {
                return 1
            }
            return prev - 1
        });
    }

    const handleAddQuantity = () => {
        setQuantity((prev) => prev + 1);
    }

    const handleAddToCart = () => {
        console.log('dsfdfdf');

        addProducts({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: quantity
        });

        toggleCart();
    }

    return (

        <>
            <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex flex-auto flex-col overflow-hidden">

                <div className="flex-auto overflow-hidden">
                    {/* restaurant */}
                    <div className="flex items-center gap-1.5 px-5">
                        <Image
                            src={product.restaurant.avatarImageUrl}
                            alt={product.restaurant.name}
                            width={16}
                            height={16}
                            className="rounded-full"
                        />
                        <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
                    </div>

                    <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

                    {/* preço e quantidade */}
                    <div className="flex items-center justify-between mt-3">

                        <h3 className="text-xl font-semibold">
                            {Intl.NumberFormat("pr-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(product.price)}
                        </h3>

                        <div className="flex items-center gap-3 text-center">
                            <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={() => handleDecreaseQuantity()}>
                                <ChevronLeftIcon></ChevronLeftIcon>
                            </Button>
                            <p className="w-4">{quantity}</p>
                            <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={() => handleAddQuantity()}>
                                <ChevronRightIcon></ChevronRightIcon>
                            </Button>
                        </div>

                    </div>

                    <ScrollArea className="h-full">
                        {/* SOBRE */}
                        <div className="mt-6 space-y-3">
                            <h4 className="font-semibold">Sobre</h4>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>

                        {/* INGREDIENTES */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-1.5">
                                <ChefHatIcon size={18}></ChefHatIcon>
                                <h4 className="font-semibold">Ingredientes</h4>
                            </div>
                            <ul className="text-muted-foreground list-disc px-5 text-sm">
                                {product.ingredients.map(ingredient =>
                                    <li key={ingredient}>{ingredient}</li>
                                )}
                            </ul>
                        </div>

                    </ScrollArea>


                </div>

                <Button onClick={handleAddToCart} className="w-full rounded-full mt-6">Adicionar à sacola</Button>

            </div>

            <CartSheetComponent />

        </>
    );
}

export default ProductDetailsComponent;