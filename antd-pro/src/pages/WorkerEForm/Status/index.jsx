import React, { useState, useRef } from 'react';
import Filter from '../components/filter';
import List from '../components/listStatus'
import { HomeOutlined } from '@ant-design/icons';
// import { useHistory } from 'react-router-dom';
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
    Tag
} from 'antd';
import SearchInput from '../components/SearchInput';
import StatusFilter from '../components/StatusFilter';

import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
const { Option } = Select;
const { Title } = Typography;
const { useBreakpoint } = Grid;

function Status() {
    // const history = useHistory();
    const actionRef = useRef();
    const [searchQuery, setSearchQuery] = useState("")
    const [userId, setUserId] = useState(0) // todo: replace with user id from state
    const screen = useBreakpoint();

    const onSortChange = (selection) => {
        console.log(selection)
        // expected return parameters: sort_ascending, sort_descending
    }

    const onSearch = (query) => {
        setSearchQuery(query)
    }


    const columns = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Submission ID',
            dataIndex: 'submission_id',
        },
        {
            title: 'Form Name',
            dataIndex: 'form_name',
        },
        
        {
            title: 'Status',
            dataIndex: 'form_status',
            search: false,
            renderFormItem: (_, { defaultRender }) => {
                return defaultRender(_);
            },
            render: (record) => {
                let colors = ["processing", "green", "red"]
                let status = ["Pending", "Approved", "Rejected"]
                return (<Space>
                    <Tag color={colors[record]} key={record}>
                        {status[record]}
                    </Tag>
                </Space>)
            },
        },
        {
            title: 'Actions',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    history.push(`/worker/status/details/${record.submission_id}`)
                }}>
                    View Details
                </a>
                ],
            },
    ];

    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item href="/worker/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Form Management</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[24, 0]} style={{ marginBottom: 20 }}>
                <Col lg={15} md={24}>
                    <div style={{display:'flex'}}>
                        <Title level={2} style={{ marginBottom: 20, marginRight: 10 }}>
                                Form Management
                        </Title>
                    </div>
                </Col>
        </Row>

            {/* <List /> */}

        <ProTable columns={columns} actionRef={actionRef} request={async (params = {}, sort, filter) => {
        const response = await request('http://localhost:5000/api/FormSubmissions/worker/user/' + userId.toString(), {
                params,
            }).then(res => {
                // sort submissions in descending submission id order
                res.sort(function (a, b) {
                    if (a.submission_id < b.submission_id) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                let filteredForms = res
                if (params != null || params != {}) {
                    if (params.submission_id != null)
                        filteredForms = filteredForms.filter(form => form.submission_id.toString().includes(params.submission_id))
                    if (params.form_name != null)
                        filteredForms = filteredForms.filter(form => form.form_name.toString().includes(params.form_name))
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
        />
        </>
    )
}

export default Status;
