import * as React from 'react';

export const Frame = ({d}: {d: string}) => (
  <path
    d={d}
    fill={'none'}
    stroke={'currentcolor'}
    strokeWidth={45}
    strokeLinecap={'round'}
    strokeLinejoin={'round'}
  />
);

export const Shape = ({d}: {d: string}) => (
  <path
    d={d}
    fill={'currentcolor'}
    stroke={'currentcolor'}
    strokeWidth={45}
    strokeLinecap={'round'}
    strokeLinejoin={'round'}
  />
);

export const Ring = ({r, cx, cy}: {r: number, cx: number, cy: number}) => (
  <circle r={r} cx={cx} cy={cy} fill={'none'} stroke={'currentcolor'} strokeWidth={45}/>
);

export const Disk = ({r, cx, cy}: {r: number, cx: number, cy: number}) => (
  <circle r={r} cx={cx} cy={cy} fill={'currentcolor'} stroke={'currentcolor'} strokeWidth={45}/>
);
