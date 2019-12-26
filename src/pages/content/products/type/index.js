import React, { Component } from 'react';
import {
  Card,
  Select,
  Form,
  Icon,
  Input,
  Button,
  Table,
  Badge,
  InputNumber,
  TreeSelect,
  DatePicker,
  Modal,
  message,
} from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import common from '../../../all.less';
const { Option } = Select;
import BasicTable from '../../../../components/BasicTable';
const { TreeNode } = TreeSelect;
const { RangePicker } = DatePicker;

@Form.create()
export default class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIdArr: [],
      currentPage: 1,
      pageSize: 10,
      total: 100,
      visible: false,
    };
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  //更改标题及排序
  handleChangeTitle = (id, oldVal, type, e) => {
    if (oldVal == e.target.value) {
      return false;
    } else {
      //标题修改
      if (type === 'title') {
        console.log('标题修改');
        console.log(e.target.value);
        console.log(id);
      }
      //排序修改
      if (type === 'order') {
        console.log('排序修改');
        console.log(e.target.value);
        console.log(id);
      }
    }
  };

  //删除选中产品
  handleEdit = () => {
    console.log(this.state.selectIdArr);
  };

  //获取表格选中的
  getChildRowKeys = val => {
    this.setState({
      selectIdArr: val,
    });
  };

  //移动选中分类
  handleMove = () => {
    if (this.state.selectIdArr && this.state.selectIdArr.length > 0) {
      this.setState({
        visible: true,
      });
    } else {
      message.error('请选择的分类或文章');
    }
  };

  render() {
    const data = [
      {
        key: 1,
        id: 1,
        users: 'fan',
        name: '文章一',
        type: '类别一',
        status: 1,
        keywords: 1,
        description: 1,
        content: 1,
        image: 'https://s2.ax1x.com/2019/11/11/MlNYA1.png',
        sortnum: 1,
        time: '2019-11-10 20:50:45',
      },
      {
        key: 2,
        id: 2,
        users: 'fan',
        name: '文章一',
        type: '类别二',
        status: 0,
        keywords: 1,
        description: 1,
        content: 1,
        image: 'https://s2.ax1x.com/2019/11/11/MlNYA1.png',
        sortnum: 2,
        time: '2019-11-10 20:50:45',
      },
      {
        key: 3,
        id: 3,
        users: 'fan',
        name: '文章一',
        type: '类别三',
        status: 1,
        keywords: 1,
        description: 1,
        content: 1,
        image: 'https://s2.ax1x.com/2019/11/11/MlNYA1.png',
        sortnum: 3,
        time: '2019-11-10 20:50:45',
      },
      {
        key: 4,
        id: 4,
        users: 'fan',
        name: '文章一',
        type: '类别四',
        age: 32,
        status: 0,
        keywords: 1,
        description: 1,
        content: 1,
        image: 'https://s2.ax1x.com/2019/11/11/MlNYA1.png',
        sortnum: 4,
        time: '2019-11-10 20:50:45',
      },
    ];

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return (
      <PageHeaderWrapper>
        <div className={common.formCard}>
          <Card>
            {/* 编辑 */}
            <div className={common.tableWrap}>
              <div className={common.editBtn}>
                <Button
                  className={common.reseachBtn}
                  type="primary"
                  icon="appstore"
                  onClick={() => {
                    router.push('/content/products/type');
                  }}
                >
                  添加分类
                </Button>
                <Button
                  className={common.reseachBtn}
                  type="primary"
                  icon="appstore"
                  onClick={this.handleMove.bind(this)}
                >
                  移动选中分类
                </Button>
                <Button
                  className={common.reseachBtn}
                  type=""
                  icon="delete"
                  onClick={this.handleEdit.bind(this)}
                >
                  删除选中分类
                </Button>
              </div>
              <BasicTable data={data} handlePropsRowKeys={this.getChildRowKeys.bind(this)} />
            </div>
          </Card>

          {/* 弹窗 */}
          <Modal
            title="移动"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={() => {
              this.setState({ visible: false });
            }}
          >
            <Form className="login-form" {...formItemLayout}>
              <Form.Item label="目标分类">
                {getFieldDecorator('typeArr', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                  initialValue: [],
                })(
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    multiple
                    treeDefaultExpandAll
                    onChange={this.onChange}
                  >
                    <TreeNode value="parent 1" title="parent 1" key="0-1">
                      <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                        <TreeNode value="leaf1" title="my leaf" key="random" />
                        <TreeNode value="leaf2" title="your leaf" key="random1" />
                      </TreeNode>
                      <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                        <TreeNode
                          value="sss"
                          title={<b style={{ color: '#08c' }}>sss</b>}
                          key="random3"
                        />
                      </TreeNode>
                    </TreeNode>
                  </TreeSelect>,
                )}
              </Form.Item>
              <Form.Item label="列表ID">
                {getFieldDecorator('idArr', {
                  rules: [{ required: true, message: '不能为空' }],
                  initialValue: [],
                })(<Input placeholder="Password" />)}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
}
