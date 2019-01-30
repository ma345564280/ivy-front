import { Upload, Icon, Modal, Button, message, Row, Col, Form, Input} from 'antd';
import React  from 'react';
import Cropper from 'react-cropper';
import lrz from 'lrz';
import { connect } from 'dva';
import '../../../node_modules/cropperjs/dist/cropper.css'; // 需要找到相对的 node_modules 路径，必须引入该css文件！


const { FormItem } = Form;
@connect(({ cropper, loading}) => ({
  cropper,
  shareLoading: loading.effects['cropper/uploadCropImage'],
}))
class CropPicture extends React.Component {
  constructor(props) {
    super(props);
    this.cropper = '';

  }

  state = {
    fileList: [],
    srcCropper: '',
    previewImage: '',
    selectImgName: '',
    selectImgSize: '0',
    selectImgSuffix: '',
    editImageModalVisible: false,
    desc: '',
  }

  // Upload上传之前函数
  beforeUpload = (file) => {
    const reader= new FileReader();

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) { // 添加文件限制
      message.error({content: '文件大小不能超过10M'});
      return false;
    }
    reader.readAsDataURL(file); // 开始读取文件
    // 因为读取文件需要时间,所以要在回调函数中使用读取的结果
    reader.onload = (e) => {
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
  saveImg = () => {
    // lrz压缩
    // this.refs.cropper.getCroppedCanvas().toDataURL() 为裁剪框的base64的值
    lrz(this.refs.cropper.getCroppedCanvas().toDataURL(), {quality: 0.8}).then((results)=> {
      // results为压缩后的结果
      this.uploadImgByBase64({ // uploadImgByBase64为连接后台的接口
        imgbase: results.base64, // 取base64的值传值
        imgsize: results.fileLen, // 压缩后的图片大下
        suffix: this.state.selectImgSuffix, // 文件类型
        filename: this.state.selectImgName, // 文件名
        description: this.state.desc,
        fileUrl: ''
      })
    })
  }

  descChange = (event)=> {
    // console.log(event.target.value);
    // const desc = event.target.value;
    this.setState({desc : event.target.value});
  }


  uploadImgByBase64 = async(payload) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'cropper/uploadCropImage',
      payload,
    });
    const {cropper} = this.props;

    const {fileList} = this.state;
    // const { fileList } = this.state;
    const { fileUrl, description} = cropper;
    console.log(cropper);
    fileList.push({fileUrl, description, imgbase: payload.imgbase});

    this.setState({desc : '', editImageModalVisible: false, fileList });
    this.triggerChange({ fileList });
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    console.log(changedValue);

    const files = [];
    if(changedValue) {
      for(let i = 0; i < changedValue.fileList.length; i += 1) {
        files.push({fileUrl: changedValue.fileList[i].fileUrl, description: changedValue.fileList[i].description})
      }
    }

    if (onChange) {
      // console.log('onchange')
      onChange(files);
    }
  }

  handleCancel = () => { this.setState({ previewVisible: false, editImageModalVisible: false, selectImgName: "" }) }

  imageDelete = (e) => {
    console.log(e.target.value)
    const { fileList} = this.state;
    fileList.splice(e.target.value, 1);
    this.setState({fileList});
    this.triggerChange({ fileList});
  }

  render() {

    const { editImageModalVisible, srcCropper, fileList } = this.state;
    const { loading } = this.props;

    // loopImg遍历回显的图片
    const loopImg = (data = []) => ((data==null || data.length === 0) ? null : data.map((item, index) => (
      <div className="container" style={{display:'inline-block', position: 'relative', padding:8, width:96, height:96, margin: '0 0px 0px 0'}}>
        <img src={item.imgbase} alt="" style={{height: '100%', width:'100%', border : 0, borderRadius : 3}} />
        <div className="layer">
          <div className="icon" style={{textAlign: 'center'}} >
            <Button  shape="circle" size="small" icon="delete" value={index} onClick={this.imageDelete} />
          </div>
        </div>
      </div>
      )));


    const uploadButton = (
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    );

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
    };

    const {count, ratio} = this.props;

    return (


      <div >

        <Row>
          {/* antd上传组件 */}
          <Upload
            beforeUpload={this.beforeUpload} // 阻止自动上传
            showUploadList={false}
            name="avatar"
            listType="picture"
          >
            {fileList.length >= count ? null : uploadButton}
          </Upload>
        </Row>
        {
          // this.props.getImgListResult.data为已经上传的图片数据
          fileList.length > 0 ?
            <Row>
              <Col span={24}>
                {
                  // 回显已经上传过的图片
                  loopImg(fileList)
                }
              </Col>
            </Row>
            : <Row />
        }

        {/* 弹窗裁剪图片 */}
        <Modal
          key="cropper_img_modal_key"
          visible={editImageModalVisible}
          loading={loading}
          onCancel={this.handleCancel}
          onOk={this.saveImg}
          // closable={false}
          title="Cropper"
        >
          <Form  layout="horizontal">
            <Form.Item {...formItemLayout} label="上传图片">
              <Cropper
                src={srcCropper} // 图片路径，即是base64的值，在Upload上传的时候获取到的
                ref="cropper"
                style={{ height: 400 }}
                preview='.cropper-preview'
                className="company-logo-cropper"
                viewMode={1} // 定义cropper的视图模式
                zoomable={false} // 是否允许放大图像
                aspectRatio={ratio} // image的纵横比
                guides // 显示在裁剪框上方的虚线
                background={false} // 是否显示背景的马赛克
                rotatable={false}
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="图片描述">
              <Input onChange={this.descChange} value={this.state.desc} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default CropPicture;
