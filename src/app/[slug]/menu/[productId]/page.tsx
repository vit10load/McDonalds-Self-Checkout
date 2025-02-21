import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHeaderComponent from "./components/product-header";

interface ProductPageProps {
    params: { slug: string, productId: string };
}

const PorductComponent = async ({ params }: ProductPageProps) => {

    const { slug, productId } = params;

    const product = await db.product.findUnique({
        where: { id: productId }
    });

    if (!product) {
        return notFound();
    }

    return (
        <ProductHeaderComponent product={product}></ProductHeaderComponent>
    );
}

export default PorductComponent;