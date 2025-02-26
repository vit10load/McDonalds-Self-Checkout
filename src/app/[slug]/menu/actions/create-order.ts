'use server';

import { db } from "@/lib/prisma";
import { ConsumptionMethod } from "@prisma/client";

interface CreateOrderInput {
    customerName: string;
    customerCpf: string;
    products: Array<{
        id: string;
        quantity: number;
    }>;
    consumptionMethod: ConsumptionMethod;
    slug: string;
}



export const createOrder = async (input: CreateOrderInput) => {

    const restaurant = await db.restaurant.findUnique({
        where: {
            slug: input.slug
        }
    }); 

    const productsWithPrices = await db.product.findMany({
        where: {
            id: {
                in: input.products.map(product => product.id)
            }
        }
    });

    const productObjects = input.products.map(product => {
        return {
            productId: product.id,
            quantity: product.quantity,
            price: productsWithPrices.find(p => p.id === product.id)?.price
        };
    });


    await db.order.create({
        data: {
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
        }
    })
}