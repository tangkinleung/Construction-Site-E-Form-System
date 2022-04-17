import React, { useState } from 'react'

import {
    Switch,
    Space,
    Button,
    Row, Col,
    Popconfirm,
    message,
} from 'antd';
import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';

function QuestionModifier(props) {
    const totalQuestions = props.questionListSize
    const currentQuestion = props.position
    const [isRequired, setIsRequired] = useState(props.required)

    const confirm = (e) => {
        props.onDelete()
        message.success("Deleted Question " + (props.position+1) + " (" + props.type + ")")
    }
    const cancel = (e) => {
        
    }
    return (
        <Row>
            <Col md={24} lg={12}>
                <Space>
                    <Switch 
                    onChange={(e) => {
                        props.onChangeRequired(e)
                        setIsRequired(e)
                    }}
                    checked={isRequired}/>
                    <p style={{ paddingTop: 15 }}>Required?</p>
                </Space>
            </Col>
            <Col md={24} lg={12} style={{ marginTop: 10 }}>
                <Row justify="end">
                    <Space>

                        <Popconfirm
                            title="Are you sure you want to delete this?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                        <Button 
                        onClick={() => {
                            
                        }}
                        >
                            <DeleteOutlined />
                        </Button>
                        </Popconfirm>
                        <Button 
                        onClick={() => {
                            props.onTriggerPositionChange(-1)
                        }}
                        disabled={currentQuestion == 0}>
                            <UpOutlined />
                        </Button>
                        <Button 
                        onClick={() => {
                            props.onTriggerPositionChange(1)
                        }}
                        disabled={totalQuestions-1 == currentQuestion}>
                            <DownOutlined />
                        </Button>
                    </Space>
                </Row>
            </Col>
        </Row>
    )
}

export default QuestionModifier
