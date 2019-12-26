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
} from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import common from './../../all.less';
const { Option } = Select;
import BasicTable from '../../../components/BasicTable';
const { TreeNode } = TreeSelect;
const { RangePicker } = DatePicker;

@Form.create()
export default class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 40,
      selectIdArr: [],
      currentPage: 1,
      pageSize: 10,
      total: 100,
    };
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  //提交搜索
  handleSubmit = e => {
    const { startTime, endTime } = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.startTime = startTime;
        values.endTime = endTime;
        console.log(values);
      }
    });
  };

  //重置
  handleReset = () => {
    this.props.form.resetFields();
  };

  //更改图片尺寸
  onChangeImgWidth = value => {
    value > 100 || value < 40 ? (value = 40) : value;
    console.log(value);
    this.setState({
      imgWidth: value,
    });
  };

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

  //日期筛选
  pickerOnChange = (dates, dateStrings) => {
    const [startTime, endTime] = dateStrings;
    this.setState({
      startTime: startTime,
      endTime: endTime,
    });
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

    //获取搜索表单信息
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <PageHeaderWrapper>
        <div className={common.formCard}>
          <Card>
            {/* 表单搜索 */}
            <Form layout="inline" onSubmit={this.handleSubmit} className={common.searchForm}>
              <Form.Item label="分类">
                {getFieldDecorator('typeValue', {
                  // rules: [{ type: 'array', required: true, message: '请选择分类' }],
                  initialValue: [],
                })(
                  <TreeSelect
                    showSearch
                    style={{ width: 150 }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="分类"
                    allowClear
                    treeDefaultExpandAll
                  >
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
                  </TreeSelect>,
                )}
              </Form.Item>
              <Form.Item label="关键字">
                {getFieldDecorator('keywords', {
                  rules: [
                    {
                      equired: true,
                      message: '请输入关键字...',
                    },
                  ],
                })(<Input allowClear style={{ width: 150 }} placeholder="请输入关键字..." />)}
              </Form.Item>
              <Form.Item label="时间">
                {getFieldDecorator('time', {
                  initialValue: '',
                })(
                  <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: 200 }}
                    onChange={this.pickerOnChange}
                  />,
                )}
              </Form.Item>
              <Form.Item label="状态">
                {getFieldDecorator('stauts', {
                  initialValue: '',
                })(
                  <Select style={{ width: 80 }}>
                    <Option value="">全部</Option>
                    <Option value={1}>显示</Option>
                    <Option value={0}>隐藏</Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item>
                <Button className={common.reseachBtn} type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button className={common.reseachBtn} onClick={this.handleReset}>
                  重置
                </Button>
              </Form.Item>
            </Form>
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
                  管理分类
                </Button>
                <Button
                  className={common.reseachBtn}
                  type="primary"
                  icon="plus"
                  onClick={() => {
                    router.push('/content/single/add');
                  }}
                >
                  新增产品
                </Button>
                <Button
                  className={common.reseachBtn}
                  type="primary"
                  icon="plus"
                  onClick={() => {
                    router.push('/content/single/add');
                  }}
                >
                  批量增加
                </Button>
                <Button
                  className={common.reseachBtn}
                  type=""
                  icon="delete"
                  onClick={this.handleEdit.bind(this, this.state.selectIdArr, 'del')}
                >
                  删除选中产品
                </Button>
              </div>
              <BasicTable data={data} handlePropsRowKeys={this.getChildRowKeys.bind(this)} />
            </div>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}
