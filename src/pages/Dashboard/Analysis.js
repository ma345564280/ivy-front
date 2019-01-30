import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Card,
  List,
  Pagination,
  Table,
  Divider,
  Button
} from 'antd';

import Statistic from '@/components/Statistic';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Analysis.less';
import stylesProjects from './Projects.less';


const prefixImgUrl = 'http://localhost/ivy-root/file/design/downloadCompressPicture?fileId=';
const { Meta } = Card;
const { Column } = Table;



@connect(({ chart, loading, design, appointment }) => ({
  chart,
  chartLoading: loading.effects['chart/fetch'],
  design,
  designLoading: loading.effects['design/fetchDesigns'],
  appointment,
  appointmentLoading: loading.effects['appointment/fetchAppointments'],
}))
class Analysis extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    loading: true,
  };

  componentWillMount() {
    if (sessionStorage.getItem('signedIn') === 'yes') {

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
          payload: {},
        });

        dispatch({
          type: 'design/fetchDesign',
          payload: {
            pageSize: 12,
            pageNo: 1,
          },
        });

        dispatch({
          type: 'appointment/fetchAppointments',
          payload: {
            pageSize: 10,
            pageNo: 1,
          },
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

  pageChange = (page) => {
    console.log(page);
    const { dispatch } = this.props;

    dispatch({
      type: 'design/fetchDesign',
      payload: {
        pageSize: 12,
        pageNo: page,
      },
    });
  };

  editIconClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  };

  deleteIconClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  };

  editAppointmentClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  };

  deleteAppointmentClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'appointment/fetchAppointments',
      payload: {
        pageSize: 10,
        pageNo: pagination.current,
      },
    });
  }

  render() {
    const { loading: stateLoading } = this.state;
    const { chart, chartLoading, design, designLoading, appointment } = this.props;
    const {
      totalVisitors, orderData, totalOrders, visitData,
    } = chart;

    const { designList, pageSize, pageNo, total } = design;
    const loading = chartLoading || stateLoading || designLoading;
    const appointmentPagination = {
      pageSize: appointment.pageSize,
      pageNo: appointment.pageNo,
      total: appointment.total
    };

    const Designs = () => (
      <List
        className={stylesProjects.coverCardList}
        rowKey="id"
        grid={{ gutter: 24, xl: 5, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={designList}
        renderItem={item => (
          <List.Item>
            <Card
              // style={{ width: 200 }}
              cover={<img alt={item.title} src={prefixImgUrl + item.coverPictureUrl} />}
              actions={[<Button icon="edit" style={{border:0, backgroundColor:"transparent"}} onClick={this.editIconClick} id={item.id} size="small" />,
                <Button icon="delete" style={{border:0, backgroundColor:"transparent"}} onClick={this.deleteIconClick} id={item.id} size="small" />]}
            >
              <Meta
                title={item.name}
                description={item.brief}
              />
              <div className={stylesProjects.cardItemContent}>
                <span>{moment(item.createTime).fromNow()}</span>
              </div>
            </Card>
          </List.Item>
        )}
      />
    );

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
                  <Statistic
                    total={totalOrders}
                    data={orderData}
                    noticeId="app.analysis.introduce"
                    titleId="app.analysis.counter-business"
                  />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <Statistic
                    total={totalVisitors}
                    data={visitData}
                    noticeId="app.analysis.introduce"
                    titleId="app.analysis.counter-visit"
                  />
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
                <Pagination
                  style={{ padding: '24px 30px 40px 32px' }}
                  showQuickJumper
                  current={pageNo}
                  total={total}
                  pageSize={pageSize}
                  onChange={this.pageChange}
                />
              </Row>
            </Card>
          </Col>
        </Row>


        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.listCard}
              bordered={false}
              title="我的预约"
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: '32px 32px 40px 32px' }}
            >
              <Table dataSource={appointment.appointments} onChange={this.handleTableChange} pagination={appointmentPagination}>
                <Column
                  title="客户姓名"
                  dataIndex="customerName"
                  key="customerName"
                />

                <Column
                  title="客户手机号码"
                  dataIndex="customerPhoneNumber"
                  key="customerPhoneNumber"
                />
                <Column
                  title="客户地址"
                  dataIndex="address"
                  key="address"
                />
                <Column
                  title="需求类型"
                  dataIndex="projectTypeDesc"
                  key="projectTypeDesc"
                  // filters={[
                  //   { text: '样板间', value: '样板间' },
                  //   { text: '家居别墅', value: '家居别墅' },
                  //   { text: '酒店餐饮', value: '酒店餐饮' },
                  //   { text: '民宿', value: '民宿' },
                  //   { text: '其他', value: '其他' },
                  // ]}
                />
                <Column
                  title="描述"
                  dataIndex="note"
                  key="note"
                />
                <Column
                  title="预约时间"
                  dataIndex="createTime"
                  key="createTime"
                  render={
                    createTime => (
                      <span>
                        {moment(createTime).fromNow()}
                      </span>
                    )}
                />
                <Column
                  title="操作"
                  key="action"
                  render={(text, record) => (
                    <span>
                      <Button icon="edit" style={{border:0, backgroundColor:"transparent"}} onClick={this.editAppointmentClick} id={record.id} size="small" />
                      <Divider type="vertical" />
                      <Button icon="delete" style={{border:0, backgroundColor:"transparent"}} onClick={this.deleteAppointmentClick} id={record.id} size="small" />
                    </span>
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Analysis;
