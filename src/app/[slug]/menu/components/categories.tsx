'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProductsComponent from "./products";

interface RestaurantProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategorys: {
                include: { products: true };
            };
        };
    }>;
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
    include: { products: true }
}>;


const CategoriesComponent = ({ restaurant }: RestaurantProps) => {

    const [selectedCategory, setSelectedCategory] = useState<MenuCategoryWithProducts>(restaurant.menuCategorys[0])

    const handleCategoryClick = (category: MenuCategoryWithProducts) => {
        setSelectedCategory(category);
    }

    const getCategoryButtonVariant = (category: MenuCategoryWithProducts) => {
        return selectedCategory.id === category.id ? "default" : "secondary";
    }

    return (
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
            <div className="flex items-center gap-3 p-5">
                <Image
                    src={restaurant.avatarImageUrl}
                    alt={restaurant.name}
                    width={45}
                    height={45} />
                <div>
                    <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                    <p className="text-sx opacity-55">{restaurant.description}</p>
                </div>
            </div>

            <div className="ml-2 flex items-center gap-1 text-sx text-green-500 pb-2">
                <ClockIcon />
                <p>Aberto!</p>
            </div>

            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4 p-4 pt-0">
                    {restaurant.menuCategorys.map(category =>
                        <Button onClick={() => handleCategoryClick(category)} key={category.id}
                            variant={getCategoryButtonVariant(category)}
                            size="sm"
                            className="rounded-full">
                            <p>{category.name}</p>
                        </Button>
                    )}
                </div>
                <ScrollBar orientation="horizontal"></ScrollBar>
            </ScrollArea>

            <h3 className="px-5 font-semibold pt-8">{selectedCategory.name} </h3>
            <ProductsComponent products={selectedCategory.products}></ProductsComponent>

        </div>
    );
}

export default CategoriesComponent;