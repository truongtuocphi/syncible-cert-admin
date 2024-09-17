/* eslint-disable no-console */
import React, { useEffect } from 'react';

import { UIEvent, PhotoEditorSDKUI } from 'photoeditorsdk';

const PhotoEditorSDK = () => {
  useEffect(() => {
    const initEditor = async () => {
      try {
        const editor = await PhotoEditorSDKUI.init({
          container: '#editor',
          image:
            'https://fuchsia-fancy-orangutan-869.mypinata.cloud/ipfs/QmTSo1QyvYhb6csz2p46mkdVz7ZoHMwepDgDBTzkLeJBjh',
          license: 'DULee_tRwe4jZOZg8kE2UYZcd229Ol5joYQSvfObuVwuf5uZrk3s5cp9p9npblwY',
          theme: 'light',
          text: {
            fonts: [
              { identifier: 'imgly_font_open_sans_bold' },
              { identifier: 'imgly_font_aleo_bold' },
            ],
          },
        });
        console.log('PhotoEditorSDK for Web is ready!');
        editor.on(UIEvent.EXPORT, (imageSrc) => {
          console.log('Exported ', imageSrc);
        });
      } catch (error) {
        console.error('Failed to initialize PhotoEditorSDK:', error);
      }
    };

    initEditor();
  }, []);

  return (
    <div
      id="editor"
      style={{
        width: '100%',
        height: '80vh',
        margin: 'auto',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        position: 'relative',
      }}
    />
  );
};

export default PhotoEditorSDK;
