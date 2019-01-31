import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, Input, Button, Tag, Carousel, Avatar, Cascader, Select,message} from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import GridContent from '../../components/PageHeaderWrapper/GridContent';
import styles  from './Introduction.less'
import residences from '../../models/residences'


const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const prefixImgUrl  = 'http://localhost/ivy-root/file/design/downloadCompressPicture?fileId=';



@connect(({ share, loading}) => ({
  share,
  shareLoading: loading.effects['share/fetch'],
}))
@Form.create()
class Introduction extends Component {
  state = {
    key: 'tab1',
    noTitleKey: 'aboutUs',
    submitDisable: false
  }

  componentDidMount() {
    const { dispatch ,share} = this.props;

    requestAnimationFrame(
      () => {
        dispatch({
          type: 'share/fetch',
          payload : {
            designerId: this.props.location.query.designerId,
          }
        });

      });
  }



  componentWillUnmount() {

  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });

    console.log("anchor ", key);
    // 对应id的话, 滚动到相应位置
    if (key) {
      const anchorElement = document.getElementById(key);
      if (anchorElement) {
        window.scrollTo(0, anchorElement.offsetTop + window.innerHeight / 2 - 10);
      }
    }
  }

  handleSelectorChange = e => {
    console.log(`selected ${e}`);
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    this.setState({submitDisable: true})
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'share/submitAppointment',
          payload: {values,designerId: this.props.location.query.designerId}
        });
      }
    });
  };


  render() {

    const { submitting, share } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { submitDisable } = this.state;


    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 28 },
        sm: { span: 16 },
        md: { span: 14 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const tabListNoTitle = [{
      key: 'aboutUs',
      tab: '关于我们',
    }, {
      key: 'skilledAt',
      tab: '擅长空间',
    }, {
      key: 'designFee',
      tab: '设计费',
    }, {
      key: 'address',
      tab: '地区',
    }, {
      key: 'achievement',
      tab: '成就',
    }, {
      key: 'designs',
      tab: '作品',
    }];

    const { Content, Footer }  = Layout;

    const titleFontSize = 22;

    return (



      <Layout>
        <Content
          className={styles.imgEle}
          style={{
            padding: 24,
            margin: 0,
            minHeight: 250,
            backgroundImage: `url(${prefixImgUrl+share.sharePageBackground})`
          }}
        >
          <div style={{position: "absolute", bottom: "310px", left: "0", verticalAlign: "middle"}}>
            <Row type="flex" justify="space-between">
              <Col span={4}>
                <Avatar shape="square" size={128} icon="user" />
              </Col>
              <Col style={{marginLeft: "10px"}}>
                <span style={{fontSize : 20, fontWeight: "bold"}}>{share.companyName}</span>
                <br />
                <br />
                <br />
                <span style={{fontWeight: "bold"}}>{share.address}</span>
              </Col>
            </Row>
          </div>
        </Content>

        <Content
          style={{
            margin: 15,
          }}
        >
          <div>
            <GridContent className={styles.userCenter} >
              <Row gutter={24}>
                <Col lg={17} md={24}>
                  <Card
                    style={{ width: '100%', height: '100%' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}
                    bordered={false}
                  >
                    <div id="aboutUs">
                      <h4 style={{ marginBottom: 16, marginTop: 16, fontSize: titleFontSize, fontWeight: "bold" }}>关于我们:</h4>
                      <p>{share.introduction}</p>
                    </div>

                    <div id="skilledAt">
                      <h4 style={{ marginBottom: 16, marginTop: 16, fontSize: titleFontSize, fontWeight: "bold" }}>擅长空间:</h4>
                      <p> {share.skilledAt && share.skilledAt.length > 0 ? share.skilledAt.map((member, i) => (
                        <Tag color="geekblue" id={i} key={member}> {member} </Tag>
                        )) : ""}
                      </p>
                    </div>

                    <div id="designFee">
                      <h4 style={{ marginBottom: 16, marginTop: 16, fontSize: titleFontSize, fontWeight: "bold" }}>设计费:</h4>
                      <p> {share.miniCharge} ~ {share.maxCharge} {`  ${  share.isNegotiable}` ? "or 面议" : ""}</p>
                    </div>

                    <div id="address">
                      <h4 style={{ marginBottom: 16, marginTop: 16, fontSize: titleFontSize, fontWeight: "bold" }}>地区:</h4>
                      <p> {share.address}</p>

                    </div>

                    <div id="achievement">
                      <h4 style={{ marginBottom: 16, marginTop: 16, fontSize: titleFontSize, fontWeight: "bold" }}>成就:</h4>
                      <p> {share.achievement}</p>
                    </div>

                    <div id="designs">
                      <h4 style={{ marginBottom: 16, marginTop: 16, fontSize: titleFontSize, fontWeight: "bold" }}>作品:</h4>
                      {share.designList && share.designList.length > 0 ?
                        share.designList.map((member, i) => (
                          <div key={member.design.id}>
                            <p style={{textAlign:"center"}}><span>{member.design.name}</span></p>
                            <Carousel autoplay>
                              {member.designImgList && member.designImgList.length > 0 ? member.designImgList.map((member2, i2) => (<div key={member2.id}> <img  style={{margin : "auto", width : "50%" , height : "50%"}} src={prefixImgUrl+member2.imgUrl} alt={member2.description} /></div>)) : "暂无作品图片"}
                            </Carousel>
                            <p style={{textAlign:"center"}}><span>{member.design.description ? member.design.description : "暂无描述"}</span></p>
                          </div>

                          )
                        ) : "暂无作品"}

                    </div>
                  </Card>
                </Col>

                <Col lg={7} md={24}>
                  <Card
                    title='一起探讨你家的样子吧'
                    style={{ width: '100%' }}
                    bordered={false}
                  >
                    <div>
                      <Form onSubmit={this.handleSubmit} style={{ marginTop: 8, width: '100%' }}>
                        <FormItem {...formItemLayout} label='您的称呼'>
                          {getFieldDecorator('customerName', {
                            rules: [
                              {
                                required: true,
                                message: '请输入您的称呼',
                              },
                            ],
                          })(
                            <Input
                              style={{ minHeight: 32 }}
                              placeholder='您的称呼'
                              rows={4}
                            />
                          )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='联系电话' >
                          {getFieldDecorator('phoneNumber', {
                            rules: [
                              {
                                required: true,
                                message: '请输入您的联系电话',
                              },
                            ],
                          })(
                            <Input
                              style={{ minHeight: 32 }}
                              placeholder='联系电话'
                              rows={4}
                            />
                          )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='项目类型' >
                          {getFieldDecorator('projectType', {
                            initialValue: "1",
                            rules: [
                              {
                                required: true,
                                message: '选择项目类型',
                              },
                            ],
                          })(
                            <Select onChange={this.handleSelectorChange}>
                              <Option value="1">样板间</Option>
                              <Option value="2">家居别墅</Option>
                              <Option value="3">酒店餐饮</Option>
                              <Option value="4">民宿</Option>
                              <Option value="5">其他</Option>
                            </Select>
                          )}
                        </FormItem>


                        <FormItem {...formItemLayout} label={<FormattedMessage id="form.selector.city.cascade" />}>
                          {getFieldDecorator('address', {
                            initialValue: ['江苏', '南京'],
                            rules: [{ type: 'array', required: true, message: '请选择您的居住地' }],
                          })(
                            <Cascader options={residences} />
                          )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="备注">
                          {getFieldDecorator('brief', {
                            rules: [
                              {
                                required: false,
                                message: "描述您的需求吧",
                              },
                            ],
                          })(
                            <TextArea
                              style={{ minHeight: 32 }}
                              placeholder="描述您的需求吧"
                              rows={4}
                            />
                          )}
                        </FormItem>

                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                          <Button type="primary" disabled={submitDisable} htmlType="submit" loading={submitting}>
                            <FormattedMessage id="form.submit" />
                          </Button>
                        </FormItem>
                      </Form>
                    </div>
                  </Card>
                </Col>
              </Row>
            </GridContent>
          </div>
        </Content>

        <Footer />
      </Layout>
    );
  }
}

export default Introduction;
