import React, { PureComponent } from 'react';
import {
  MiniArea,
} from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import { FormattedMessage } from 'umi/locale';
import {
  Icon,
  Tooltip,
} from 'antd';

class Statistic extends PureComponent {
  render() {
    const {data, total, titleId, noticeId} = this.props;
    return (
      <div>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage
                id={titleId}
                defaultMessage="search users"
              />
              <Tooltip
                title={
                  <FormattedMessage
                    id={noticeId}
                    defaultMessage="introduce"
                  />
                }
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          gap={8}
          total={total}
          // status="up"
          // subTotal={17.1}
        />
        <MiniArea line height={45} data={data} />
      </div>
    );
  }
}

export default Statistic;
