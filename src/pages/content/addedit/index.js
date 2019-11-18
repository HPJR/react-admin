import React, { Component } from 'react';
import { Card, Button, Alert,Form, DatePicker, TimePicker,TreeSelect} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Ueditor from '../../../components/UEditor';
import styles from './index.less';

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
    };
  }

  componentDidMount(){
  
  }

  // 富文本编辑器 保存
  hanldeChage = value => {
    var content = UE.getEditor('content').getContent();
    console.log(content);
  };

  //分类选择
  

  render() {
    const title ={
      'article':{'add':'文章新增','edit':'文章编辑'},
      'goods':{'add':'产品新增','edit':'产品编辑'},
      'single':{'add':'单页新增','edit':'单页编辑'},
    };

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };
    //验证规则
    const config = {
      rules: [{ type: 'array', required: true, message: '请选择分类' }],
    };
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };
    return (
      <PageHeaderWrapper title={title.article.add}>
        <Card className={styles.editWrap}>
        <Form {...formItemLayout}>
            <Form.Item label="产品类别">
              {getFieldDecorator('typeValue', config)(
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
                  <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                      <TreeNode value="leaf1" title="my leaf" key="random" />
                      <TreeNode value="leaf2" title="your leaf" key="random1" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                      <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              )}
            </Form.Item>
            <Form.Item label="产品名称">
              {getFieldDecorator('month-picker', config)(<MonthPicker />)}
            </Form.Item>
            <Form.Item label="产品图片">
              {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
            </Form.Item>
            <Form.Item label="编辑时间">
              {getFieldDecorator('range-time-picker', rangeConfig)(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
              )}
            </Form.Item>
            <Form.Item label="关键词">
              {getFieldDecorator('time-picker', config)(<TimePicker />)}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('time-picker', config)(<TimePicker />)}
            </Form.Item>
            <div className={styles.UEditorFormWrap}>
              <div className={styles.UEditorTitle}>
                产品内容：
              </div>
              <Ueditor id={'content'} propsHeight={300} className={styles.Ueditor} />
            </div> 
            <Form.Item
              wrapperCol={{
                labelCol: {
                  xs: { span: 24 },
                  sm: { span: 3 },
                },
                wrapperCol: {
                  xs: { span: 24 },
                  sm: { span: 21 },
                },
              }}
            >
              <Button type="primary" onClick={this.hanldeChage} htmlType="submit">
                保存
              </Button>
              <Button type="primary" onClick={this.hanldeChage} htmlType="submit">
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
