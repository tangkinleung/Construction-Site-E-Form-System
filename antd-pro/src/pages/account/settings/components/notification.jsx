import { List, Switch } from 'antd';
import React, { Fragment } from 'react';

const NotificationView = () => {
  const getData = () => {
    const Action = <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />;
    return [
      {
        title: 'Notification',
        description: 'The notifications of users able to access to their account via the link.',
        actions: [Action],
      },
      {
        title: 'Other notifications #1',
        description: 'Other notifications',
        actions: [Action],
      },
      {
        title: 'Other notifications #2',
        description: 'Other notifications',
        actions: [Action],
      },
    ];
  };

  const data = getData();
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default NotificationView;
