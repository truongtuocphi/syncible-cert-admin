/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useEffect } from 'react';

import { PinturaEditor } from '@pqina/react-pintura';

import '@pqina/pintura/pintura.css';

import {
  // editor
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_filter,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_sticker,
  plugin_sticker_locale_en_gb,
  markup_editor_defaults,
} from '@pqina/pintura';
import {
  LocaleCore,
  LocaleCrop,
  LocaleFilter,
  LocaleAnnotate,
  LocaleSticker,
  LocaleMarkupEditor,
} from '@pqina/pintura/locale/en_GB';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { getEditorDefaults } from '@pqina/pintura';

setPlugins(plugin_crop, plugin_filter, plugin_annotate, plugin_sticker);

const headerURL = 'https://fuchsia-fancy-orangutan-869.mypinata.cloud/ipfs';

const predefinedTemplates = [
  {
    id: 1,
    imageUrl: 'QmTu4V9dSaQB646ztpanTwzznJfvuhrR5mtfRPv7Xm5NzE',
    name: 'Certificate 1',
  },
  {
    id: 2,
    imageUrl: 'QmS8tsyzFHkt1rh5JBw6j6Rjued71NY6vrcdTqaLdceLvx',
    name: 'Certificate 2',
  },
  {
    id: 3,
    imageUrl: 'QmQW65mTtMpbEpKM9bTDMvkLhthtXk3uGE2HPSbE8Gn5WH',
    name: 'Certificate 3',
  },
];

const editorDefaults = {
  utils: ['crop', 'filter', 'finetune', 'sticker', 'annotate'],
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_filter_defaults,
  ...plugin_sticker_locale_en_gb,
  ...plugin_annotate,
  ...markup_editor_defaults,
  locale: {
    ...LocaleCore,
    ...LocaleCrop,
    ...LocaleFilter,
    ...LocaleAnnotate,
    ...LocaleSticker,
    ...LocaleMarkupEditor,
  },
};

export default function DefineTemplate() {
  const [result, setResult] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    `${headerURL}/QmTu4V9dSaQB646ztpanTwzznJfvuhrR5mtfRPv7Xm5NzE`
  );

  const previewRef = useRef<HTMLDivElement>(null);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedTemplate(fileUrl);
    }
  };

  const handleSelectTemplate = (templateURL: string) => {
    setSelectedTemplate(`${headerURL}/${templateURL}`);
  };

  useEffect(() => {
    if (result && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = 'TemplateCertificate-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={'/admin'}>
            <ButtonPrimary className="size-10 rounded-lg p-2">
              <FaArrowLeft />
            </ButtonPrimary>
          </Link>
          <div className="text-lg font-bold text-gray-600">Back</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="grid w-44 max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Upload Template</Label>
            <Input
              id="picture"
              type="file"
              className="rounded-full"
              onChange={handleTemplateChange}
            />
          </div>
          <div className="grid items-center gap-1.5">
            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Choose Template
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="rounded-full bg-blue-500 text-white">Open Template</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-5xl text-gray-700">
                  <DrawerHeader>
                    <DrawerTitle className="text-2xl font-bold">Choose Template</DrawerTitle>
                  </DrawerHeader>
                  <div className="my-6 grid grid-cols-5 gap-4 px-4">
                    {predefinedTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`h-32 w-full cursor-pointer rounded-lg border p-1 ${
                          selectedTemplate === `${headerURL}/${template.imageUrl}`
                            ? 'border-blue-500'
                            : 'border-gray-300'
                        }`}
                        onClick={() => handleSelectTemplate(template.imageUrl)}
                      >
                        <Image
                          src={`${headerURL}/${template.imageUrl}`}
                          alt={template.name}
                          className="h-full w-full rounded-md object-fill"
                          width={120}
                          height={80}
                        />
                        <p className="mt-2 text-center text-sm font-semibold text-gray-600">
                          {template.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button className="mt-4 bg-blue-500 text-white">Submit</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      <div className="h-dvh w-full overflow-hidden rounded-lg">
        <PinturaEditor
          {...getEditorDefaults()}
          src={selectedTemplate}
          stickers={['/bath_1.png', '/bath_2.png']}
          onLoad={(res) => console.log('load image', res)}
          onProcess={({ dest }) => setResult(URL.createObjectURL(dest))}
        />
      </div>

      {result && (
        <div className="mt-10 flex w-full flex-col items-center justify-center">
          <div className="h-fit w-3/5 rounded-lg bg-white p-4">
            <div className="mb-2 flex w-full items-center justify-between">
              <p className="font-bold text-gray-700">Preview</p>
              <ButtonPrimary onClick={handleDownload} className="bg-blue-500 text-white">
                Download Image
              </ButtonPrimary>
            </div>
            <img src={result} alt="img" className="h-full w-full" />
          </div>
          <div ref={previewRef}></div>
        </div>
      )}
    </>
  );
}
