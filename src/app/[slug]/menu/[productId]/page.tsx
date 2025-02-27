import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHeaderComponent from "./components/product-header";
import ProductDetailsComponent from "./components/product-details";
import { findProductById } from "../actions/respository-client";

interface ProductPageProps {
    params: Promise<{ slug: string, productId: string }>;
}

const PorductComponent = async ({ params }: ProductPageProps) => {

    const { slug, productId } = await params;

    const product = await findProductById(productId);

    if (!product) {
        return notFound();
    }

    if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
        return notFound();
    }

    return (
        <div className="flex h-full flex-col">
            <ProductHeaderComponent product={product}></ProductHeaderComponent>
            <ProductDetailsComponent product={product}></ProductDetailsComponent>
        </div>

    );
}

export default PorductComponent;