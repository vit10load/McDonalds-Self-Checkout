'use client';

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const HeaderComponent = ({ restaurant }: RestaurantHeaderProps) => {

    const router = useRouter();

    return (

        <div className="relative h-[250px] w-full max-w-full overflow-hidden">
            <Button
                variant="secondary"
                size="icon"
                onClick={() => router.back()}
                className="absolute left-5 top-6 z-50 rounded-full"
            >
                <ChevronLeftIcon />
            </Button>
            <Image
                src={restaurant?.coverImageUrl}
                alt={restaurant?.name}
                fill
                className="w-full h-full object-cover"
            />
            <Button
                variant="secondary"
                size="icon"
                className="absolute right-5 top-6 z-50 rounded-full"
            >
                <ScrollTextIcon />
            </Button>
        </div>
    );
}

export default HeaderComponent;