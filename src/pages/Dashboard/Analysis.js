import React, { Component } from 'react';
import moment from 'moment';
import AvatarList from '@/components/AvatarList';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Icon,
  Card,
  List,
  Avatar,
  Pagination
} from 'antd';

import Statistic from '@/components/Statistic';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Analysis.less';
import stylesProjects from '../List/Projects.less';


const prefixImgUrl  = 'http://localhost/ivy-root/file/design/downloadCompressPicture?fileId=';
const { Meta } = Card;
@connect(({ chart, loading, design }) => ({
  chart,
  chartLoading: loading.effects['chart/fetch'],
  design,
  designLoading: loading.effects['design/fetchDesigns'],
}))
class Analysis extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    loading: true,
  };

  componentWillMount() {
    if(sessionStorage.getItem('signedIn') === 'yes') {

    } else {
      window.location.href = '/user/login';
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    requestAnimationFrame(
      () => {
      dispatch({
        type: 'chart/fetch',
        payload : {

        }
      });

      dispatch({
        type: 'design/fetchDesign',
        payload: {
          pageSize: 20,
          pageNo: 1
        }
      });

      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {

  }

  render() {
    const { loading: stateLoading } = this.state;
    const { chart, chartLoading , design, designLoading } = this.props;
    const {
      totalVisitors, orderData, totalOrders, visitData,
    } = chart;

    const { designList } = design;
    const loading = chartLoading || stateLoading || designLoading;

    const Designs = ()=> (
      <List
        className={stylesProjects.coverCardList}
        rowKey="id"
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={designList}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 280 }}
              cover={<img alt={item.title} src={prefixImgUrl+ item.coverPictureUrl} />}
              actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="share-alt" />]}
            >
              <Meta
                title={item.name}
                description={item.brief}
              />
              <div className={stylesProjects.cardItemContent}>
                <span>{moment(item.createTime).fromNow()}</span>
                <div className={stylesProjects.avatarList} />
              </div>
            </Card>
          </List.Item>
        )}
      />
    )

    return (

      <GridContent>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title={
                <FormattedMessage
                  id="app.analysis.personal-overview"
                  defaultMessage="Online Top Search"
                />
              }
              style={{ marginTop: 24 }}
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <Statistic total={totalOrders} data={orderData} noticeId="app.analysis.introduce" titleId="app.analysis.counter-business" />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <Statistic total={totalVisitors} data={visitData} noticeId="app.analysis.introduce" titleId="app.analysis.counter-visit" />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.listCard}
              bordered={false}
              title="我的作品"
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: '32px 32px 40px 32px' }}
            >
              <Row>
                <Designs />
              </Row>
              <Row type="flex" justify="end">
                <Pagination style={{padding: '24px 30px 40px 32px'}} showQuickJumper defaultCurrent={2} total={500} />
              </Row>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Analysis;
