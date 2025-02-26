'use client';

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import { ConsumptionMethod } from "@prisma/client";
import Error from "next/error";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useContext, useTransition } from "react";
import { PatternFormat } from "react-number-format";
import { z } from 'zod';
import { createOrder } from "../actions/create-order";
import { CartContext } from "../context/cart";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";


const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "O nome é obrigatório",
    }),
    cpf: z.string().trim().min(1, {
        message: "Cpf inválido"
    }),
});

type FormSchema = z.infer<typeof formSchema>

interface FinishOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const FinishOrderComponent = ({ open, onOpenChange }: FinishOrderDialogProps) => {

    const { slug } = useParams();

    const { products } = useContext(CartContext);

    const searchParams = useSearchParams();

    const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod;

    const [isPending, startTransition] = useTransition();

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            cpf: '',
        },
        shouldUnregister: true
    });

    const onSubmit = async (data: FormSchema) => {

        try {

            startTransition(async () => {
                await createOrder({
                    consumptionMethod,
                    customerCpf: data.cpf,
                    customerName: data.name,
                    products,
                    slug
                });

                onOpenChange(false);

                toast.success('Pedido finalizado com sucesso.');

                redirect(`orders?consumptionMethod=${consumptionMethod}`);

            });


        } catch (error) {
            throw new Error({
                title: 'Nao pode criar um pedido',
                statusCode: 500
            });
        }
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>FInalizar pedido</DrawerTitle>
                    <DrawerDescription>Insira suas informações abaixo para finalizar pedido</DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="digite seu nome..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CPF</FormLabel>
                                        <FormControl>
                                            <PatternFormat
                                                placeholder="digite seu cpF..."
                                                format="###.###.###-##"
                                                {...field}
                                                customInput={Input}>
                                            </PatternFormat>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DrawerFooter>
                                <Button disabled={isPending} type="submit" variant="destructive" className="rounded-full w-full">
                                    {isPending && <Loader2Icon className="animate-spin"></Loader2Icon>}
                                    Finalizar
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="rounded-full w-full">Cancelar</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default FinishOrderComponent;