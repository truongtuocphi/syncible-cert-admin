interface IIconProps extends React.SVGProps<SVGSVGElement> {}

interface ILinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}

interface StaticRequire {
  default: StaticImageData;
}

type StaticImport = StaticRequire | StaticImageData;

interface IImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
  quality?: number;
  priority?: boolean;
  unoptimized?: boolean;
  src: string | StaticImport;
  fit?: 'cover' | 'contain';
  containerClassName?: string;
}

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  register?: any;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: string | boolean;
}

interface ISidebarMenuProps {
  collapse?: boolean;
}