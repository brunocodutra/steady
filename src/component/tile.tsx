import classes from 'classnames';
import React from 'react';

import Interactive from 'component/interactive';

type Props = {
  readonly active?: boolean,
  readonly activate?: () => void,
  readonly remove?: () => void,
  readonly className?: string,
  readonly children?: React.ReactNode,
};

export default ({ active = false, activate, remove, className = '', children }: Props) => (
  <Interactive action={!active ? activate : undefined} className={classes('tile', className, { active })}>
    <Interactive action={remove} className='control remove fade' />
    {children}
  </Interactive>
);
