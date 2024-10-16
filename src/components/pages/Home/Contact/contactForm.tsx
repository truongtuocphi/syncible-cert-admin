'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { montserrat } from '@/components/ui/fonts';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { useState } from 'react';
import { PhoneInput } from './phoneInput';
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z\s]+$/, { message: 'Name must contain only letters and spaces' }),
  email: z.string().min(1).email(),
  phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  company: z.string().min(1),
  message: z.string(),
});

export function ContactForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const t = useTranslations('HomePage.contact_form');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    },
  });
  const [value, setValue] = useState('');

  function handleSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={`${montserrat.className} gap-10 p-10 px-6 text-[#2C2C2C] sm:max-w-[44%]`}
      >
        <DialogHeader className="sm:text-center">
          <DialogTitle className="text-[2rem] font-bold">{t('header')}</DialogTitle>
          <DialogDescription className="text-lg font-medium text-[#A2A3A9]">
            {t('description')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t('form.name.label')}*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form.name.placeholder')}
                      {...field}
                      className="h-auto rounded-[1.25rem] border-[#A2A3A9] p-4 placeholder:text-[#A2A3A9] focus-visible:ring-1 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t('form.email.label')}*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form.email.placeholder')}
                      {...field}
                      className="h-auto rounded-[1.25rem] border-[#A2A3A9] p-4 placeholder:text-[#A2A3A9] focus-visible:ring-1 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t('form.phone.label')}*</FormLabel>
                  <FormControl>
                    {/* <Input
                      placeholder={t('form.phone.placeholder')}
                      {...field}
                      className="h-auto rounded-[1.25rem] border-[#A2A3A9] p-4 placeholder:text-[#A2A3A9] focus-visible:ring-1 focus-visible:ring-offset-0"
                    /> */}
                    <PhoneInput
                      placeholder={t('form.phone.placeholder')}
                      {...field}
                      defaultCountry='VN'
                      international
                      value={value}
                      onChange={setValue}
                      limitMaxLength={true}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t('form.company.label')}*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form.company.placeholder')}
                      {...field}
                      className="h-auto rounded-[1.25rem] border-[#A2A3A9] p-4 placeholder:text-[#A2A3A9] focus-visible:ring-1 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{t('form.message.label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('form.message.placeholder')}
                      {...field}
                      className="h-[10rem] rounded-[1.25rem] border-[#A2A3A9] p-4 placeholder:text-[#A2A3A9] focus-visible:ring-1 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonPrimary type="submit" className="w-full shadow-combinedShadow1">
              {t('form.submit_button.label')}
            </ButtonPrimary>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
