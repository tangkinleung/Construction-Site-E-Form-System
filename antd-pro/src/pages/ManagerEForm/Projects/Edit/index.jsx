import React, { useState, useEffect } from 'react'
import SortDropdown from '../../components/SortDropdown';
import SearchInput from '../../components/SearchInput';
import ProjectCard from '../../components/ProjectCard';
import axios from 'axios';
// import querystring from 'query-string'
import { history } from 'umi';
import { HomeOutlined, FormOutlined, } from '@ant-design/icons';

import {
    Link
} from "react-router-dom";
import {
    Breadcrumb,
    Select,
    Button,
    Typography,
    Space,
    Card,
    Form,
    message,
    Input,
} from 'antd';
const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

function EditProject(props) {
    const [inputProjectTitle, setInputProjectTitle] = useState("")
    const [inputProjectDescription, setInputProjectDescription] = useState("")
    const [projectData, setProjectData] = useState({})
    const [params, setParams] = useState(props.match.params);
    const [projectId, setProjectId] = useState(params.projectId)

    
    const fetchProjectData = () => {
        axios.get(`http://localhost:5000/api/Project/${projectId}`).then(res => {
            setInputProjectTitle(res.data[0].title)
            setInputProjectDescription(res.data[0].project_desc)
            setProjectData(res.data[0])
        })
    }
    useEffect(() => {
        fetchProjectData()
    }, [])

    const validateForm = () => {
        if (inputProjectTitle != "") {
            return true
        } else {
            message.warning("Project Title is mandatory")
            return false
        }
    }
    const submitEditProject = () => {
        if (validateForm()) {
            const data = {
                owner: 0, // todo: update user based on logged in owner id
                id: projectId,
                title: inputProjectTitle,
                desc: inputProjectDescription,
                is_in_bin: projectData.is_in_bin,
                is_draft: projectData.is_draft,
            }
            
            const params = (new URLSearchParams(data)).toString();


            axios.put('http://localhost:5000/api/Project?' + params).then(res => {
                
                try {
                    const redirect_id = projectId
                    message.success("Project Updated Successfully");
                    history.push("/manager/projects/manage/" + redirect_id.toString());
                } catch (error) {
                    throw new Error("Project Updating Failed")
                }
                
            }).catch(err => {
                message.error("Project Could Not Be Updated");
            })
            console.log("data posted")
        }
    }

    const submitSaveDraft = () => {
        if (validateForm())
            alert("simulated draft submission:\ntitle: " + inputProjectTitle + "\ndesc: " + inputProjectDescription)
    }
    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item href="/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/manager/projects">
                <span>Project Management</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Edit Project</Breadcrumb.Item>
        </Breadcrumb>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{display:'flex'}}>
                    <Title level={2} style={{ marginBottom: 20, marginRight: 10 }}>
                            Edit Project
                    </Title>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                </div>
            </div>
            
        <Card style={{ marginBottom: 20 }} >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Form labelCol={{ span: 10 }} wrapperCol={{ span: 50 }}
                style={{ padding: "2em"}}>
                    <Form.Item label="Project Title">
                        <Input 
                        value={inputProjectTitle}
                        onChange={(e) => setInputProjectTitle(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Project Description">
                            <TextArea 
                            rows={4} 
                            value={inputProjectDescription}
                            onChange={(e) => setInputProjectDescription(e.target.value)}/>
                    </Form.Item>
                    <Button onClick={() => submitEditProject()}
                    type="primary" className="btnCreate" style={{ marginRight: 10 }} >
                        Update Project
                    </Button>
                    <Link to='/manager/projects'>
                        <Button className="btnDelete">
                            Cancel
                        </Button>
                    </Link>
                    </Form>
            </div>
        </Card>
        </>
    )
}

export default EditProject
