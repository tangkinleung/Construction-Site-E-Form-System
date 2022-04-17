// eslint-disable-next-line import/no-extraneous-dependencies

function getProvince(_, res) {
  return res.json({
    data: province,
  });
}

function getCity(req, res) {
  return res.json({
    data: city[req.params.province],
  });
}

function getCurrentUse(req, res) {
  return res.json({
    data: {
      name: 'Tommy Tan',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'tommy@clousplus.com',
      signature: 'Love my job!',
      title: 'Admin',
      tags: [
        {
          key: '0',
          label: 'Admin',
        },
        {
          key: '1',
          label: 'Excel expert',
        },
        {
          key: '2',
          label: 'Account management',
        },
        {
          key: '3',
          label: 'Word doc expert',
        },
        {
          key: '4',
          label: 'Admin lover',
        },
        {
          key: '5',
          label: 'Love cloudplus',
        },
      ],
      notifyCount: 5,
      unreadCount: 6,
      country: 'Singapore',
      
      phone: '65-98765432',
    },
  });
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'GET  /api/accountSettingCurrentUser': getCurrentUse,
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
};
