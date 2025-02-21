'use client';

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
    product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeaderComponent = ({ product }: ProductHeaderProps) => {

    const router = useRouter();

    return (
        <div className="relative min-h-[300px] w-full">
            <Button size="icon"
                onClick={() => router.back()}
                className="absolute left-4 top-4 z-50 rounded-full"
                variant="secondary">

                <ChevronLeftIcon />
            </Button>

            <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain" />

            <Button
                variant="secondary"
                size="icon"
                className="absolute right-5 top-6 z-50 rounded-full"
            >
                <ScrollTextIcon />
            </Button>

        </div>
    );
}

export default ProductHeaderComponent;