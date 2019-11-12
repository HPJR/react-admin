import React,{Component} from 'react';
import { Card, Alert, Icon ,Table} from 'antd';
import {Tooltip as AntTooltip} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import 'ant-design-pro/dist/ant-design-pro.css'; 
import { MiniBar,MiniArea  } from 'ant-design-pro/lib/Charts';

//导入饼图
import ReactEcharts from "echarts-for-react";
import MapChart from './maps';


import { 
  data,
  cols,
  columns,
  dataSource,
  option,
  option2,
  visitData,
  option3} from './data';

export default class Control extends Component {
  render(){
    return(
      <PageHeaderWrapper content="用于展示当前系统中的统计数据、统计报表及重要实时数据">
        <div className={styles.control}>
          {/* 头部信息 */}
          <div className={styles.control_article}>
            <ul>
              <li>
                <p className={styles.control_article_t}>
                  <b>文章统计</b>
                  <AntTooltip title="信息说明">
                      <Icon type="exclamation-circle" />
                  </AntTooltip>
                </p>
                <span className={styles.control_article_num}>14</span>
                <MiniBar height={45} data={visitData} />
                <small className={styles.control_article_tips}>当前分类总记录数</small>
              </li>
              <li>
                <p className={styles.control_article_t}>
                  <b>产品发布</b>
                  <AntTooltip title="信息说明">
                      <Icon type="exclamation-circle" />
                  </AntTooltip>
                </p>
                <span className={styles.control_article_num}>40</span>
                <MiniBar height={45} data={visitData} />
                <small className={styles.control_article_tips}>当前已发布产品</small>
              </li>
              <li>
                <p className={styles.control_article_t}>
                  <b>申请应聘</b>
                  <AntTooltip title="信息说明">
                      <Icon type="exclamation-circle" />
                  </AntTooltip>
                </p>
                <span className={styles.control_article_num}>40</span>
                <MiniBar height={45} data={visitData} />
                <small className={styles.control_article_tips}>当前申请应聘信息</small>
              </li>
              <li>
                <p className={styles.control_article_t}>
                  <b>网络订单</b>
                  <AntTooltip title="信息说明">
                      <Icon type="exclamation-circle" />
                  </AntTooltip>
                </p>
                <span className={styles.control_article_num}>40</span>
                <MiniBar height={45} data={visitData} />
                <small className={styles.control_article_tips}>当前网络订单信息</small>
              </li>
              <li>
                <p className={styles.control_article_t}>
                  <b>网站留言</b>
                  <AntTooltip title="信息说明">
                      <Icon type="exclamation-circle" />
                  </AntTooltip>
                </p>
                <span className={styles.control_article_num}>40</span>
                <MiniBar height={45} data={visitData} />
                <small className={styles.control_article_tips}>当前网站留言信息</small>
              </li>
            </ul>
          </div>
          {/* 操作日志+热门搜索 */}
          <div className={styles.flexWrap}>
            {/* 操作日志 */}
             <Card title='操作日志' className={styles.cardWrap}>
                <MiniArea line color="#cceafe" height={70} data={visitData} />
                <Table dataSource={dataSource} columns={columns} bordered={true} size='small' style={{marginTop:45}}/>
             </Card>  
             {/* 热门搜索 */}
             <Card title='热门搜索' className={styles.cardWrap}>
                <ReactEcharts option={option} theme="Light" style={{height: 450}}/>
             </Card>        
          </div>

          {/* 访客来源 */}   
          <div className={styles.flexWrap} style={{marginTop:30}}>
            {/* 操作日志 */}
             <Card title='访客来源' className={styles.cardWrap}>
                <ReactEcharts option={option2} theme="Light" style={{height: 550}}/>
             </Card>    
             {/* 热门搜索 */}
             <Card title='来源变化' className={styles.cardWrap}>
                <ReactEcharts option={option3} theme="Light" style={{height: 550}}/>
             </Card>        
          </div>
        </div>
      </PageHeaderWrapper>
    )
  }
}
