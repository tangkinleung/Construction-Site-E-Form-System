import {} from 'antd'
import React from 'react'
import { Card, Button, Typography, Divider, Tag } from 'antd'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;

function list() {

    return (
        
        <Card style={{ marginBottom: 20 }} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{textAlign:"left", width:"1500px" }}>
                    <p style= {{fontWeight: "900", fontSize:"25px"}} >
                    Form 1
                    </p>
                    <p style= {{fontSize:"20px"}}> 
                    This is the description of the form
                    </p>
                </div>
                
                <div style={{ paddingTop: 50 }}>
                <Tag color='red'>Rejected</Tag>
                </div>         
                    
            </div>
            <hr />  
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{textAlign:"left", width:"1550px" }}>
                    <p style= {{fontWeight: "900", fontSize:"25px"}} >
                    Form 2
                    </p>
                    <p style= {{fontSize:"20px"}}> 
                    This is the description of the form
                    </p>
                </div>
                
                <div style={{ paddingTop: 50 }}>
                <Tag color='gold'>Pending</Tag>
                </div>                
            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{textAlign:"left", width:"1500px" }}>
                    <p style= {{fontWeight: "900", fontSize:"25px"}} >
                    Form 3
                    </p>
                    <p style= {{fontSize:"20px"}}> 
                    This is the description of the form
                    </p>
                </div>
                
                <div style={{ paddingTop: 50 }}>
                <Tag color='green'>Approved</Tag>
                </div>                
            </div>
                       
        </Card>
        
    )
}

export default list
