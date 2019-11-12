import moment from 'moment';

const data = [
  {
    year: '1951 年',
    sales: 38,
  },
  {
    year: '1952 年',
    sales: 52,
  },
  {
    year: '1956 年',
    sales: 61,
  },
  {
    year: '1957 年',
    sales: 145,
  },
  {
    year: '1958 年',
    sales: 48,
  },
  {
    year: '1959 年',
    sales: 38,
  },
  {
    year: '1960 年',
    sales: 38,
  },
  {
    year: '1962 年',
    sales: 38,
  },
];

const cols = {
  sales: {
    tickInterval: 20,
  },
};

const dataSource = [
  {
    key: 'name',
    name: 'czbfsm',
    ip: '61.160.251.116',
    time: '2019-11-11 09:17:25',
  },
  {
    key: 'name',
    name: 'czbfsm22',
    ip: '61.160.251.11644',
    time: '2019-11-11 09:17:25',
  },
  {
    key: 'name',
    name: 'czbfsm33',
    ip: '61.160.251.11644',
    time: '2019-11-11 09:17:25',
  },
];

const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
];

const option = {
  title: {
    text: '热门搜索统计',
    x: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  series: [
    {
      name: '用户骑行订单',
      type: 'pie',
      radius: '55%',
      data: [
        {
          value: 1000,
          name: '周一',
        },
        {
          value: 1000,
          name: '周二',
        },
        {
          value: 2000,
          name: '周三',
        },
        {
          value: 1500,
          name: '周四',
        },
        {
          value: 3000,
          name: '周五',
        },
        {
          value: 2000,
          name: '周六',
        },
        {
          value: 1200,
          name: '周日',
        },
      ].sort((a, b) => {
        //数据排序
        return a.value - b.value;
      }),
      roseType: 'angle',
    },
  ],
};

const option2 = {
  title : {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x:'center'
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
  },
  series : [
      {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};


const option3 = {
  title: {
      text: '折线图堆叠'
  },
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  toolbox: {
      feature: {
          saveAsImage: {}
      }
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一','周二','周三','周四','周五','周六','周日']
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          data:[220, 182, 191, 234, 290, 330, 310]
      },
      {
          name:'视频广告',
          type:'line',
          stack: '总量',
          data:[150, 232, 201, 154, 190, 330, 410]
      },
      {
          name:'直接访问',
          type:'line',
          stack: '总量',
          data:[320, 332, 301, 334, 390, 330, 320]
      },
      {
          name:'搜索引擎',
          type:'line',
          stack: '总量',
          data:[820, 932, 901, 934, 1290, 1330, 1320]
      }
  ]
};


const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

export { data, cols, columns, dataSource, option, option2,visitData,option3 };
