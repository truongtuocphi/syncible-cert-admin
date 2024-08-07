import { cn } from '@/utils/classname';

import AddCircle from './AddCircleIcon.svg';
import AlphaTrueLogoBlue from './AlphaTrueLogoBlue.svg';
import AlphaTrueLogoWhite from './AlphaTrueLogoWhite.svg';
import Basalwallet from './Basalwallet.svg';
import BasalwalletFull from './BasalwalletFull.svg';
import Google from './Google.svg';
import Loading from './LoadingIcon.svg';
import Trash from './TrashIcon.svg';

export const GoogleIcon = (props: IIconProps) => <Google width="auto" height="auto" {...props} />;

export const AlphaTrueLogoWhiteIcon = (props: IIconProps) => (
  <AlphaTrueLogoWhite width="auto" height="auto" {...props} />
);

export const AlphaTrueLogoBlueIcon = (props: IIconProps) => (
  <AlphaTrueLogoBlue width="auto" height="auto" {...props} />
);

export const BasalwalletIcon = (props: IIconProps) => (
  <Basalwallet width="auto" height="auto" {...props} />
);

export const BasalwalletFullIcon = (props: IIconProps) => (
  <BasalwalletFull width="auto" height="auto" {...props} />
);

export const LoadingIcon = (props: IIconProps) => (
  <Loading
    {...props}
    className={cn('h-6 w-6 animate-spin [&_path]:fill-current', props.className)}
  />
);

export const AddCircleIcon = (props: IIconProps) => (
  <AddCircle {...props} className={cn('h-6 w-6 [&_path]:fill-current', props.className)} />
);

export const TrashIcon = (props: IIconProps) => (
  <Trash {...props} className={cn('h-6 w-6 [&_path]:fill-current', props.className)} />
);
