'use client';

import { Button } from "@/components/ui/button";
import { ConsumptionMethod, Restaurant } from "@prisma/client";
import { ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const OrdersComponent = ({ slug, restaurant }) => {

    const searchParams = useSearchParams();

    const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod;


    if (!restaurant) {
        return notFound();
    }

    return (
        <div className="flex flex-col justify-between gap-3">
            <div className=" flex items-center relative h-[27px] pb-20 pt-20 gap-2 left-4 overflow-hidden">
                <ScrollTextIcon size={25} height={25}></ScrollTextIcon>
                <h1 className="font-semibold text-2xl">Meus Pedidos</h1>
            </div>

            {/* primeira div */}

            <div className="max-h-[700px] overflow-y-auto">

                <div className="w-[95%] h-[200px] mb-10 border-[3px] rounded p-5 ml-3">
                    <div className="flex flex-col w-full h-full">
                        <span className="text-sm text-[#FFB100] font-semibold pl-5">Em preparo</span>
                        <div className="flex p-3">
                            <Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={30} height={30}></Image>
                            <span className="text-xl bg px-2 py-1 rounded font-semibold">{restaurant.name}</span>
                        </div>
                        <div className="flex p-3 gap-2 items-center">
                            <span className="flex items-center justify-center rounded-full min-w-[28px] h-7 bg-[#7E8392] text-white p-2">1</span>
                            <span>MacOferta Média Big Mac Duplo</span>
                        </div>
                        <div className="flex items-center justify-between p-4 gap-2 w-full h-[26px]">
                            <span className="font-semibold">R$39,90</span>
                            <Button variant="outline" className="w-[140px] h-[28px] text-[#EA1D2C]">Adicionar à sacola</Button>
                        </div>
                    </div>
                </div>

                {/* segunda div */}

                <div className="w-[95%] h-[200px] mb-10 border-[3px] rounded p-5 ml-3">
                    <div className="flex flex-col w-full h-full">
                        <span className="text-sm text-white font-semibold pl-2 rounded-xl bg-[#5DC05B] w-[88px] h-[24px] ml-3">Finalizado</span>
                        <div className="flex p-3">
                            <Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={30} height={30}></Image>
                            <span className="text-xl bg px-2 py-1 rounded font-semibold">{restaurant.name}</span>
                        </div>
                        <div className="flex p-3 gap-2 items-center">
                            <span className="flex items-center justify-center rounded-full min-w-[28px] h-7 bg-[#7E8392] text-white p-2">13</span>
                            <span>MacOferta Média Big Mac Duplo</span>
                        </div>
                        <div className="flex items-center justify-between p-3 gap-2 w-full h-[26px]">
                            <span className="font-semibold">R$39,90</span>
                            <Button variant="destructive" className="w-[140px] h-[28px] text-white">Adicionar à sacola</Button>
                        </div>
                    </div>
                </div>

                <div className="w-[95%] h-[200px] mb-10 border-[3px] rounded p-5 ml-3">
                    <div className="flex flex-col w-full h-full">
                        <span className="text-sm text-[#FFB100] font-semibold pl-5">Em preparo</span>
                        <div className="flex p-3">
                            <Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={30} height={30}></Image>
                            <span className="text-xl bg px-2 py-1 rounded font-semibold">{restaurant.name}</span>
                        </div>
                        <div className="flex p-3 gap-2 items-center">
                            <span className="flex items-center justify-center rounded-full min-w-[28px] h-7 bg-[#7E8392] text-white p-2">1</span>
                            <span>MacOferta Média Big Mac Duplo</span>
                        </div>
                        <div className="flex items-center justify-between p-4 gap-2 w-full h-[26px]">
                            <span className="font-semibold">R$39,90</span>
                            <Button variant="outline" className="w-[140px] h-[28px] text-[#EA1D2C]">Adicionar à sacola</Button>
                        </div>
                    </div>
                </div>

                <div className="w-[95%] h-[200px] mb-10 border-[3px] rounded p-5 ml-3">
                    <div className="flex flex-col w-full h-full">
                        <span className="text-sm text-white font-semibold pl-2 rounded-xl bg-[#5DC05B] w-[88px] h-[24px] ml-3">Finalizado</span>
                        <div className="flex p-3">
                            <Image src={restaurant?.avatarImageUrl} alt={restaurant?.name} width={30} height={30}></Image>
                            <span className="text-xl bg px-2 py-1 rounded font-semibold">{restaurant.name}</span>
                        </div>
                        <div className="flex p-3 gap-2 items-center">
                            <span className="flex items-center justify-center rounded-full min-w-[28px] h-7 bg-[#7E8392] text-white p-2">13</span>
                            <span>MacOferta Média Big Mac Duplo</span>
                        </div>
                        <div className="flex items-center justify-between p-3 gap-2 w-full h-[26px]">
                            <span className="font-semibold">R$39,90</span>
                            <Button variant="destructive" className="w-[140px] h-[28px] text-white">Adicionar à sacola</Button>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
}

export default OrdersComponent;