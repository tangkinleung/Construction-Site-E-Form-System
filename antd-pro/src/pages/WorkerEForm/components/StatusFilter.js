import React, {Component} from 'react';
import { Menu, Select, Space } from 'antd';
const { Option } = Select;
function StatusFilter(props) {
    return (
        <div>
        <Space style={{ marginTop: 7 }}>
            Sort By
            <Select defaultValue="sort_approved" style={{ width: 120 }} onChange={(e) => { props.onSortChange(e)}}>
            <Option value="sort_approved">Approved</Option>
            <Option value="sort_pending">Pending</Option>
            <Option value="sort_rejected">Rejected</Option>
            </Select>
        </Space>
        </div>
    )
}

export default StatusFilter;
