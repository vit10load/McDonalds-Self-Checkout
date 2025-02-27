'use server';

import { db } from "@/lib/prisma";
import { ConsumptionMethod, Order } from "@prisma/client";
import { getObjectProductsWithPrices } from "./object-utils/object-utils";
import CreateOrderInput from "./interfaces/create-order-input";


async function findProductById(productId: string) {
    return await db.product.findUnique({
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
}

async function findRestaurantBySlug(slug: string) {
    return await db.restaurant.findUnique({
        where: { slug },
        include: {
            menuCategorys: {
                include: {
                    products: true
                }
            }
        }
    });
}

async function findManyProductsWithPrices(products: Array<{ id: string, quantity: number }>) {
    return await db.product.findMany({
        where: {
            id: {
                in: products.map(product => product.id)
            }
        }
    });
}

async function createOrder(input: CreateOrderInput) {

    const restaurant = await findRestaurantBySlug(input.slug);

    const productsWithPrices = await findManyProductsWithPrices(input.products);

    const productObjects = getObjectProductsWithPrices(input.products, productsWithPrices);

    const order = {
        status: 'PENDING',
        customerName: input.customerName,
        customerCpf: input.customerCpf.replace(/\D/g, ""),
        orderProducts: {
            createMany: {
                data: productObjects
            }
        },
        total: productObjects.reduce((acc, product) => acc + product.price * product.quantity, 0),
        consumptionMethod: input.consumptionMethod,
        restaurantId: restaurant.id
    };

    return await db.order.create({
        data: order
    });
}

export { findProductById, findRestaurantBySlug, findManyProductsWithPrices, createOrder }