import React, { Component } from 'react';
import { Card, Button, Alert, Icon, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import common from '@/pages/all.less';

import { connect } from 'dva';

@connect(({ jobs }) => ({
  jobs,
}))
export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.getJobsList();
  }

  getJobsList = () => {
    //获取权益设置
    const { dispatch } = this.props;
    dispatch({
      type: 'jobs/getSetJobsList',
    });
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

  //清除选中
  clearRowSelection = () => {
    console.log(123);
    this.setState({
      selectedRowKeys: [],
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { JobsList } = this.props.jobs;
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '招聘岗位',
        dataIndex: 'name',
      },
      {
        title: '招聘人数',
        dataIndex: 'number',
      },
      {
        title: '结束日期',
        dataIndex: 'time',
      },
      {
        title: '工资待遇',
        dataIndex: 'money',
      },
      {
        title: '操作',
        width: 150,
        render: record => {
          return (
            <div className={common.editTableIcon}>
              <div onClick={this.handleEdit.bind(this, record.id, 'edit')}>
                <Icon type="edit" />
                <span>修改/查看</span>
              </div>
              <div onClick={this.handleEdit.bind(this, record.id, 'del')}>
                <Icon type="delete" />
                <span>删除</span>
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

    return (
      <PageHeaderWrapper>
        <Card>
          <div className={common.editBtn}>
            <Button
              className={common.reseachBtn}
              type="primary"
              icon="plus"
              onClick={() => {
                router.push('/content/single/add');
              }}
            >
              添加招聘
            </Button>
            <Button
              className={common.reseachBtn}
              type=""
              icon="delete"
              onClick={this.handleEdit.bind(this, this.state.selectIdArr, 'del')}
            >
              删除选中文章
            </Button>
          </div>
          <Table
            className={common.sameTab}
            rowSelection={rowSelection}
            bordered
            columns={columns}
            dataSource={JobsList.data}
            size="small"
            pagination={pageData}
            columns={columns}
          />
          ;
        </Card>
      </PageHeaderWrapper>
    );
  }
}
