import React from 'react'
import { Card, Button, Typography, Divider } from 'antd'
import { Link } from "react-router-dom";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;

function list(props) {

    return (
        
        <Card style={{ marginBottom: 20 }} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{textAlign:"left", width:"1485px" }}>
                    <p style= {{fontWeight: "900", fontSize:"25px"}} >
                    {props.title}
                    </p>
                    <p style= {{fontSize:"20px"}}> 
                    {props.desc}
                    </p>
                </div>
                
                <div style={{ paddingTop: 10 }}>
                <p style= {{fontSize:"15px"}}>Expiry: 11/11/2021</p>

                <Link to={"/worker/forms/fill/" + props.formId}>
                    <Button type="primary" className="btnEdit" style={{ marginRight: 20 }} >
                        <FormOutlined /> Edit
                    </Button>
                </Link>

                </div>
                
            </div>
        </Card>
        
    )
}

export default list
