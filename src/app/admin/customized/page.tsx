/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

import '@pqina/pintura/pintura.css';

import {
  setPlugins,
  plugin_crop,
  plugin_filter,
  plugin_annotate,
  plugin_sticker,
  createMarkupEditorToolStyles,
  createMarkupEditorToolStyle,
  createMarkupEditorShapeStyleControls,
  createDefaultFontSizeOptions,
  createDefaultFontFamilyOptions,
} from '@pqina/pintura';
import { getEditorDefaults } from '@pqina/pintura';
import { PinturaEditor } from '@pqina/react-pintura';
import Image from 'next/image';
import { BiCategory } from 'react-icons/bi';
import { FaRegFileImage } from 'react-icons/fa';
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

setPlugins(plugin_crop, plugin_filter, plugin_annotate, plugin_sticker);

const headerURL = 'https://fuchsia-fancy-orangutan-869.mypinata.cloud/ipfs';

const predefinedTemplates = [
  {
    id: 1,
    imageUrl: 'QmTSo1QyvYhb6csz2p46mkdVz7ZoHMwepDgDBTzkLeJBjh',
    name: 'Certificate 1',
  },
  {
    id: 2,
    imageUrl: 'QmPq7ZThe7BV6jD1TrvcXTbD8XLT7R9JPQtyRHKkcDbkSk',
    name: 'Certificate 2',
  },
  {
    id: 3,
    imageUrl: 'QmQuUeJXHpfmGaHbSEXX913Hyq8Nv8e4Fkojaw1KpJRk2B',
    name: 'Certificate 3',
  },
  {
    id: 4,
    imageUrl: 'QmPp9J3sYw4pcSU1qPYnTpAFGbwyUWFkUDtAF1Cb8hU2ao',
    name: 'Certificate 4',
  },
  {
    id: 5,
    imageUrl: 'QmbNVR9u4KPxu5DygVLpR18bRo1Ar2b47waUNFykgZRz3P',
    name: 'Certificate 5',
  },
  {
    id: 6,
    imageUrl: 'QmPtdg862USmusjyKc2rcgCyv6sXVMamjoMNuxXEpTeXeN',
    name: 'Certificate 6',
  },
  {
    id: 7,
    imageUrl: 'QmV8R2Dz1Y7GKNSj2bJ5keN4X4LUwJuRpMbs3sxiws1Kso',
    name: 'Certificate 7',
  },
];

const editorDefaults = getEditorDefaults({
  imageWriter: {
    preprocessImageState: (imageState: any) => {
      // imageState.annotation = imageState.annotation.filter((shape: any) => {
      //   return (shape.disableErase = false);
      // });
      imageState.annotation = imageState.annotation.filter((_: any, index: any) => index !== 0);

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
  const [fileName, setFileName] = useState<string>('Tải mẫu lên');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    `${headerURL}/QmTSo1QyvYhb6csz2p46mkdVz7ZoHMwepDgDBTzkLeJBjh`
  );

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedTemplate(fileUrl);
      setFileName(file.name);
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
        <h2 className="text-2xl font-bold">Tùy chỉnh mẫu</h2>
        <div className="flex items-center gap-6">
          <>
            <Input
              id="picture"
              type="file"
              className="hidden rounded-full"
              onChange={handleTemplateChange}
            />
            <ButtonPrimary
              className="flex items-center gap-2 border-2 border-primary-50 bg-white text-primary-50"
              onClick={() => document.getElementById('picture')?.click()}
            >
              <FaRegFileImage className="text-2xl" />
              {fileName.slice(0, 12)}
            </ButtonPrimary>
          </>
          <div className="grid items-center gap-1.5">
            <Drawer>
              <DrawerTrigger asChild>
                <ButtonPrimary className="flex items-center gap-2 text-white">
                  <BiCategory className="text-2xl" />
                  Chọn mẫu
                </ButtonPrimary>
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
                      <Button className="mt-4 bg-primary-50 text-white">Xong</Button>
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
              x: 380,
              y: 600,
              width: 1250,
              height: 200,
              backgroundColor: [0.94, 0.94, 0.94],
              disableRemove: true,
              disableResize: true,
              disableRotate: true,
              disableMove: true,
            },
            {
              x: 800,
              y: 1000,
              width: 400,
              height: 400,
              backgroundImage: '/batch_black.png',
              disableRemove: true,
              disableResize: true,
              disableRotate: true,
              disableMove: true,
            },
          ]}
        />
      </div>

      <Dialog open={result ? true : false}>
        <DialogContent className="text-white">
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
            <ButtonPrimary onClick={handleDownload} className="px-6 text-white">
              Tải mẫu xuống
            </ButtonPrimary>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
