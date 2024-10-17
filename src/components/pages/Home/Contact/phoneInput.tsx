import { CheckIcon, ChevronDownIcon, User } from 'lucide-react';

import * as React from 'react';

import * as RPNInput from 'react-phone-number-input';

import flags from 'react-phone-number-input/flags';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input, InputProps } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/utils/classname';
import { ScrollArea } from '@/components/ui/scroll-area';

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value | string) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn(
        'flex items-center overflow-hidden rounded-[1.25rem] border border-[#A2A3A9]',
        className
      )}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={(value) => onChange?.(value ||'')}
      {...props}
    />
  );
});
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <>
      <div className="h-[20px] border-r border-r-[#CCCCCC]" />
      <Input
        className={cn('h-auto rounded-none border-none p-4 pl-2 focus-visible:ring-0', className)}
        {...props}
        ref={ref}
        placeholder='Phone number'
      />
    </>
  )
);
InputComponent.displayName = 'InputComponent';

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={'outline'}
          className={cn(
            'h-auto rounded-none border-none p-4 hover:bg-white focus-visible:bg-white focus-visible:ring-0'
          )}
          disabled={disabled}
        >
          <div className="flex w-fit items-center gap-1">
            <FlagComponent country={value} countryName={value} />
            <div className="h-5 w-5">
              <ChevronDownIcon
                className={cn(
                  '-mr-2 h-full w-full opacity-50',
                  disabled ? 'hidden' : 'opacity-100'
                )}
              />
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-full overflow-hidden rounded-[1.25rem] border-none p-0 shadow-combinedShadow2"
      >
        <Command>
          <CommandList className="w-full">
            <ScrollArea className="h-72 overflow-auto">
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className="justify-between p-4"
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <div className="flex gap-2">
                        <FlagComponent country={option.value} countryName={option.label} />
                        <span className="flex-1 text-sm">{option.label}</span>
                        {option.value && (
                          <span className="text-foreground/50 text-sm text-[#A2A3A9]">
                            {`+${RPNInput.getCountryCallingCode(option.value)}`}
                          </span>
                        )}
                      </div>
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          option.value === value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="bg-foreground/20 flex h-5 w-5 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = 'FlagComponent';

export { PhoneInput };
