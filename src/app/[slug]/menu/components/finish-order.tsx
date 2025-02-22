'use client';

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useForm } from "react-hook-form";

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";


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

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            cpf: '',
        },
        shouldUnregister: true
    });

    const onSubmit = (data: FormSchema) => {
        console.log(data);
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
                                <Button type="submit" variant="destructive" className="rounded-full w-full">Finalizar</Button>
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