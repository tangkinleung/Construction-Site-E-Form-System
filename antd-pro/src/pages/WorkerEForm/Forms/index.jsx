import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import Filter from '../components/filter';
import List from '../components/list'
import { HomeOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import moment from 'moment'
import { history } from 'umi';

import {
    Breadcrumb,
    Select,
    Button,
    Typography,
    Space,
    Card,
    Grid,
    Row,
    Col,
} from 'antd';
import SearchInput from '../components/SearchInput';
const { Option } = Select;
const { Title } = Typography;
const { useBreakpoint } = Grid;


export default () => {
    const history = useHistory();
    const actionRef = useRef();
    const [fetchedData, setFetchedData] = useState([]);

    const columns = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Form Name',
            dataIndex: 'form_name',
        },
        {
            title: 'Description',
            dataIndex: 'form_desc',
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiry_date',
        },
        {
            title: 'Actions',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    history.push(`/worker/forms/fill/${record.form_id}`)
                }}>
                    Fill Form
                </a>
                ],
            },
    ];

    {fetchedData.map(item => (
        <div>
            <p>{item}</p>
        </div>
    ))};

    return (
    <>
        <Breadcrumb style={{marginBottom: "15px"}}>
            <Breadcrumb.Item href="/worker/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Action Required</Breadcrumb.Item>
            
        </Breadcrumb>

        <ProTable columns={columns} actionRef={actionRef} request={async (params = {}, sort, filter) => {
        const response = await request('http://localhost:5000/api/formTemplate/all', {
                params,
            }).then(res => {
                // sort forms in descending form id order
                res.sort(function (a, b) {
                    if (a.form_id < b.form_id) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                // cast date strings to moment object
                res.forEach(item => {
                    item.expiry_date = moment(item.expiry_date).format('YYYY-MM-DD')
                    item.created_date = moment(item.created_date).format('YYYY-MM-DD')
                })

                let filteredForms = res
                if (params != null || params != {}) {
                    if (params.form_name != null)
                        filteredForms = filteredForms.filter(form => form.form_name.toString().includes(params.form_name))
                    if (params.form_desc != null)
                        filteredForms = filteredForms.filter(form => form.form_desc.toString().includes(params.form_desc))
                }
                return {"data" : filteredForms}
            });
            
            return response;
        }} columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
        }} rowKey="id" search={{
            labelWidth: 'auto',
        }} form={{
            
            syncToUrl: (values, type) => {
                if (type === 'get') {
                    return Object.assign(Object.assign({}, values), { created_at: [values.startTime, values.endTime] });
                }
                return values;
            },
        }} pagination={{
            pageSize: 5,
        }} 
        /></>);
        
}
