import * as React from 'react';

// g2已经更新到3.0
// 不带的写了


export interface IPicturesWallProps {
  color?: string;
  height: number;
  borderColor?: string;
  line?: boolean;
  count: number;
  animate?: boolean;
  headPictureUrl: string;
  // previewVisible: boolean;
  // previewImage: string;
}

export default class PicturesWall extends React.Component<IPicturesWallProps, any> {}
