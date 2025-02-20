import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoriesComponent from "./components/categories";
import HeaderComponent from "./components/header-component";

interface MenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ comsumptionMethod: string }>
}

const isValidConsumptionMethod = (comsumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(comsumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({ params, searchParams }: MenuPageProps) => {

    const { slug } = await params;

    const restaurant = await db.restaurant.findUnique({
        where: { slug },
        include: {
            menuCategorys: {
                include: {
                    products: true
                }
            }
        }
    });

    const { comsumptionMethod } = await searchParams;

    if (!restaurant) {
        return notFound();
    }

    if (!isValidConsumptionMethod(comsumptionMethod)) {
        return notFound();
    }

    return (
        <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden">

            <HeaderComponent restaurant={restaurant} />

            <CategoriesComponent restaurant={restaurant}></CategoriesComponent>

        </div>
    );

}

export default RestaurantMenuPage;