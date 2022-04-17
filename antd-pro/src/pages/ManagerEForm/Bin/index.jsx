import React, { useRef } from 'react';
import { HomeOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Tag, Space, Checkbox } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';

const columnsProject = [
    {
        title: 'Project ID',
        dataIndex: 'project_id',
        width: '20%'
    },
    {
        title: 'Project Name',
        dataIndex: 'title',
        width: '80%',
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
];

const columnsForm = [
    {
        title: 'Project ID',
        dataIndex: 'project_id',
        search:false,
        width: '20%'
    },
    {
        title: 'Form ID',
        dataIndex: 'form_id',
        width: '20%'
    },
    {
        title: 'Form Name',
        dataIndex: 'form_name',
        width: '80%',
        search: true,
        ellipsis: true,
    },
];


export default () => {
    const actionRefProject = useRef();
    const actionRefForm = useRef();
    return (
    <>
        <Breadcrumb style={{marginBottom: "15px"}}>
            <Breadcrumb.Item href="/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Archived</Breadcrumb.Item>
        </Breadcrumb>
    
    <ProTable columns={columnsProject} actionRef={actionRefProject} request={async (params = {}, sort, filter) => {
            console.log(sort, filter);
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
                // remove elements with is_in_bin = false
                let filteredForms = res.filter(form => form.is_in_bin == true)
                if (params != null || params != {}) {
                    if (params.form_id != null)
                        filteredForms = filteredForms.filter(form => form.form_id.toString().includes(params.form_id))
                    if (params.form_name != null)
                        filteredForms = filteredForms.filter(form => form.form_name.toString().includes(params.form_name))
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
        }} dateFormatter="string" headerTitle="Archived Projects" toolBarRender={() => [,
        ]}/>
        
        <hr style={{marginTop:"1em", marginBottom:"1em"}}/>


    <ProTable columns={columnsForm} actionRef={actionRefForm} request={async (params = {}, sort, filter) => {
            console.log(sort, filter);
            const response = await request('http://localhost:5000/api/formTemplate/archived', {
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
                let filteredForms = res
                if (params != null || params != {}) {
                    if (params.form_id != null)
                        filteredForms = filteredForms.filter(form => form.form_id.toString().includes(params.form_id))
                    if (params.form_name != null)
                        filteredForms = filteredForms.filter(form => form.form_name.toString().includes(params.form_name))
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
        }} dateFormatter="string" headerTitle="Archived Forms" toolBarRender={() => [,
        ]}/>
        
        </>
        
    );
        
};