import { db } from "@/lib/prisma";
import HeaderOrdersComponent from "./components/header-orders-component";
import OrdersComponent from "./components/orders-component";


interface OrdersProps {
    slug: Promise<{ slug: string }>;
}


const OrdersPage = async ({ params }: OrdersProps) => {

    const { slug } = await params;

    const restaurant = await db.restaurant.findUnique({
        where: {
            slug: slug
        }
    });

    return (
        <>
            <HeaderOrdersComponent></HeaderOrdersComponent>
            <OrdersComponent slug={slug} restaurant={restaurant}></OrdersComponent>
        </>
    );
}

export default OrdersPage;