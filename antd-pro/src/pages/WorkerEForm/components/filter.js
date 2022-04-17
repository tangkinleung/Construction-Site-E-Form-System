import React, {Component} from 'react';
import { Menu, Select, Space } from 'antd';
const { Option } = Select;
function Filter(props) {
  return (
    <div>
      <Space style={{ marginTop: 7 }}>
        Sort By
          <Select defaultValue="sort_descending" style={{ width: 120 }} onChange={(e) => { props.onSortChange(e)}}>
          <Option value="sort_ascending">Ascending</Option>
          <Option value="sort_descending">Descending</Option>
        </Select>
      </Space>
    </div>
  )
}

export default Filter;
