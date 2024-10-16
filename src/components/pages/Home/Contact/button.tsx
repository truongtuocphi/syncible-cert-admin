import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { useState } from 'react';
import { ContactForm } from './contactForm';

export default function ContactButton({ label }: { label: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        className="w-full rounded-[1.25rem] bg-primary-50 px-10 py-7 font-bold shadow-combinedShadow1 hover:bg-primary-40"
        onClick={() => setIsOpen(true)}
      >
        <span>{label}</span>
      </Button>
      <ContactForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
