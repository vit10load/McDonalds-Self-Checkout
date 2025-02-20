import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ComsumptionMethodOption from "./components/comsumption-method-option";

interface RestaurantPageProps {
    params: Promise<{slug:  string}>
}

const RestaurantPage = async ({ params } : RestaurantPageProps) => {

    const { slug } = await params;

    const restaurant = await db.restaurant.findUnique({where: { slug }});

    if(!restaurant){
        return notFound();
    }

    return (  

        <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={82} height={82} />
                <h2 className="font-semibold">{restaurant.name}</h2>
            </div>
            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold">
                    Seja bem-vindo
                </h3>
                <p className="opacity-55">
                    Escolha como prefere aproveitar sua refeição. Estamos oferecer praticidade e sabor em cada detalhe!
                </p>
            </div>
            <div className="pt-14 grid grid-cols-2 gap-4">
               <ComsumptionMethodOption
                    slug={slug}
                    option="DINE_IN" 
                    imageUrl="/dine_in.png" 
                    imageAlt="Para comer aqui" 
                    buttonText="Para comer aqui">

                </ComsumptionMethodOption>
                <ComsumptionMethodOption
                    slug={slug}
                    option="TAKEAWAY" 
                    imageUrl="/takeaway.png" 
                    imageAlt="Para levar" 
                    buttonText="Para levar">
                    
                </ComsumptionMethodOption>
            </div>
        </div>
    );
}
 
export default RestaurantPage;