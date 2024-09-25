import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/classname';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <Button
      className={cn(
        'rounded-2xl border-2 border-primary-50 bg-primary-50 px-5 py-6 text-white hover:bg-white hover:text-primary-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
ButtonPrimary.displayName = 'Button';

export default ButtonPrimary;
