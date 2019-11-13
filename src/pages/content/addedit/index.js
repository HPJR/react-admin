import React,{Component} from 'react';
import { Card, Button, Alert, Icon } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Ueditor from '../../../components/UEditor';

export default class Addedit extends Component{
  constructor(props) {
    super(props)
    this.state = {
      initData: ''
    }
  }

  // 富文本编辑器 保存
  saveEditor = () => {
    console.log(this.refs.ueditor.getUEContent())
  }


  render(){
    return(
      <PageHeaderWrapper>
        <Card>
          <Ueditor id={'myeditor'}/>
          {/* 使用UEditor 组件 */}
          {/* <Ueditor value={formData.content} id="content" height="200" disabled={!this.props.canEdit}/>  */}
          {/* <UEditor ref="ueditor" initData={this.state.initData} /> */}
          <Button type="primary" onClick={this.saveEditor}>
            保存
          </Button>
        </Card>
      </PageHeaderWrapper>
    )
  }
}
