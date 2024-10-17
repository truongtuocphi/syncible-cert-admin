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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { useState } from 'react';
// import { PhoneInput } from './phoneInput';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from '@/components/ui/use-toast';
import './contact.css';
import 'react-phone-input-2/lib/material.css';

export function ContactForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {

  const t = useTranslations('HomePage.contact_form');
  const formSchema = z.object({
    name: z
      .string()
      .min(1, {message: t('form.error.name.required')})
      .regex(/^[a-zA-Z\s]+$/, { message: t('form.error.name.invalid') }),
    email: z.string().min(1, {message: t('form.error.email.required')}).email({message: t('form.error.email.invalid')}),
    phone: z.string(),
    company: z.string().min(1, {message: t('form.error.company.required')}),
    message: z.string(),
  });

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
    console.log(data);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <ScrollArea className="overflow-y-auto"> */}
      <DialogContent
        className={`${montserrat.className} md:no-scrollbar max-h-screen w-full gap-10 overflow-y-scroll p-10 px-6 text-[#2C2C2C] md:max-w-[44%]`}
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
                    {/* <PhoneInput
                      placeholder={t('form.phone.placeholder')}
                      {...field}
                      defaultCountry='VN'
                      /> */}
                    <div className="relative rounded-[1.25rem] border border-[#A2A3A9]">
                      <PhoneInput
                        country={'vn'}
                        regions={['america', 'europe', 'asia', 'oceania', 'africa']}
                        containerClass="flex antialiased flex-row-reverse gap-2 placeholder:text-[#A2A3A9] p-4"
                        specialLabel=""
                        enableSearch
                        searchClass="antialiased"
                        buttonClass="p-2"
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true,
                          placeholder: t('form.phone.placeholder'),
                          className: 'w-full antialiased',
                        }}
                        {...field}
                      />
                    </div>
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
      {/* </ScrollArea> */}
    </Dialog>
  );
}
