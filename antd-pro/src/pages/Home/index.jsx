import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
const columns = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        copyable: true,
        ellipsis: true,
        tip: 'Condition',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
    },
    {
        title: 'Condition',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: {
                text: 'Unresolve',
                status: 'Error',
            },
            closed: {
                text: 'Resolved',
                status: 'Success',
                disabled: true,
            },
            processing: {
                text: 'Pending',
                status: 'Processing',
            },
        },
    },
    {
        title: 'Status',
        dataIndex: 'labels',
        search: false,
        renderFormItem: (_, { defaultRender }) => {
            return defaultRender(_);
        },
        render: (_, record) => (<Space>
        {record.labels.map(({ name, color }) => (<Tag color={color} key={name}>
            {name}
          </Tag>))}
      </Space>),
    },
    {
        title: 'Created on',
        key: 'showTime',
        dataIndex: 'created_at',
        valueType: 'dateTime',
        sorter: true,
        hideInSearch: true,
    },
    {
        title: 'Created on',
        dataIndex: 'created_at',
        valueType: 'dateRange',
        hideInTable: true,
        search: {
            transform: (value) => {
                return {
                    startTime: value[0],
                    endTime: value[1],
                };
            },
        },
    },
    {
        title: 'Actions',
        valueType: 'option',
        render: (text, record, _, action) => [
            <a key="editable" onClick={() => {
                    var _a;
                    (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                }}>
        Edit
      </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        View
      </a>,
            <TableDropdown key="actionGroup" onSelect={() => action === null || action === void 0 ? void 0 : action.reload()} menus={[
                    { key: 'copy', name: 'Copy' },
                    { key: 'delete', name: 'Delete' },
                ]}/>,
        ],
    },
];
const menu = (<Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>);
export default () => {
    const actionRef = useRef();
    return (<ProTable columns={columns} actionRef={actionRef} request={async (params = {}, sort, filter) => {
            console.log(sort, filter);
            return request('https://proapi.azurewebsites.net/github/issues', {
                params,
            });
        }} editable={{
            type: 'multiple',
        }} columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
        }} rowKey="id" search={{
            labelWidth: 'auto',
        }} form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
                if (type === 'get') {
                    return Object.assign(Object.assign({}, values), { created_at: [values.startTime, values.endTime] });
                }
                return values;
            },
        }} pagination={{
            pageSize: 5,
        }} dateFormatter="string" headerTitle="Manage Issues" toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary">
          Create
        </Button>,
            <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
        ]}/>);
};