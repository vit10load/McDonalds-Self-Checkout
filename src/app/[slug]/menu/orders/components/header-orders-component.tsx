'use client';

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, ScrollTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderOrdersComponent = () => {

    const router = useRouter();

    return (
        <div className="relative w-full h-[64px] overflow-hidden">
            <Button onClick={() => router.back()} variant="secondary" className="absolute pt-1 left-2 top-3" size="icon">
                <ChevronLeftIcon></ChevronLeftIcon>
            </Button>
            <Button variant="secondary" className="absolute pt-1 right-2 top-3" size="icon">
                <ScrollTextIcon></ScrollTextIcon>
            </Button>
        </div>
    );
}

export default HeaderOrdersComponent;