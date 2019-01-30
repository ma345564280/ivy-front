import { Upload, Icon, Modal } from 'antd';
import React  from 'react';

class PicturesWall extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      fileList: value.fileList || [],
    };
  }

  state = {
    previewVisible: false,
    previewImage: '',
  }


  handleCancel = () => {
    this.setState({ previewVisible: false })
  }

  handlePreview = (file) => {
    // console.log(file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
    // console.log(this.state);

  }

  handleChange = ({ fileList }) => {

    this.setState({ fileList })

    this.triggerChange({ fileList });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    // console.log(this.state, changedValue)

    const onChange = this.props.onChange;

    const fileUrlList = [];
    // console.log(changedValue)
    if(changedValue.fileList) {
      for(let i = 0; i < changedValue.fileList.length; i += 1) {
        if(changedValue.fileList[i].response) {
          if(changedValue.fileList[i].response.code === 200) {
            if(changedValue.fileList[i].response.data) {
              fileUrlList.push(changedValue.fileList[i].response.data[0]);
            }
          }
        }
      }
    }

    if (onChange) {
      // console.log('onchange')
      onChange(fileUrlList);
    }
  }

  render() {
    const state = this.state;
    const {count, actionUrl} = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          // action="/ivy-root/file/design/uploadPicture"
          action={actionUrl}
          listType="picture-card"
          fileList={state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {state.fileList.length >= count ? null : uploadButton}
        </Upload>
        <Modal visible={state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
