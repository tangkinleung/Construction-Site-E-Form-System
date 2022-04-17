import React, { useState } from 'react'

import {
    Form,
    Select,
    Button,
} from 'antd';


const { Option } = Select;

function AddButton(props) {
    const [addElementType, setAddElementType] = useState('input')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    return (
        <Form.Item label="Add Element">
            <Select defaultValue="input" 
            style={{ width: 192, marginRight: 10 }}
            
            onChange={(value) => {
                setAddElementType(value)
            }}>
            <Option value="input">Input Field</Option>
            <Option value="numericInput">Numeric Input Field</Option>
            <Option value="textarea">Text Area</Option>
            <Option value="checkbox">Checkbox</Option>
            <Option value="radio">Radio</Option>
            </Select>
            <Button 
            type="primary"
            onClick={() => {
                props.addElement(addElementType)
            }}>
                +
            </Button>
        </Form.Item>
    )
}

export default AddButton
