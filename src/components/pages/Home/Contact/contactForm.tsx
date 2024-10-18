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
// import { PhoneInput } from './phoneInput';
import PhoneInput from 'react-phone-input-2';
import './contact.css';
import 'react-phone-input-2/lib/material.css';
import axios from 'axios';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import SuccessIcon from '../../../../../public/success_contact_sent.svg';

export function ContactForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('HomePage.contact_form');
  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: t('form.error.name.required') })
      .regex(/^[a-zA-Z\s]+$/, { message: t('form.error.name.invalid') }),
    email: z
      .string()
      .min(1, { message: t('form.error.email.required') })
      .email({ message: t('form.error.email.invalid') }),
    phone: z.string(),
    company: z.string().min(1, { message: t('form.error.company.required') }),
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

  function handleSubmit(data: z.infer<typeof formSchema>) {
    axios
      .post('/api/contact', data)
      .then((response) => {
        if (response.status === 200) {
          // Email sent successfully
          setSuccessDialogOpen(true);
          setIsOpen(false);
          form.reset();
          // console.log('Email sent:', response.data);
          // Optionally show a success toast or message
        } else {
          // console.error('Error sending email:', response.statusText);
          // Optionally show an error toast or message
          toast({ title: 'Error', description: response.statusText || 'Error sending email' });
        }
      })
      .catch((error) => {
        // console.error('Error submitting form:', error);
        // Optionally show an error toast or message
        const errorMessage = error.response?.data?.message || error.message || 'Error sending email'
        toast({ title: 'Error', description: errorMessage });
      });
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <ScrollArea className="overflow-y-auto"> */}
        <DialogContent
          className={`${montserrat.className} md:no-scrollbar max-h-screen w-full gap-10 overflow-y-scroll p-10 px-6 text-[#2C2C2C] lg:max-w-[44%]`}
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
                          searchNotFound={t('form.error.country_not_found')}
                          enableSearch
                          buttonClass="p-2"
                          inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true,
                            placeholder: t('form.phone.placeholder'),
                            className: 'w-full',
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
      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className={`${montserrat.className} max-w-md text-center`}>
          <DialogHeader>
            <DialogTitle className="text-center text-[2rem] font-bold text-[#2C2C2C]">
              {t('form.success.header')}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t('form.success.content')}
            </DialogDescription>
          </DialogHeader>
          <div>
            <SuccessIcon className="mx-auto h-32 w-32 md:h-48 md:w-48" />
          </div>
          <ButtonPrimary
            onClick={() => setSuccessDialogOpen(false)}
            className="focus-visible:outline-none focus-visible:ring-0"
          >
            {t('form.success.button')}
          </ButtonPrimary>
        </DialogContent>
      </Dialog>
    </>
  );
}
