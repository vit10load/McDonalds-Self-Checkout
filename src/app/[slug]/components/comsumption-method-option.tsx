import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ComsumptionMethodOptionProps {
    imageUrl: string;
    imageAlt: string;
    buttonText: string;
    option: ConsumptionMethod;
    slug: string
}

const ComsumptionMethodOption = (params: ComsumptionMethodOptionProps) => {
    return (
        <Card>
            <CardContent className="flex flex-col items-center gap-8 py-8">
                <div className="relative h-[80px] w-[80px]">
                    <Image src={params.imageUrl} fill alt={params.imageAlt} className="object-contain" />
                </div>
                <Button variant="secondary" className="rounded-full" asChild>
                    <Link href={`${params.slug}/menu?comsumptionMethod=${params.option}`}>{params.buttonText}</Link>
                </Button>
            </CardContent>
        </Card>
    );
}

export default ComsumptionMethodOption;