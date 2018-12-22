import React  from 'react';
import Cropper from 'react-cropper';
import lrz from 'lrz'
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
  Upload,
  Icon,
  Modal,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import '../../../node_modules/cropperjs/dist/cropper.css'; // 需要找到相对的 node_modules 路径，必须引入该css文件！

const FormItem = Form.Item;
const { Option } = Select;
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

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends React.Component {
  constructor(props) {
    super(props);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.saveImg = this.saveImg.bind(this);
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    srcCropper: '',
    selectImgName: '',
    selectImgSuffix: '',
    editImageModalVisible: false,
  };



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

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })


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

  handleHeadPicture = (e) => {

    if (Array.isArray(e)) {
      return e.fileList;
    }
    return e.fileList;
  }

  handlePictures = (e) => {
    if (Array.isArray(e)) {
      return e.fileList;
    }
    return e.fileList;
  }

  handleCropperCancel = () => {
    this.setState({ editImageModalVisible: false, selectImgName: ""}) }

  // Upload上传之前函数
  beforeUpload(file) {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) { // 添加文件限制
      // MsgBox.error({content: '文件大小不能超过10M'});
      return false;
    }
    const reader=new FileReader();
    reader.readAsDataURL(file); // 开始读取文件
    // console.log(file)
    // 因为读取文件需要时间,所以要在回调函数中使用读取的结果
    reader.onload = (e) => {
      console.log(e.target.result);
      this.setState({
        srcCropper: e.target.result, // cropper的图片路径
        selectImgName: file.name, // 文件名称
        selectImgSize: (file.size / 1024 / 1024), // 文件大小
        selectImgSuffix: file.type.split("/")[1], // 文件类型
        editImageModalVisible: true, // 打开控制裁剪弹窗的变量，为true即弹窗
      })
    }
    return false;
  }

  // 点击保存的函数，需要在这里进行压缩
  saveImg() {
    const {selectImgSuffix, selectImgName} = this.state;
    // lrz压缩
    // this.refs.cropper.getCroppedCanvas().toDataURL() 为裁剪框的base64的值
    lrz(this.refs.cropper.getCroppedCanvas().toDataURL(), {quality: 0.6}).then((results)=> {
      // results为压缩后的结果
      console.log(results);
      this.props.uploadImgByBase64({ // uploadImgByBase64为连接后台的接口
        imgbase: results.base64, // 取base64的值传值
        imgsize: results.fileLen, // 压缩后的图片大下
        suffix: selectImgSuffix, // 文件类型
        filename: selectImgName, // 文件名
      })
    })
  }


  render() {
    const { previewVisible, previewImage, fileList, editImageModalVisible, srcCropper, } = this.state;
    const { submitting, loading } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
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

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        // content={<FormattedMessage id="app.forms.basic.description" />}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.title.label" />}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: false,
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
                    message: '请选择价格区间',
                  },
                ],
              })(
                <Select onChange={this.handleSelectorChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.design.Cover.picture.label" />}>
              {getFieldDecorator('uploadHeadPicture', {
                getValueFromEvent: this.handleHeadPicture,
                rules: [
                  {
                    required: true,
                    message: '请上传封面',
                  },
                ],
              })(
                <Upload
                  name="file"
                  action="/ivy-root/file/design/uploadPicture"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  beforeUpload={this.beforeUpload} // 阻止自动上传
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
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
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
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
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.design.pictures.label" />}>
              {getFieldDecorator('uploadDesignPictures', {
                valuePropName: 'fileList',
                getValueFromEvent: this.handlePictures,
              })(
                <Upload name="file" action="/ivy-root/file/design/uploadPicture" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="form.design.brief" />}>
              {getFieldDecorator('brief', {
                rules: [
                  {
                    required: true,
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

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>

        <Modal
          key="cropper_img_modal_key"
          visible={editImageModalVisible}
          loading={loading}
          footer={[
            <Button
              type="primary"
              onClick={this.saveImg}
              loading={loading}
            >
              保存
            </Button>,
            <Button
              onClick={this.handleCropperCancel}
              loading={loading}
            >
              取消
            </Button>
          ]}
        >
          <Cropper
            src={srcCropper} // 图片路径，即是base64的值，在Upload上传的时候获取到的
            ref="cropper"
            style={{ height: 600 }}
            preview='.cropper-preview'
            className="company-logo-cropper"
            viewMode={1} // 定义cropper的视图模式
            zoomable={false} // 是否允许放大图像
            aspectRatio={3/4} // image的纵横比
            guides // 显示在裁剪框上方的虚线
            background={false} // 是否显示背景的马赛克
            rotatable // 是否旋转
          />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
