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
              { identifier: 'imgly_font_amaticsc' },
              { identifier: 'imgly_font_archivo_black' },
              { identifier: 'imgly_font_bungee_inline' },
              { identifier: 'imgly_font_campton_bold' },
              { identifier: 'imgly_font_carter_one' },
              { identifier: 'imgly_font_codystar' },
              { identifier: 'imgly_font_fira_sans_regular' },
              { identifier: 'imgly_font_galano_grotesque_bold' },
              { identifier: 'imgly_font_krona_one' },
              { identifier: 'imgly_font_kumar_one_outline' },
              { identifier: 'imgly_font_lobster' },
              { identifier: 'imgly_font_molle' },
              { identifier: 'imgly_font_monoton' },
              { identifier: 'imgly_font_nixie_one' },
              { identifier: 'imgly_font_notable' },
              { identifier: 'imgly_font_ostrich_sans_black' },
              { identifier: 'imgly_font_ostrich_sans_bold' },
              { identifier: 'imgly_font_oswald_semi_bold' },
              { identifier: 'imgly_font_palanquin_dark_semi_bold' },
              { identifier: 'imgly_font_poppins' },
              { identifier: 'imgly_font_permanent_marker' },
              { identifier: 'imgly_font_roboto_black_italic' },
              { identifier: 'imgly_font_roboto_light_italic' },
              { identifier: 'imgly_font_sancreek' },
              { identifier: 'imgly_font_stint_ultra_expanded' },
              { identifier: 'imgly_font_trash_hand' },
              { identifier: 'imgly_font_vt323' },
              { identifier: 'imgly_font_yeseva_one' },
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
