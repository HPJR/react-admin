import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, Form, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import common from '@/pages/all.less';
import styles from './index.less';

import { connect } from 'dva';
@Form.create()
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
      modalVisible: false,
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
    //查看
    else {
      this.setState({
        modalVisible: true,
      });
    }
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { JobsList } = this.props.jobs;
    const { selectedRowKeys } = this.state;
    const { getFieldDecorator } = this.props.form;

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
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '电话',
        dataIndex: 'number',
      },
      {
        title: '地址',
        dataIndex: 'time',
      },
      {
        title: '电子邮箱',
        dataIndex: 'money',
      },
      {
        title: '操作',
        width: 120,
        render: record => {
          return (
            <div className={common.editTableIcon}>
              <div onClick={this.handleEdit.bind(this, record.id, 'edit')}>
                <Icon type="edit" />
                <span>查看</span>
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
              type=""
              icon="delete"
              onClick={this.handleEdit.bind(this, '', 'del')}
            >
              删除选中项
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
          <Modal
            title="简历详情"
            visible={this.state.modalVisible}
            onOk={this.handleOk}
            onCancel={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <div className={styles.info_list}>
              <ul>
                <li>
                  <span>姓名：</span>
                  <small>测试</small>
                </li>
                <li>
                  <span>电话：</span>
                  <small>测试测试测试</small>
                </li>
                <li>
                  <span>地址：</span>
                  <small>测试测试测试</small>
                </li>
                <li>
                  <span>电子邮箱：</span>
                  <small>1749081640@qq.com</small>
                </li>
                <li>
                  <span>在线简历：</span>
                  <small></small>
                </li>
              </ul>
            </div>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
