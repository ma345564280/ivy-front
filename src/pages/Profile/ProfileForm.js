import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {  FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  Button,
  Card,
  Radio,
  Cascader,
  Select,
} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import ChargeRange from '../../components/ChargeRange';
import PicturesWall from '../../components/PicturesWall';
import HotTags from '../../components/HotTags';
import CropPicture from '../../components/CropPicture';

const FormItem = Form.Item;
const { TextArea } = Input;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
const tagsSkillAt = ['样板间', '家居别墅', '酒店餐饮', '民宿'];
const tagsServiceType = ['设计', '施工'];
const { Option } = Select;

@connect(({ loading }) => ({
  submitting: loading.effects['profileform/submitRegularForm'],
}))
@Form.create()
class ProfileForm extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'profileform/submitProfileForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="web.form.profile" />}
        // content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='企业名称'>
              {getFieldDecorator('companyName', {
                rules: [
                  {
                    required: true,
                    message: '请输入企业名称',
                  },
                ],
              })(<Input placeholder='企业名称' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='企业背景'>
              {getFieldDecorator('backgroundImg', {
                rules: [
                  {
                    required: true,
                    message: '请上传企业背景图片',
                  },
                ],
              })(<CropPicture count={1} ratio={16/9} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='企业形象'>
              {getFieldDecorator('enterpriseImgs', {
                rules: [
                  {
                    required: true,
                    message: '请上传企业形象图片',
                  },
                ],
              })(<CropPicture count={1} ratio={16/9} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='所在地'>
              {getFieldDecorator('address', {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [
                  {
                    required: true,
                    message: '请选择企业所在地',
                  },
                ],
              })(
                <Cascader options={residences} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label='公司类型'>
              {getFieldDecorator('companyType', {
                initialValue: "1",
                rules: [
                  {
                    required: true,
                    message: '请选择公司类型',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">
                    <FormattedMessage id="form.radio.company.type.design" />
                  </Radio>
                  <Radio value="2">
                    <FormattedMessage id="form.radio.company.type.decoration" />
                  </Radio>
                  <Radio value="3">
                    <FormattedMessage id="form.radio.company.type.design.studio" />
                  </Radio>
                  <Radio value="4">
                    <FormattedMessage id="form.radio.company.type.design.drawing" />
                  </Radio>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label='收费范围'>
              {getFieldDecorator('chargeRange', {
                rules: [
                  {
                    required: true,
                    message: '请选择收费范围',
                  },
                ],
              })(<ChargeRange />)}
            </FormItem>

            <FormItem {...formItemLayout} label='联系电话'>
              {getFieldDecorator('phoneNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系电话',
                  },
                ],
              })(<Input placeholder='联系电话' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='服务类型'>
              {getFieldDecorator('serviceType', {
                valuePropName: 'nextSelectedTags',
                rules: [
                  {
                    required: true,
                    message: '请选择服务类型',
                  },
                ],
              })(<HotTags tagsProps={tagsServiceType} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='擅长空间'>
              {getFieldDecorator('skilledAt', {
                valuePropName: 'nextSelectedTags',
                rules: [
                  {
                    required: true,
                    message: '请选择擅长空间',
                  },
                ],
              })(<HotTags tagsProps={tagsSkillAt} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='公司介绍'>
              {getFieldDecorator('introduction', {
                rules: [
                  {
                    required: true,
                    message: '请输入公司介绍',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder='公司介绍'
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label='公司成就' >
              {getFieldDecorator('achievement', {
                rules: [
                  {
                    required: true,
                    message: '请输入公司成就',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder='公司成就'
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProfileForm;
