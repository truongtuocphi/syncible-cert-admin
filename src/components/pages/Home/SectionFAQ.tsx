import { CustomAccordionTrigger } from '@/components/common/miscellaneus/CustomAccordionTrggier';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';

export default function SectionFAQ() {
  const t = useTranslations('HomePage.faq_section');
  const keys = ['question_1', 'question_2', 'question_3', 'question_4', 'question_5'] as const;

  return (
    <div className="px-4 py-8 md:px-8 md:py-8 xl:px-16 xl:py-16 ">
      <div className="flex max-w-[49rem] flex-col items-center justify-center gap-8">
        <div className="text-[2rem] font-bold leading-[1.2]">{t('header')}</div>

        <Accordion type="single" collapsible className="w-f">
          <div className="flex flex-col gap-4">
            {keys.map((key) => (
              <AccordionItem
                key={key}
                value={key}
                className="flex flex-col gap-4 rounded-[1.25rem] border border-[#F0F0F0] bg-white/50 p-8"
              >
                <AccordionTrigger className="w-full py-0 text-left text-2xl font-bold hover:no-underline md:w-[678px] lg:w-[778px]">
                  {t(`${key}.header`)}
                </AccordionTrigger>

                <AccordionContent className="text-lg text-[#6C6D71]">
                  {t(`${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
}
