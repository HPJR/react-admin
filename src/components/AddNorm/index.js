import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import InputTwo from './InputTwo';
import styles from './index.less';

let id = 0;

@Form.create()
class InputArray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inpuArr: [
        {
          name: '规格一',
          val: '15公分',
        },
        {
          name: '规格二',
          val: '4kg',
        },
      ],
    };
  }

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log(
          'Merged values:',
          keys.map(key => names[key]),
        );
      }
    });
  };

  render() {
    const { inpuArr } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, item) => (
      <div>
        <Form.Item required={false} key={k}>
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(<InputTwo />)}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>
      </div>
    ));

    return (
      <div className="input-array-component">
        <div className={styles.normWrap}>
          <Form onSubmit={this.handleSubmit}>
            {formItems}
            <Form.Item>
              <Button type="primary" onClick={this.add} className={styles.addNormBtn}>
                <Icon type="plus" />
                新增规格
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default InputArray;
