import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: '0',
    defaultMessage: 'Hello world',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      
    links={[
      {
        key: 'SIT',
        title: 'SIT',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/',
        blankTarget: true,
      },
      {
        key: 'Cloudplus',
        title: 'Cloudplus',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
    />
  );
};
