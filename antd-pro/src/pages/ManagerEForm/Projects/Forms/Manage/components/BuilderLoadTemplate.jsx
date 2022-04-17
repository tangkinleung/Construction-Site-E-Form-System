import React from 'react'
import {
    Select,
    Button,
    Form,
    Divider,
} from 'antd';

function BuilderLoadTemplate() {
    return (
        <>
        <Divider>Load From Template</Divider>
            <Form.Item label="Form Template">
                    <Select defaultValue="-" 
                    style={{ width: "60%", marginRight: 10 }}
                    onChange={(value) => {
                        // future implementation to preview template(?)
                    }}
                    >
                        <Option value="t1" disabled>Form 1</Option>
                        <Option value="t2" disabled>Form 2</Option>
                        <Option value="t3" disabled>Form 3</Option>
                    </Select>
                    <Button 
                    type="primary"
                    onClick={() => {
                        alert("Feature currently under construction")
                        // future implementation to load from template
                    }}>
                        Load
                    </Button>
            </Form.Item>
        </>
    )
}

export default BuilderLoadTemplate
