import React, { Component } from 'react';
import { Card, Button, Alert, Icon } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Ueditor from '../../../components/UEditor';
import styles from './index.less';

export default class Addedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //编辑、新增
      editData: this.props.editType === 'add' ? '' : this.props.editType,
    };
  }

  // 富文本编辑器 保存
  hanldeChage = value => {
    var content = UE.getEditor('content').getContent();

    // console.log('RcUeditor', value);
    console.log(content);
  };

  render() {
    return (
      <PageHeaderWrapper title="">
        <Card>
          <Ueditor id={'content'} className={styles.Ueditor} />
          <Button type="primary" onClick={this.hanldeChage}>
            保存
          </Button>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
