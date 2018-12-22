import * as React from 'react';

// g2已经更新到3.0
// 不带的写了


export interface IStatistic {
  total: string;
  data: any[];
  titleId: string;
  noticeId: string;
}

export default class Statistic extends React.Component<IStatistic, any> {}
