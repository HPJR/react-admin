export default [
  //登录/注册
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  //管理页面
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/admin',
          },
          {
            path: '/admin',
            name: '控制台',
            icon: 'dashboard',
            component: './Control/index',
          },
          //内容管理
          {
            path: '/content',
            name: '内容管理',
            icon: 'table',
            routes: [
              // 单页管理
              {
                name: '单页管理',
                icon: 'highlight',
                path: '/content/single',
                component: './Content/Single',
              },
              // 编辑新增
              {
                name: '编辑新增',
                icon: 'highlight',
                path: '/content/single/add',
                component: './Content/Addedit',
                hideInMenu: true,
              },
              // 文章管理
              {
                name: '文章管理',
                icon: 'highlight',
                path: '/content/article',
                component: './Content/Article',
              },
              // 产品管理
              {
                name: '产品管理',
                icon: 'highlight',
                path: '/content/products',
                component: './Content/Products',
              },
              // 分类管理
              {
                name: '分类管理',
                icon: 'highlight',
                path: '/content/products/type',
                component: './Content/Products/Type',
                hideInMenu: true,
              },
            ],
          },
          //人才招聘
          {
            path: '/jobs',
            name: '人才招聘',
            icon: 'usergroup-delete',
            routes: [
              // 招聘岗位
              {
                name: '招聘岗位',
                icon: 'highlight',
                path: '/jobs/list',
                component: './Jobs/Joblist',
              },
              // 新增招聘
              {
                name: '新增招聘',
                icon: 'highlight',
                path: '/jobs/add',
                component: './Jobs/Add',
                hideInMenu: true,
              },
              // 简历列表
              {
                name: '简历列表',
                icon: 'highlight',
                path: '/jobs/resume',
                component: './Jobs/Resume',
              },
            ],
          },
          //表单管理
          {
            path: '/allform',
            name: '表单管理',
            icon: 'file-done',
            routes: [
              // 留言管理
              {
                name: '留言管理',
                icon: 'highlight',
                path: '/allform/message',
                component: './Allform/Message',
              },
              // 订单管理
              {
                name: '订单管理',
                icon: 'highlight',
                path: '/allform/order',
                component: './Allform/Order',
              },
            ],
          },
          //用户管理
          {
            path: '/power',
            name: '用户管理',
            icon: 'team',
            routes: [
              // 用户组
              {
                name: '用户分组',
                icon: 'highlight',
                path: '/power/group',
                component: './Power/Group',
              },
              // 所有用户
              {
                name: '所有用户',
                icon: 'highlight',
                path: '/power/userlist',
                component: './Power/Userlist',
              },
            ],
          },
          //系统设置
          {
            path: '/systems',
            name: '系统设置',
            icon: 'setting',
            routes: [
              // 系统信息
              {
                name: '系统信息',
                icon: 'highlight',
                path: '/systems/setup',
                component: './Systems/Setup',
              },
              // 轮播图
              {
                name: '轮播图',
                icon: 'highlight',
                path: '/systems/banner',
                component: './Systems/Banner',
              },
              // 自定义字段
              {
                name: '自定义字段',
                icon: 'highlight',
                path: '/systems/custom',
                component: './Systems/Custom',
              },
              // 违禁词
              {
                name: '违禁词',
                icon: 'highlight',
                path: '/systems/prohibit',
                component: './Systems/Prohibit',
              },
            ],
          },
          //回收站
          {
            path: '/recovery',
            name: '回收站',
            icon: 'calculator',
            path: '/recovery',
            component: './Recovery',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
