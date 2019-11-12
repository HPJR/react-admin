import React,{Component} from 'react';
import { Card, Select ,Form, Icon, Input, Button,Table,Badge,InputNumber  } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import common from './../../all.less';
const { Option } = Select;


@Form.create()
export default class Single extends Component{
  constructor(props){
    super(props);
    this.state = {
      imgWidth:40,
      selectIdArr:[],
      currentPage:1,
      pageSize:10,
      total:100
    };
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  //提交搜索
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
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
    value > 100 || value <40 ? value=40:value;
    console.log(value);
    this.setState({
      imgWidth:value
    })
  }

  //更改标题及排序
  handleChangeTitle = (id,oldVal,type,e) =>{
    if(oldVal == e.target.value){
      return false;
    }else{
      //标题修改
      if(type==='title'){
        console.log('标题修改');
        console.log(e.target.value);
        console.log(id);
      }
      //排序修改
      if(type==='order'){
        console.log('排序修改');
        console.log(e.target.value);
        console.log(id);
      }
    }
  }

  //删除/编辑
  handleEdit = (idArr,type,status,e) => {
    console.log(type);
    //多个删除
    if(!idArr && type === 'del'){
      console.log(this.state.selectIdArr)
    }
    //单个删除
    else if(idArr && type === 'del'){
      console.log(idArr)
    }
    //隐藏显示
    else if(type === 'toggle'){
      console.log(idArr);
      console.log(status);
    }
    //编辑
    else{
      console.log(idArr)
    }
  }


  render(){
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width:60
      },
      {
        title: '类别',
        dataIndex: 'type',
      },
      {
        title: '名称',
        width:250,
        render:(record)=>{
          return(
            <div>
              {
                <Input placeholder="标题" defaultValue={record.name} style={{border:0}} onBlur={this.handleChangeTitle.bind(this,record.id,record.name,'title')}/>
              }
            </div>
          )
        }
      },
      {
        title: '用户',
        dataIndex: 'users',
      },
      {
        title: ()=>{
          return(
            <div>
              <span>图片</span>
              <InputNumber size="small" style={{marginLeft:10,width:56}} min={40} max={100} defaultValue={this.state.imgWidth} onChange={this.onChangeImgWidth.bind(this)} />
            </div>
          )
        },
        render:(record)=>{
          return(
            <div style={{textAlign:"center"}}>
              {
                <img src={record.image} style={{width:this.state.imgWidth}}></img>
              }
            </div>
          )
        },
        width:110
      },
      {
        title: '排序',
        sorter: (a, b) => a.sortnum - b.sortnum,
        ellipsis: true,
        render:(record)=>{
          return(
            <div>
              {
                <Input defaultValue={record.sortnum}  style={{border:0}} onBlur={this.handleChangeTitle.bind(this,record.id,record.sortnum,'order')}/>
              }
            </div>
          )
        },
        width:60
      },
      {
        title: '添加时间',
        dataIndex: 'time',
      },
      {
        title: '状态',
        width:100,
        render:(record)=>{
          return(
            <div>
              {
                record.status === 0 ?
                <Badge status="error" text="隐藏" />
                :
                <Badge status="success" text="显示" />
              }
            </div>
          )
        }
      },
      {
        title: '操作',
        width:150,
        render:(record)=>{
          return(
            <div className={common.editTableIcon}>
              <div onClick={this.handleEdit.bind(this,record.id,'edit')}>
                <Icon type="edit" />
                <span>修改</span>
              </div>
              <div onClick={this.handleEdit.bind(this,record.id,'del')}>
                <Icon type="delete" />
                <span>删除</span>
              </div>
              <div onClick={this.handleEdit.bind(this,record.id,'toggle',record.status)}>
                 {record.status === 0 ?
                    <p>
                      <Icon type="eye" />
                      <span>隐藏</span>
                    </p>
                    :
                    <p>
                      <Icon type="eye" />
                      <span>显示</span>
                    </p>
                  }
               </div>
            </div>
          )
        }
      },
    ];

    const data = [
      {
        key: 1,
        id:1,
        users:'fan',
        name: '文章一',
        type:'类别一',
        status:1,
        keywords:1,
        description:1,
        content:1,
        image:'https://s2.ax1x.com/2019/11/11/MlNYA1.png',
        sortnum:1,
        time:"2019-11-10 20:50:45"
      },
      {
        key: 2,
        id:2,
        users:'fan',
        name: '文章一',
        type:'类别二',
        status:0,
        keywords:1,
        description:1,
        content:1,
        image:'https://s2.ax1x.com/2019/11/11/MlNYA1.png',
        sortnum:2,
        time:"2019-11-10 20:50:45"
      },
      {
        key:3,
        id:3,
        users:'fan',
        name: '文章一',
        type:'类别三',
        status:1,
        keywords:1,
        description:1,
        content:1,
        image:'https://s2.ax1x.com/2019/11/11/MlNYA1.png',
        sortnum:3,
        time:"2019-11-10 20:50:45"
      },
      {
        key:4,
        id:4,
        users:'fan',
        name: '文章一',
        type:'类别四',
        age: 32,
        status:0,
        keywords:1,
        description:1,
        content:1,
        image:'https://s2.ax1x.com/2019/11/11/MlNYA1.png',
        sortnum:4,
        time:"2019-11-10 20:50:45"
      },
    ];

    //获取搜索表单信息
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    //表格筛选
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectIdArr:selectedRowKeys
        })
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };

    //分页
    const pageData = {
      showSizeChanger:true,
      showQuickJumper:true,
      defaultCurrent:this.state.currentPage,
      pageSize:this.state.pageSize,
      total:this.state.total,
      onShowSizeChange:(page, pageSize)=>{
        this.setState({
          pageSize:pageSize
        },()=>{
          //重新请求
          const parmars = {
            current:1,
            pageSize:pageSize,
          }
        })
        console.log(pageSize);
      },
      onChange:(page, pageSize)=>{
        this.setState({
          current:page
        },()=>{
          //重新请求
        })
        console.log(page);
      } 
    }
    return(
      <PageHeaderWrapper>
        <div className={common.formCard}>
          <Card>
            {/* 表单搜索 */}
            <Form layout="inline" onSubmit={this.handleSubmit} className={common.searchForm}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    { 
                      equired: true,
                      message: '请输入单页名称' 
                    }
                  ],
                })(
                  <Input
                    allowClear 
                    className={common.nameInput}
                    placeholder="请输入单页名称"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                  {getFieldDecorator('stauts',{
                        initialValue: '',
                  })(
                    <Select style={{ width: 120 }}>
                      <Option value="">全部</Option>
                      <Option value={1}>显示</Option>
                      <Option value={0}>隐藏</Option>
                    </Select>
                  )}
              </Form.Item>
              <Form.Item>
                <Button className={common.reseachBtn} type="primary" htmlType="submit">搜索</Button>
                <Button className={common.reseachBtn} onClick={this.handleReset}>重置</Button>
              </Form.Item>
            </Form>
            {/* 编辑 */}
            <div className={common.tableWrap}>
              <div className={common.editBtn}>
                  <Button className={common.reseachBtn} type="primary" icon="plus" 
                    onClick={()=>{router.push('/content/single/addedit')}}>新增单页</Button>
                  <Button className={common.reseachBtn} type="" icon="delete" onClick={this.handleEdit.bind(this,this.state.selectIdArr,'del')}>删除选中单页</Button>
              </div>
              
              <Table
                  className={common.sameTab} 
                  rowSelection={rowSelection}
                  bordered
                  columns={columns} 
                  dataSource={data} 
                  size='small'
                  pagination={pageData}
              />
            </div>
          </Card>
        </div>
      </PageHeaderWrapper>
    )
  }
};
