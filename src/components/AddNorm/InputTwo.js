import React, { Component } from 'react';
import { Form, Input } from 'antd';
import styles from './index.less';

@Form.create()
class InputTwo extends Component {
  static getDerivedStateFromProps(nextProps) {
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
      name: value.name || '',
      number: value.number || '',
    };
  }

  handleNameChange = e => {
    let name = e.target.value || '';
    if (!('value' in this.props)) {
      this.setState({ name });
    }
    this.triggerChange({ name });
  };

  handleNumberChange = e => {
    let number = e.target.value || '';
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
    }
  };

  render() {
    return (
      <div>
        <Input
          placeholder="规格名称：例如尺寸，重量等"
          defaultValue={this.props.values ? this.props.values.name : ''}
          onChange={this.handleNameChange}
          className={styles.normInput}
        />
        <Input
          placeholder="规格值"
          defaultValue={this.props.values ? this.props.values.name : ''}
          onChange={this.handleNumberChange}
          className={styles.normInput}
        />
      </div>
    );
  }
}

export default InputTwo;
