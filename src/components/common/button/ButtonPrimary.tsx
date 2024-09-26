import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/classname';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <Button
      className={cn(
        'rounded-2xl bg-primary-50 px-5 py-6 text-white hover:bg-primaryHover',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
ButtonPrimary.displayName = 'Button';

export default ButtonPrimary;
