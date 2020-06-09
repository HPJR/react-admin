import React, { Component } from 'react';
import { Card, Button, Form, Icon } from 'antd';
import InputTwo from './InputTwo';
import styles from './index.less';

let id = 0;

@Form.create()
class InputArray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
    };
  }

  add = () => {
    let { keys } = this.state;
    keys.push({
      names: '',
      number: '',
    });
    this.setState({
      keys,
    });
  };

  remove = k => {
    let { keys } = this.state;
    const that = this;
    const { onChange } = this.props;
    if (keys.length === 1) {
      return;
    }
    this.setState(
      {
        keys: keys.filter(key => key !== k),
      },
      () => {
        if (onChange) {
          onChange({
            ...that.state.keys,
          });
        }
      },
    );
  };

  handleChange = (val, index) => {
    let { keys } = this.state;
    const { onChange } = this.props;
    keys[index] = val;
    if (onChange) {
      onChange({
        ...keys,
      });
    }
  };

  render() {
    let { keys } = this.state;
    const formItems = keys.map((val, index) => (
      <div className={styles.InputTwoWrap}>
        <InputTwo
          onChange={value => {
            this.handleChange(value, index);
          }}
          key={val}
          values={this.props.value[index]}
        />
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(val)}
          />
        ) : null}
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
