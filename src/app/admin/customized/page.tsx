/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
'use client';

import PhotoEditorSDK from '@/components/pages/admin/editor/PhotoEditorSDK';

export default function DefineTemplate() {
  return (
    <div className="h-full w-full">
      <PhotoEditorSDK />
    </div>
  );
}
