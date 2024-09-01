/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef, useState } from 'react';

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
  createMarkupEditorToolStyles,
  createMarkupEditorToolStyle,
  createMarkupEditorShapeStyleControls,
  createDefaultFontSizeOptions,
  createDefaultFontFamilyOptions,
} from '@pqina/pintura';
import { getEditorDefaults } from '@pqina/pintura';
import {
  LocaleCore,
  LocaleCrop,
  LocaleFilter,
  LocaleAnnotate,
  LocaleSticker,
  LocaleMarkupEditor,
} from '@pqina/pintura/locale/en_GB';
import { PinturaEditor } from '@pqina/react-pintura';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import { IoClose } from 'react-icons/io5';
import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
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
  {
    id: 4,
    imageUrl: 'QmcjRNfDYLp1L4RN7YzGX9nE6ECbet3MTEJanji8NUudnJ',
    name: 'Certificate 4',
  },
  {
    id: 5,
    imageUrl: 'Qmc6xgr71Tn3wVqhdBixv5Ca62ysQXek8m92dEZGneKDPs',
    name: 'Certificate 5',
  },
  {
    id: 6,
    imageUrl: 'QmRNQQgCRPSP54XUJH5P6aHJAoQGL53K1Mt9kowuDTtXA7',
    name: 'Certificate 6',
  },
  {
    id: 7,
    imageUrl: 'QmX7X9Y4GLv6xhCfjR4a1LWbYiB1m8467asyCPpjDb5NDy',
    name: 'Certificate 7',
  },
];

const editorDefaults = getEditorDefaults({
  imageWriter: {
    preprocessImageState: (imageState: any) => {
      // Create new annotation array
      imageState.annotation = imageState.annotation.map((shape: any) => {
        // This is not a text shape so skip
        if (!shape.text) return shape;

        // Replace placeholders in text properties
        shape.text = shape.text.replace(/_________________/g, '');
        shape.text = shape.text.replace(/ID chứng chỉ: xxxxxxxxx - xx - xx/g, '');

        return shape;
      });

      // Return updated image state
      return imageState;
    },
  },
});

// const editorDefaults = {
//   utils: ['crop', 'filter', 'finetune', 'sticker', 'annotate'],
//   imageReader: createDefaultImageReader(),
//   imageWriter: createDefaultImageWriter(),
//   shapePreprocessor: createDefaultShapePreprocessor(),
//   ...plugin_filter_defaults,
//   ...plugin_sticker_locale_en_gb,
//   ...plugin_annotate,
//   ...markup_editor_defaults,
//   locale: {
//     ...LocaleCore,
//     ...LocaleCrop,
//     ...LocaleFilter,
//     ...LocaleAnnotate,
//     ...LocaleSticker,
//     ...LocaleMarkupEditor,
//   },
// };

export default function DefineTemplate() {
  const [result, setResult] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    `${headerURL}/QmTu4V9dSaQB646ztpanTwzznJfvuhrR5mtfRPv7Xm5NzE`
  );

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedTemplate(fileUrl);
    }
  };

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
          <div className="text-lg font-bold text-gray-600">Trở lại</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="grid w-44 max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Tải mẫu lên</Label>
            <Input
              id="picture"
              type="file"
              className="rounded-full"
              onChange={handleTemplateChange}
            />
          </div>
          <div className="grid items-center gap-1.5">
            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Mẫu Chứng chỉ
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="rounded-full bg-blue-500 text-white">Chọn mẫu</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-5xl text-gray-700">
                  <DrawerHeader>
                    <DrawerTitle className="text-2xl font-bold">Chọn mẫu Chứng chỉ</DrawerTitle>
                  </DrawerHeader>
                  <div className="my-6 grid grid-cols-5 gap-4 px-4">
                    {predefinedTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`mb-3 h-32 w-full cursor-pointer rounded-lg border p-1 ${
                          selectedTemplate === `${headerURL}/${template.imageUrl}`
                            ? 'border-blue-500'
                            : 'border-gray-300'
                        }`}
                        onClick={() => setSelectedTemplate(`${headerURL}/${template.imageUrl}`)}
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
                      <Button className="mt-4 bg-blue-500 text-white">Chọn</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      <div className="h-dvh w-full overflow-hidden rounded-xl">
        <PinturaEditor
          {...getEditorDefaults()}
          {...editorDefaults}
          src={selectedTemplate}
          stickers={['/batch_black.png', '/batch_red_white.png']}
          markupEditorToolStyles={createMarkupEditorToolStyles({
            text: createMarkupEditorToolStyle('text', {
              color: [0, 0, 0],
              fontSize: 72,
            }),
          })}
          markupEditorShapeStyleControls={createMarkupEditorShapeStyleControls({
            fontSizeOptions: [...createDefaultFontSizeOptions(), 170],
            fontFamilyOptions: [
              ['Dancing Script', 'Dancing Script'],
              ['MonteCarlo', 'MonteCarlo'],
              ['Noto Serif', 'Noto Serif'],
              ['Crimson Text', 'Crimson Text'],
              ['Great Vibes', 'Great Vibes'],
              ...createDefaultFontFamilyOptions(),
            ],
          })}
          onLoad={(res) => {
            console.log('load image', res);
          }}
          onProcess={({ dest }) => setResult(URL.createObjectURL(dest))}
          imageAnnotation={[
            {
              x: 550,
              y: 650,
              fontSize: 96,
              color: [0, 0, 0],
              text: '_________________',
              disableMove: true,
            },
            {
              x: 750,
              y: 40,
              fontSize: 30,
              color: [0, 0, 0],
              text: 'ID chứng chỉ: xxxxxxxxx - xx - xx',
              disableMove: true,
            },
          ]}
        />
      </div>

      <Dialog open={result ? true : false}>
        <DialogContent>
          <DialogTitle>
            <div className="mb-1 flex w-full items-center justify-between">
              <p className="font-bold text-gray-700">Bản xem trước</p>
              <IoClose
                onClick={() => setResult('')}
                className="cursor-pointer text-3xl font-medium text-gray-700"
              />
            </div>
            <DialogDescription>
              Đây là bản xem trước của mẫu chứng chỉ mà bạn đã tạo.
            </DialogDescription>
          </DialogTitle>
          <div className="h-fit w-full">
            <img src={result} alt="img" className="h-full w-full border-[0.5px] border-gray-300" />
          </div>
          <DialogFooter>
            <ButtonPrimary onClick={handleDownload} className="px-6">
              Tải mẫu xuống
            </ButtonPrimary>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
