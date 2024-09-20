import { forwardRef } from 'react';
import { PlusIcon, MinusIcon } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/utils/classname';

// Customized AccordionTrigger
const CustomAccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline',
        className
      )}
      {...props}
    >
      {children}
      {/* Custom Icon logic */}
      <span className="ml-2">
        {/* Show PlusIcon when closed */}
        <span className="[&[data-state=open]]:hidden">
          <PlusIcon className="h-4 w-4" />
        </span>
        {/* Show MinusIcon when open */}
        <span className="[&[data-state=closed]]:hidden">
          <MinusIcon className="h-4 w-4" />
        </span>
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = 'CustomAccordionTrigger';

export { CustomAccordionTrigger };
