import { forwardRef } from 'react';

import ImageNext from 'next/image';

const Image = forwardRef<HTMLImageElement, IImageProps>(
  ({ src = '', alt = '', className, fit = 'contain', quality, priority, unoptimized }, ref) => {
    return (
      <ImageNext
        ref={ref}
        src={src}
        alt={alt}
        quality={quality}
        priority={priority}
        unoptimized={unoptimized}
        fill
        style={{ objectFit: fit }}
        className={className}
      />
    );
  }
);

Image.displayName = 'Image';

export default Image;
