import React, { Component } from 'react';
import {
  Card,
  Button,
  Form,
  DatePicker,
  TimePicker,
  TreeSelect,
  Upload,
  Icon,
  Modal,
  Input,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import InputArray from '../../../components/AddNorm';
import moment from 'moment';
import Ueditor from '../../../components/UEditor';
import styles from './index.less';

const { TextArea } = Input;

const { TreeNode } = TreeSelect;
const { MonthPicker, RangePicker } = DatePicker;

@Form.create()
export default class Addedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //编辑、新增
      editData: this.props.editType === 'add' ? '' : this.props.editType,
      //分类
      typeArrValue: undefined,
      //上传
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],
    };
  }

  componentDidMount() {}

  // 富文本编辑器 保存
  hanldeGetContent = value => {
    var content = UE.getEditor('content').getContent();
    console.log(content);
  };

  //分类选择

  //图片上传
  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  //取消
  handleCancel = () => {
    this.setState({ previewVisible: false });
  };
  //
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  //
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  //获取时间
  handleGetTime = value => {
    console.log('onOk: ', value);
  };

  render() {
    const title = {
      article: { add: '文章新增', edit: '文章编辑' },
      goods: { add: '产品新增', edit: '产品编辑' },
      single: { add: '单页新增', edit: '单页编辑' },
    };

    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        xxl: { span: 8 },
        xl: { span: 8 },
      },
    };
    //验证规则
    const config = {
      rules: [{ type: 'array', required: true, message: '请选择分类' }],
    };

    return (
      <PageHeaderWrapper title={title.article.add}>
        <Card className={styles.editWrap}>
          <Form {...formItemLayout}>
            <Form.Item label="产品类别">
              {getFieldDecorator(
                'typeValue',
                config,
              )(
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  value={this.state.typeArrValue}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="分类"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                >
                  <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1" disabled>
                    <TreeNode value="leaf1" title="my leaf" key="random" />
                    <TreeNode value="leaf2" title="your leaf" key="random1" />
                  </TreeNode>
                  <TreeNode value="parent 1-1" title="parent 1-1" key="random2" disabled>
                    <TreeNode
                      value="sss"
                      title={<b style={{ color: '#08c' }}>sss</b>}
                      key="random3"
                    />
                  </TreeNode>
                </TreeSelect>,
              )}
            </Form.Item>
            <Form.Item label="产品名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写名称' }],
              })(<Input placeholder="产品名称" />)}
            </Form.Item>
            <Form.Item label="产品图片" wrapperCol={{ span: '21' }}>
              {getFieldDecorator('imgArr')(
                <div>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 6 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>,
              )}
            </Form.Item>
            <Form.Item label="规格">
              {getFieldDecorator('norm')(
                <InputArray />,
                // <div className={styles.normWrap}>
                //   <div className={styles.normList}>
                //     <Input placeholder='规格名称：例如尺寸，重量等' className={styles.normInput} />
                //     <Input placeholder='规格值' className={styles.normInput} />
                //     <Icon
                //       className="dynamic-delete-button"
                //       type="minus-circle-o"
                //     // onClick={() => this.remove(k)}
                //     />
                //   </div>
                //   <Button type='primary' className={styles.addNormBtn}>
                //     <Icon type="plus" />
                //     新增规格</Button>
                // </div>
              )}
            </Form.Item>
            <Form.Item label="编辑时间">
              {getFieldDecorator('time', {
                initialValue: moment(new Date()),
              })(
                <DatePicker
                  showTime
                  placeholder="选择时间"
                  format="YYYY/MM/DD HH:mm:ss"
                  onOk={this.handleGetTime}
                ></DatePicker>,
              )}
            </Form.Item>
            <Form.Item label="关键词">
              {getFieldDecorator('keywords')(<Input placeholder="请填写你的关键词" />)}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('description')(<TextArea rows={4} placeholder="请填写你的描述" />)}
            </Form.Item>
            <div className={styles.UEditorFormWrap}>
              <div className={styles.UEditorTitle}>产品内容：</div>
              <div className={styles.UEditorWrap}>
                <Ueditor id={'content'} propsHeight={300} className={styles.Ueditor} />
              </div>
            </div>
            <Form.Item
              wrapperCol={{
                wrapperCol: {
                  xs: { span: 24 },
                  sm: { span: 24 },
                },
              }}
            >
              <div className={styles.btnSub}>
                <Button
                  type="primary"
                  onClick={this.hanldeGetContent}
                  className={styles.btnSubList}
                  htmlType="submit"
                >
                  保存
                </Button>
                <Button
                  type="default"
                  onClick={this.hanldeGetContent}
                  className={styles.btnSubList}
                  htmlType="submit"
                >
                  重置
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
