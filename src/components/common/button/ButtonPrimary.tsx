import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/classname';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonPrimary = forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <Button
      className={cn(
        'rounded-lg bg-gradient-to-t from-brand-500 to-brand-300 hover:opacity-90',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
ButtonPrimary.displayName = 'Button';

export default ButtonPrimary;
