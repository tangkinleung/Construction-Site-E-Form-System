import React, { useRef } from 'react';
import { HomeOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Breadcrumb, Button, Tag, Space, Menu, Dropdown, Popconfirm, message } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import axios from 'axios';


export default () => {
    const history = useHistory();
    const actionRef = useRef();


    const columns = [
        {
            title: 'Project ID',
            dataIndex: 'project_id',
            width: 100,
        },
        {
            title: 'Project Name',
            dataIndex: 'title',
            ellipsis: true,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: 'To be fill up!',
                    },
                ],
            },
        },

        {
            title: 'Description',
            dataIndex: 'project_desc',
        },
        {
            title: 'Actions',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    history.push("/manager/projects/edit/" + record.project_id)
                }}>
                    Edit
                </a>,
                <a
                    onClick={() => {
                        history.push("/manager/projects/manage/" + record.project_id)
                    }}
                >
                    View
                </a>,

                <Popconfirm
                title={<div><b>Confirm Delete Project?</b><br/>All forms within this project will be deleted as well.</div>}
                
                onConfirm={() => {

                        const data = {
                            id: (record.project_id),
                        }

                        const postParams = (new URLSearchParams(data)).toString();
                        console.log(data)

                        axios.delete('http://localhost:5000/api/Project?' + postParams).then(res => {
                            try {
                                console.log(res)
                                message.success("Project Deleted Successfully");
                                actionRef.current.reload();
                            } catch (error) {
                                console.log(error)
                                throw new Error("Project Deletion Failed")
                            }
                            
                        }).catch(err => {
                            console.log(err)
                            message.error("Project Could Not Be Deleted");
                        })
                    }
                }
                onCancel={() => {
            
                }}
                okText="Yes"
                cancelText="No"
                >
                <a key="delete">
                    
                    Delete
                </a>
                </Popconfirm>,
                ],
            },
    ];
    const menu = (<Menu>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>);


    return (
    <>
        <Breadcrumb style={{marginBottom: "15px"}}>
            <Breadcrumb.Item href="/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Project Management</Breadcrumb.Item>
        </Breadcrumb>
        
        <ProTable columns={columns} actionRef={actionRef} request={async (params = {}, sort, filter) => {
            
            const response = await request('http://localhost:5000/api/Project', {
                params,
            }).then(res => {
                
                // sort projects in descending project id order
                res.sort(function (a, b) {
                    if (a.project_id < b.project_id) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                // remove elements with is_in_bin = true
                let filteredForms = res.filter(form => form.is_in_bin == false)

                if (params != null || params != {}) {
                    if (params.project_id != null)
                        filteredForms = filteredForms.filter(form => form.project_id.toString().includes(params.project_id))
                    if (params.title != null)
                        filteredForms = filteredForms.filter(form => form.title.toString().includes(params.title))
                    if (params.project_desc != null)
                        filteredForms = filteredForms.filter(form => form.project_desc.toString().includes(params.project_desc))
                }
                return {"data" : filteredForms}
            });
            
            return response;
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
        }} dateFormatter="string" headerTitle="Project Management" toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary" href={"projects/create"}>
          Create
        </Button>,
        
        ]}/></>);
};