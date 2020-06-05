import React, { Component } from 'react';
import { Card, Button, Form, Icon } from 'antd';
import InputTwo from './InputTwo';
import styles from './index.less';

let id = 0;

@Form.create()
class InputArray extends Component {
  constructor(props) {
    super(props);
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
    console.log(keys);
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  handleChange = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { names } = values;
        // debugger;
        const { onChange } = this.props;
        if (onChange) {
          onChange({
            ...names,
          });
        }
      }
    });
  };

  render() {
    // console.log(this.props.value);
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: this.props.value ? this.props.value : [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <div>
        <Form.Item required={false} key={k}>
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(
            <InputTwo onChange={this.handleChange} key={index} values={this.props.value[index]} />,
          )}
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
          {formItems}
          <Form.Item>
            <Button type="primary" onClick={this.add} className={styles.addNormBtn}>
              <Icon type="plus" />
              新增规格
            </Button>
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default InputArray;
