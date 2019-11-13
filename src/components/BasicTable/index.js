import { Badge, Icon, Spin, Table } from 'antd';
import React, { Component } from 'react';
import common from './../../all.less';

export default class BasicTable extends Component() {
  static defaultProps = {
    loading: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data ? this.props.data : [],
      selectIdArr: '',
      imgWidth: 40,
    };
  }

  //更改图片尺寸
  onChangeImgWidth = value => {
    value > 100 || value < 40 ? (value = 40) : value;
    console.log(value);
    this.setState({
      imgWidth: value,
    });
  };

  //更改标题及排序
  handleChangeTitle = (id, oldVal, type, e) => {
    if (oldVal == e.target.value) {
      return false;
    } else {
      //标题修改
      if (type === 'title') {
        console.log('标题修改');
        console.log(e.target.value);
        console.log(id);
      }
      //排序修改
      if (type === 'order') {
        console.log('排序修改');
        console.log(e.target.value);
        console.log(id);
      }
    }
  };

  //删除/编辑
  handleEdit = (idArr, type, status, e) => {
    console.log(type);
    //多个删除
    if (!idArr && type === 'del') {
      console.log(this.state.selectIdArr);
    }
    //单个删除
    else if (idArr && type === 'del') {
      console.log(idArr);
    }
    //隐藏显示
    else if (type === 'toggle') {
      console.log(idArr);
      console.log(status);
    }
    //编辑
    else {
      console.log(idArr);
    }
  };

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 60,
      },
      {
        title: '类别',
        dataIndex: 'type',
      },
      {
        title: '名称',
        width: 250,
        render: record => {
          return (
            <div>
              {
                <Input
                  placeholder="标题"
                  defaultValue={record.name}
                  style={{ border: 0 }}
                  onBlur={this.handleChangeTitle.bind(this, record.id, record.name, 'title')}
                />
              }
            </div>
          );
        },
      },
      {
        title: '用户',
        dataIndex: 'users',
      },
      {
        title: () => {
          return (
            <div>
              <span>图片</span>
              <InputNumber
                size="small"
                style={{ marginLeft: 10, width: 56 }}
                min={40}
                max={100}
                defaultValue={this.state.imgWidth}
                onChange={this.onChangeImgWidth.bind(this)}
              />
            </div>
          );
        },
        render: record => {
          return (
            <div style={{ textAlign: 'center' }}>
              {<img src={record.image} style={{ width: this.state.imgWidth }}></img>}
            </div>
          );
        },
        width: 110,
      },
      {
        title: '排序',
        sorter: (a, b) => a.sortnum - b.sortnum,
        ellipsis: true,
        render: record => {
          return (
            <div>
              {
                <Input
                  defaultValue={record.sortnum}
                  style={{ border: 0 }}
                  onBlur={this.handleChangeTitle.bind(this, record.id, record.sortnum, 'order')}
                />
              }
            </div>
          );
        },
        width: 60,
      },
      {
        title: '添加时间',
        dataIndex: 'time',
      },
      {
        title: '状态',
        width: 100,
        render: record => {
          return (
            <div>
              {record.status === 0 ? (
                <Badge status="error" text="隐藏" />
              ) : (
                <Badge status="success" text="显示" />
              )}
            </div>
          );
        },
      },
      {
        title: '操作',
        width: 150,
        render: record => {
          return (
            <div className={common.editTableIcon}>
              <div onClick={this.handleEdit.bind(this, record.id, 'edit')}>
                <Icon type="edit" />
                <span>修改</span>
              </div>
              <div onClick={this.handleEdit.bind(this, record.id, 'del')}>
                <Icon type="delete" />
                <span>删除</span>
              </div>
              <div onClick={this.handleEdit.bind(this, record.id, 'toggle', record.status)}>
                {record.status === 0 ? (
                  <p>
                    <Icon type="eye-invisible" />
                    <span>隐藏</span>
                  </p>
                ) : (
                  <p>
                    <Icon type="eye" />
                    <span>显示</span>
                  </p>
                )}
              </div>
            </div>
          );
        },
      },
    ];

    //分页
    const pageData = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: this.state.currentPage,
      pageSize: this.state.pageSize,
      total: this.state.total,
      onShowSizeChange: (page, pageSize) => {
        this.setState(
          {
            pageSize: pageSize,
          },
          () => {
            //重新请求
            const parmars = {
              current: 1,
              pageSize: pageSize,
            };
          },
        );
      },
      onChange: (page, pageSize) => {
        this.setState(
          {
            current: page,
          },
          () => {
            //重新请求
          },
        );
      },
    };

    //表格筛选
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectIdArr: selectedRowKeys,
        });
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };

    const { data } = this.state;

    return (
      <Table
        className={common.sameTab}
        rowSelection={rowSelection}
        bordered
        columns={columns}
        dataSource={data}
        size="small"
        pagination={pageData}
      />
    );
  }
}
