import React, { useState } from 'react'
import { Card, Button, Typography, Divider, Tag } from 'antd'
import { useHistory } from "react-router-dom";

import { FormOutlined, DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
const { Title } = Typography;

function ProjectCard(props) {
    const history = useHistory();
    const [isEditing, setIsEditing] = useState(false)

    return (
        
        <Card style={{ marginBottom: 20 }} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{textAlign:"left"}}>
                    <Title level={5}>
                        {props.title}
                        { props.isDraft ?
                            <Tag color="orange" style={{ marginLeft: 10 }}>Draft</Tag>
                        : null} 
                    </Title>
                    <p>
                        {props.desc}
                    </p>
                </div>

                <div style={{ paddingTop: 10, display: 'flex', flexDirection: 'row' }}>
                    {
                        isEditing ?
                        <>
                        <Button type="danger" className="btnDelete" style={{ marginRight: 10 }} >
                                <DeleteOutlined /> Delete Project
                        </Button>
                        <Button onClick={() => {
                            setIsEditing(!isEditing)
                        }} className="btn-dark" style={{ marginRight: 10 }} >
                                Cancel
                        </Button>
                        </>
                        :
                        null
                    }
                    <Button onClick={() => {
                        setIsEditing(!isEditing)
                        if (isEditing) {
                            props.editTriggered()
                        }
                    }} className="btn-dark" style={{ marginRight: 10 }} >
                            <EditOutlined /> {isEditing ? "Save" : "Edit" }
                    </Button>
                    <Button onClick={() => history.push("/manager/projects/manage/" + props.objectRef)}
                    type="primary" className="btnManage">
                        <UnorderedListOutlined />Manage
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default ProjectCard
