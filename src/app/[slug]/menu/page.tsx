import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
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

    const restaurant = await db.restaurant.findUnique({ where: { slug } });

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

            {/* Card do Restaurante */}
            <div className="relative z-10 bg-white shadow-lg rounded-xl p-4 mx-2 -mt-5">
                <div className="flex items-center space-x-3">
                    {/* Logo */}
                    <div className="flex items-center justify-center">
                        <Image
                            src={restaurant.avatarImageUrl}
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </div>
                    {/* Informações */}
                    <div>
                        <h2 className="text-lg font-bold">FSW Donald’s</h2>
                        <p className="text-sm text-gray-500">Fast Food</p>
                        <span className="text-green-500 text-sm font-medium">Aberto</span>
                    </div>
                </div>

                {/* Botões de categorias */}
                <div className="mt-4 flex space-x-3 overflow-x-auto">
                    <button className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Lançamentos
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">
                        Lanches
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">
                        Fritas
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">
                        Bebidas
                    </button>
                </div>
            </div>

            {/* Lista de Produtos */}
            <div className="flex-1 mt-6 px-4 min-h-[300px] max-h-[calc(100vh-400px)] overflow-y-auto">
                <h3 className="text-lg font-bold mb-3">Lançamentos</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex-1">
                            <h4 className="font-medium">McOferta Média Big Mac Duplo</h4>
                            <p className="text-sm text-gray-500">
                                Quatro hambúrgueres (100% carne bovina), alface americana...
                            </p>
                            <span className="block font-bold mt-2">R$ 39,90</span>
                        </div>
                        <img
                            src="/burger.png"
                            alt="Big Mac Duplo"
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex-1">
                            <h4 className="font-medium">McOferta Média Big Mac Duplo</h4>
                            <p className="text-sm text-gray-500">
                                Quatro hambúrgueres (100% carne bovina), alface americana...
                            </p>
                            <span className="block font-bold mt-2">R$ 39,90</span>
                        </div>
                        <img
                            src="/burger.png"
                            alt="Big Mac Duplo"
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex-1">
                            <h4 className="font-medium">McOferta Média Big Mac Duplo</h4>
                            <p className="text-sm text-gray-500">
                                Quatro hambúrgueres (100% carne bovina), alface americana...
                            </p>
                            <span className="block font-bold mt-2">R$ 39,90</span>
                        </div>
                        <img
                            src="/burger.png"
                            alt="Big Mac Duplo"
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                    </div>
                </div>


                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex-1">
                            <h4 className="font-medium">McOferta Média Big Mac Duplo</h4>
                            <p className="text-sm text-gray-500">
                                Quatro hambúrgueres (100% carne bovina), alface americana...
                            </p>
                            <span className="block font-bold mt-2">R$ 39,90</span>
                        </div>
                        <img
                            src="/burger.png"
                            alt="Big Mac Duplo"
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                    </div>
                </div>


            </div>
        </div>
    );

}

export default RestaurantMenuPage;