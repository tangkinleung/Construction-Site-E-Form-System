export default {
    // 支持值为 Object 和 Array
    'GET /api/project': (req, res) => {
    res.status(200).send({
        data : [ 
          {
          id:1,
          number:6689,
          title:"Project 1",
          labels:[{"name":"in progress","color":"green"}],
          state:"open",
          locked:false,
          comments:1,
          expiry_date:"2020-05-11T09:42:56Z", 
          updated_at:"2020-05-26T10:03:02Z",
          deleted_date: "2020-05-14T10:03:02Z",
          closed_at:null,
          author_association:"NONE",
          user:"chenshuai2144",
          avatar:"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"  
        },
        {
          id:2,
          number:6690,
          title:"Project 2",
          labels:[{"name":"draft","color":"orange"}],
          state:"open",
          locked:false,
          comments:1,
          expiry_date:"2020-05-11T09:42:56Z", 
          updated_at:"2020-05-26T10:03:02Z",
          deleted_date: "2020-05-14T10:03:02Z",
          closed_at:null,
          author_association:"NONE",
          user:"chenshuai2144",
          avatar:"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"  
        },

        {
          id:3,
          title:"Project 3",
          state:"open",
          expiry_date:"2020-05-11T09:42:56Z", 
        },
      ]})
    },
};

