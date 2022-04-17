// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default en-US
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: './Home',
        },
      ],
    },
    
    // {
    //   name: 'Home',
    //   icon: 'table',
    //   path: '/Home',
    //   component: './Home',
    // },
    // {
    //   path: '/Home',
    //   redirect: '/Home',
    // },
    
    {
      
      path: '/account',
      routes: [
        {
          path: '/account',
          redirect: '/account/center',
        },
        {
          name: 'Profile',
          icon: 'smile',
          path: '/account/center',
          component: './account/center',
        },
        {
          name: 'Settings',
          icon: 'smile',
          path: '/account/settings',
          component: './account/settings',
        },
      ],
    },
    // manager routing
    {
      name: 'Manager',
      path: '/manager',
      icon: 'tool',
      routes: [
        // {
        //   path: '/manager',
        //   redirect: '/manager/projects',
        // },
        // {
        //   name: 'Manager Dashboard',
        //   path: '/manager/home',
        //   component: './ManagerEForm/ManagerHome',
        // },
        {
          name: 'Project Management',
          path: '/manager/projects',
          component: './ManagerEForm/Projects/Dashboard',
          exact: true,
        },
        {
          path: '/manager/projects/create',
          component: './ManagerEForm/Projects/Create',
          exact: true,
        },
        {
          path: '/manager/projects/manage/:id',
          component: './ManagerEForm/Projects/Forms',
        },
        {
          path: '/manager/projects/edit/:projectId',
          component: './ManagerEForm/Projects/Edit',
        },
        {
          path: '/manager/projects/manage/:id/createForm',
          component: './ManagerEForm/Projects/Forms/Create',
        },
        {
          path: '/manager/projects/manage/:projectId/manageForm/:formId',
          component: './ManagerEForm/Projects/Forms/Manage',
        },
        {
          name: 'Pending Review',
          path: '/manager/formreview',
          component: './ManagerEForm/FormReview',
        },
        {
          path: '/manager/formreview/:submissionId',
          component: './ManagerEForm/FormReview/Details',
        },
        {
          path: '/manager/history/:submissionId',
          component: './ManagerEForm/History/Details',
        },
        {
          name: 'Form Listing',
          path: '/manager/history',
          component: './ManagerEForm/History',
        },
        {
          name: 'Archived',
          path: '/manager/bin',
          component: './ManagerEForm/Bin',
        },
      ]
    },

    // worker routing

    {
      name: 'Worker',
      path: '/worker',
      icon: 'user',
      routes: [
        {
          path: '/worker',
          redirect: '/worker/forms',
        },
        // {
        //   name: 'Worker Dashboard',
        //   path: '/worker/home',
        //   component: './WorkerEForm/WorkerHome',
        // },
        {
          name: 'Action Required',
          path: '/worker/forms',
          component: './WorkerEForm/Forms',
        },
        {
          path: '/worker/forms/fill/:id',
          component: './WorkerEForm/Forms/Fill',
        },
        {
          name: 'Form Management',
          path: '/worker/status',
          component: './WorkerEForm/Status',
        },
        {
          path: '/worker/status/details/:submissionId',
          component: './WorkerEForm/Status/Details',
        },
      ]
    },
    // default routing
    {
      path: '/',
      redirect: './ManagerEForm/ManagerHome',
    },
    {
      component: './ManagerEForm/ManagerHome',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
