'use client';

import { useState } from 'react';

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

setPlugins(plugin_crop, plugin_filter, plugin_annotate, plugin_sticker);

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

  return (
    <div className="h-screen w-full overflow-hidden rounded-lg">
      <PinturaEditor
        {...editorDefaults}
        src={
          'https://fuchsia-fancy-orangutan-869.mypinata.cloud/ipfs/QmbeHMgQXuDCkpPjpQRLb8D4xvFo5cm5QpsPaiZayXri8Y'
        }
        stickers={['🎉', '😄', '👍', '👎', '🍕']}
        onLoad={(res) => console.log('load image', res)}
        onProcess={({ dest }) => setResult(URL.createObjectURL(dest))}
      />

      {!!result.length && (
        <p>
          <Image src={result} alt="img" width={350} height={300} />
        </p>
      )}
    </div>
  );
}
