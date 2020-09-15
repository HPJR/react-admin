import React, { Component } from 'react';
import { Card, Button, Form, Icon } from 'antd';
import { getguid } from '@/utils/utils';
import InputTwo from './InputTwo';
import styles from './index.less';

@Form.create()
class InputArray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
    };
  }

  // 新增规格
  add = () => {
    let id = getguid();
    let { keys } = this.state;
    keys.push({
      id: id,
      name: '',
      number: '',
    });
    this.setState({
      keys,
    });
  };

  // 删除
  remove = k => {
    let { keys } = this.state;
    const that = this;
    const { onChange } = this.props;
    // if (keys.length === 1) {
    //   return;
    // }
    console.log(keys.filter(item => item.id !== k.id));
    this.setState(
      {
        keys: keys.filter(item => item.id !== k.id),
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

  // 传值给props
  handleChange = (val, index) => {
    let { keys } = this.state;
    const { onChange } = this.props;
    keys[index]['name'] = val.name;
    keys[index]['number'] = val.number;
    if (onChange) {
      onChange({
        keys,
      });
    }
  };

  render() {
    let { keys } = this.state;
    const formItems = keys.map((item, index) => (
      <div key={item.id} className={styles.InputTwoWrap}>
        <InputTwo
          onChange={value => {
            this.handleChange(value, index);
          }}
          values={this.props.value[index]}
        />
        {keys.length >= 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(item)}
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
              新增字段
            </Button>
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default InputArray;
