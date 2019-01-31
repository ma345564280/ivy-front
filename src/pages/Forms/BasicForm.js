import React  from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  Select,
  Card,
  Radio,
  Button,
  Cascader,
} from 'antd';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import '../../../node_modules/cropperjs/dist/cropper.css';
import CropPicture from '../../components/CropPicture'; // 需要找到相对的 node_modules 路径，必须引入该css文件！
import ChargeRange from '../../components/ChargeRange'; // 需要找到相对的 node_modules 路径，必须引入该css文件！
import residences from '../../models/residences'

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends React.Component {

  componentWillMount() {
    if(sessionStorage.getItem('signedIn') === 'yes') {
    } else {
      window.location.href = '/user/login';
    }
  }

  componentDidMount(){
    this.props.form.setFieldsValue({
      title: `Hi,!`,
    });
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitDesignForm',
          payload: values,
        });
      }
    });
  };

  handleSelectorChange = e => {
    console.log(`selected ${e}`);
  }

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
        title={<FormattedMessage id="app.forms.basic.title" />}
        // content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.title.label" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.title.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'form.title.placeholder' })} />)}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.design.cost.label" />}>
              {getFieldDecorator('priceRange', {
                rules: [
                  {
                    required: true,
                    message: '请输入价格区间',
                  },
                ],
              })(
                <ChargeRange />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.design.Cover.picture.label" />}>
              {getFieldDecorator('uploadHeadPicture', {
                rules: [
                  {
                    required: true,
                    message: '请上传封面',
                  },
                ],
              })(
                <CropPicture count={1} ratio={16/9} />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form.public.label" />}
            >
              <div>
                {getFieldDecorator('designType', {
                  initialValue: '3',
                })(
                  <Radio.Group>
                    <Radio value="1">
                      <FormattedMessage id="form.radio.model.room" />
                    </Radio>
                    <Radio value="2">
                      <FormattedMessage id="form.radio.dinner" />
                    </Radio>
                    <Radio value="3">
                      <FormattedMessage id="form.radio.hotel" />
                    </Radio>
                    <Radio value="4">
                      <FormattedMessage id="form.radio.guesthouse" />
                    </Radio>
                    <Radio value="5">
                      <FormattedMessage id="form.radio.house" />
                    </Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.selector.city.cascade" />}>
              {getFieldDecorator('residence', {
                initialValue: ['江苏','南京'],
                rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
              })(
                <Cascader options={residences} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.design.style" />}>
              {getFieldDecorator('designStyle', {
                rules: [
                  {
                    required: true,
                    message: '请选择设计风格',
                  },
                ],
              })(
                <Select onChange={this.handleSelectorChange}>
                  <Option value="美式乡村风格">美式乡村风格</Option>
                  <Option value="古典欧式风格">古典欧式风格</Option>
                  <Option value="地中海式风格">地中海式风格</Option>
                  <Option value="东南亚风格">东南亚风格</Option>
                  <Option value="日式风格">日式风格</Option>
                  <Option value="新古典风格">新古典风格</Option>
                  <Option value="新古典风格">现代简约风格</Option>
                  <Option value="新中式风格">新中式风格</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.design.pictures.label" />}>
              {getFieldDecorator('uploadDesignPictures', {
                rules: [
                  {
                    required: false,
                    message: '请上传作品图集',
                  },
                ]
              })(
                <CropPicture count={20} ratio={16/9} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.design.brief" />}>
              {getFieldDecorator('brief', {
                rules: [
                  {
                    required: false,
                    message: formatMessage({ id: 'validation.design.brief.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'form.design.brief.placeholder' })}
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
            </FormItem>

          </Form>
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
