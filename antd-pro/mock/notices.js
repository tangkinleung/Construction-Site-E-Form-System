const getNotices = (req, res) => {
  res.json({
    data: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'You have 2 forms to fill up!',
        description: 'Deadline is...',
        datetime: '2021-12-3',
        type: 'notification',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'Latest News!',
        description: 'Team22 is awesome!',
        datetime: '2021-11-20',
        type: 'notification',
      },
    ],
  });
};

export default {
  'GET /api/notices': getNotices,
};
