import { cn } from '@/utils/classname';

import AddCircle from './AddCircleIcon.svg';
import Basalwallet from './Basalwallet.svg';
import BasalwalletFull from './BasalwalletFull.svg';
import Loading from './LoadingIcon.svg';
import Trash from './TrashIcon.svg';

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
