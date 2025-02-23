'use client';

import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ProductProps {
    products: Product[]
}

const ProductsComponent = ({ products }: ProductProps) => {

    const searchParams = useSearchParams();

    const consumptionMethod = searchParams.get("comsumptionMethod");

    return (
        <div className="space-y-3 px-5 py-5 overflow-y-scroll" style={{ height: '385px' }}>
            {products.map((product) =>

                <Link key={product.id} href={`menu/${product.id}?consumptionMethod=${consumptionMethod}`} className="flex items-center justify-between gap-10 py-3 border-b">
                    {/* Div da esquerda */}
                    <div>
                        <h3 className="text-sm font-medium">
                            {product.name}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {product.description}
                        </p>
                        <p className="pt-3 text-sm font-semibold">
                            {Intl.NumberFormat("pr-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(product.price)}
                        </p>
                    </div>

                    <div className="relative min-h-[82px] min-w-[120px]">

                        <Image src={product.imageUrl} alt={product.name} fill className="rounded-lg object-contain" />

                    </div>
                </Link>

            )}
        </div>
    );
}

export default ProductsComponent;