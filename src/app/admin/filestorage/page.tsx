'use client';

import { useState } from 'react';

import { HiTemplate } from 'react-icons/hi';

import { Command, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command';

export default function FileStorage() {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <div className="flex justify-center">
        <Command className="w-2/5 rounded-xl border-[0.5px] border-gray-300">
          <CommandInput
            placeholder="Type a command or search..."
            value={inputValue}
            onValueChange={(vavlue: string) => setInputValue(vavlue)}
          />
          <CommandList>
            {inputValue ? <CommandEmpty>No results found.</CommandEmpty> : null}
          </CommandList>
        </Command>
      </div>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <HiTemplate className="text-7xl text-gray-500" />
          <div className="text-lg font-semibold text-gray-500">No Item</div>
        </div>
      </div>
    </>
  );
}
