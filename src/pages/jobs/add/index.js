import React, { Component } from 'react';
import {
  Card,
  Button,
  Form,
  DatePicker,
  TimePicker,
  TreeSelect,
  InputNumber,
  Icon,
  Spin,
  Input,
  message,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import InputArray from '@/components/AddNorm';
import moment from 'moment';
import Ueditor from '@/components/UEditor';
import styles from './index.less';
import router from 'umi/router';

const { TextArea } = Input;

const { TreeNode } = TreeSelect;
const { MonthPicker, RangePicker } = DatePicker;

import { connect } from 'dva';
@connect(({ jobs, loading }) => ({
  jobs,
  loading: loading.models.jobs,
}))
@Form.create()
export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //编辑、新增
      editData: this.props.editType === 'add' ? '' : this.props.editType,
      loading: false,
    };
  }

  componentDidMount() {}

  //保存
  addJobs = params => {
    params ? params : '';
    const { dispatch } = this.props;
    this.setState({
      loading: true,
    });
    dispatch({
      type: 'jobs/addJob',
      payload: params,
      callBack: res => {
        if (res.result) {
          this.setState(
            {
              loading: false,
            },
            () => {
              message.success('保存成功');
              setTimeout(() => {
                router.push('/jobs/list');
              }, 600);
            },
          );
        } else {
          message.error(res.error);
        }
      },
    });
  };

  //表单提交
  hanldeGetContent = value => {
    let content = UE.getEditor('content').getContent();
    this.props.form.validateFields((err, values) => {
      values.content = content;
      values.time = moment(values.time).format('YYYY/MM/DD HH:mm:ss');
      if (!err) {
        this.addJobs(values);
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
      article: { add: '新增招聘', edit: '编辑招聘' },
    };

    const { getFieldDecorator } = this.props.form;

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
        <Spin spinning={this.state.loading}>
          <Card className={styles.editWrap}>
            <Form {...formItemLayout} loading={this.props.loading}>
              <Form.Item label="招聘岗位">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请填写名称' }],
                  initialValue: '',
                })(<Input placeholder="招聘岗位" />)}
              </Form.Item>
              <Form.Item label="招聘人数">
                {getFieldDecorator('number', {
                  rules: [{ required: true, message: '请填写招聘人数' }],
                  initialValue: 1,
                })(<InputNumber min={1} />)}
              </Form.Item>
              <Form.Item label="结束日期">
                {getFieldDecorator('time', {
                  rules: [{ required: true, message: '请填写结束日期' }],
                  initialValue: moment(new Date()),
                })(
                  <DatePicker
                    showTime
                    placeholder="选择时间"
                    format="YYYY/MM/DD HH:mm:ss"
                  ></DatePicker>,
                )}
              </Form.Item>
              <Form.Item label="工资待遇">
                {getFieldDecorator('money', {
                  rules: [{ required: true, message: '请填写工资待遇' }],
                  initialValue: '',
                })(<Input placeholder="工资待遇" />)}
              </Form.Item>
              <div className={styles.UEditorFormWrap}>
                <div className={styles.UEditorTitle}>职位信息:</div>
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
        </Spin>
      </PageHeaderWrapper>
    );
  }
}
