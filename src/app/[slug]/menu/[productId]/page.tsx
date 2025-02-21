import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHeaderComponent from "./components/product-header";
import ProductDetailsComponent from "./components/product-details";

interface ProductPageProps {
    params: { slug: string, productId: string };
}

const PorductComponent = async ({ params }: ProductPageProps) => {

    const { slug, productId } = params;

    const product = await db.product.findUnique({
        where: { id: productId },
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                    slug: true
                }
            }
        }
    });

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