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
import InputArray from '@/components/AddNorm';
import moment from 'moment';
import Ueditor from '@/components/UEditor';
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
      fileList: [],
    };
  }

  componentDidMount() {}

  /* 图片上传开始 */
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
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  //设置上传后图片路径数组
  handleChange = ({ fileList }) => {
    this.props.form.setFieldsValue({
      fileList: fileList,
    });
    this.setState({ fileList });
  };

  /* 图片上传结束 */

  //保存
  hanldeGetContent = value => {
    let content = UE.getEditor('content').getContent();
    this.props.form.validateFields((err, values) => {
      values.content = content;
      values.time = moment(values.time).format('YYYY/MM/DD HH:mm:ss');
      if (!err) {
        console.log(values);
      }
    });
  };

  //重置
  handleReset = () => {
    UE.getEditor('content').setContent('');
    this.props.form.resetFields();
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

    return (
      <PageHeaderWrapper title={title.article.add}>
        <Card className={styles.editWrap}>
          <Form {...formItemLayout}>
            <Form.Item label="产品类别">
              {getFieldDecorator('typeValue', {
                rules: [{ type: 'array', required: true, message: '请选择分类' }],
                initialValue: [],
              })(
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
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
                initialValue: '',
              })(<Input placeholder="产品名称" />)}
            </Form.Item>
            <Form.Item label="产品图片">
              {getFieldDecorator('fileList', {
                initialValue: [],
              })(
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
              {getFieldDecorator('norm', {
                initialValue: [],
              })(<InputArray />)}
            </Form.Item>
            <Form.Item label="编辑时间">
              {getFieldDecorator('time', {
                initialValue: moment(new Date()),
              })(
                <DatePicker
                  showTime
                  placeholder="选择时间"
                  format="YYYY/MM/DD HH:mm:ss"
                ></DatePicker>,
              )}
            </Form.Item>
            <Form.Item label="关键词">
              {getFieldDecorator('keywords', {
                initialValue: '',
              })(<Input placeholder="请填写你的关键词" />)}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('description', {
                initialValue: '',
              })(<TextArea rows={4} placeholder="请填写你的描述" />)}
            </Form.Item>
            <div className={styles.UEditorFormWrap}>
              <div className={styles.UEditorTitle}>产品内容：</div>
              <div className={styles.UEditorWrap}>
                <Ueditor id={'content'} propsHeight={300} className={styles.Ueditor} />
              </div>
            </div>
            <Form.Item
              wrapperCol={{
                xs: { span: 24 },
                sm: { span: 24 },
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
                  onClick={this.handleReset}
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
