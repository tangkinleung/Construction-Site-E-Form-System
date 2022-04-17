import React from 'react'
import { Space, Input, Button } from 'antd'
function SearchInput(props) {
    return (
        <div>
            <Space style={{marginTop: 7}}>
                {props.label}
                <Input placeholder={props.placeholder} onChange={(e) => props.onSearch(e.target.value)}/>
            </Space>
        </div>
    )
}

export default SearchInput
