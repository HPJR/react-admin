import React, { Component } from 'react';
import { Card, Button, Alert, Icon, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import common from '@/pages/all.less';
import router from 'umi/router';

import { connect } from 'dva';

@connect(({ jobs, loading }) => ({
  jobs,
  loading: loading.models.jobs,
}))
export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      currentPage: 1,
      pageSize: 10,
    };
  }

  componentDidMount() {
    this.getJobsList();
  }

  //获取列表
  getJobsList = params => {
    const { currentPage, pageSize } = this.state;
    params
      ? params
      : (params = {
          currentPage,
          pageSize,
        });
    const { dispatch } = this.props;
    dispatch({
      type: 'jobs/getSetJobsList',
      payload: params,
    });
  };

  //删除
  delJobs = params => {
    params ? params : '';
    const { dispatch } = this.props;
    dispatch({
      type: 'jobs/getDelJobsList',
      payload: params,
      callBack: res => {
        if (res) {
          this.getJobsList();
        }
      },
    });
  };

  //删除/编辑
  handleEdit = (idArr, type, e) => {
    //多个删除
    if (idArr === '' && type === 'del') {
      this.delJobs({
        id: this.state.selectedRowKeys,
      });
    }
    //单个删除
    else if (idArr && type === 'del') {
      this.delJobs({
        id: [idArr],
      });
    }
    //编辑
    else {
      console.log(idArr);
    }
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
      total: JobsList.totalCount,
      showTotal: total => `总共 ${total} 条`,
      onShowSizeChange: (page, pageSize) => {
        this.setState({
          currentPage: page,
          pageSize: pageSize,
        });
        this.getJobsList({
          pageSize: pageSize,
          currentPage: page,
        });
      },
      onChange: (page, pageSize) => {
        this.setState({
          currentPage: page,
          pageSize: pageSize,
        });
        this.getJobsList({
          pageSize: pageSize,
          currentPage: page,
        });
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
                router.push('/jobs/add/add');
              }}
            >
              添加招聘
            </Button>
            <Button
              className={common.reseachBtn}
              type=""
              icon="delete"
              onClick={this.handleEdit.bind(this, '', 'del')}
            >
              删除选中文章
            </Button>
          </div>
          <Table
            loading={this.props.loading}
            rowKey={record => record.id}
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
