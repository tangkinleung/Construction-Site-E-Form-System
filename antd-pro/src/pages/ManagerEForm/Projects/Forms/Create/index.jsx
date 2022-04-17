import React, { useState, useEffect } from 'react'
import { FormOutlined, HomeOutlined } from '@ant-design/icons';

import {
    Link
} from "react-router-dom";

import { history } from 'umi';
import {
    Breadcrumb,
    Select,
    Button,
    Typography,
    Space,
    Card,
    Divider,
    Form,
    DatePicker,
    Input,
    message,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import CustomisedBuilder from '../../../components/CustomisedBuilder';
import BuilderMain from './components/BuilderMain';
const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

function CreateForm(props) {

    let placeholderElements = [
        {
        position: 0,
        key: 0,
        type: "input",
        question: "Is this a question?",
        required: false,
        },
        {
        position: 1,
        key: 1,
        type: "input",
        question: "Another question but now it's required?",
        required: true,
        }
    ]
    const [formElements, setFormElements] = useState(placeholderElements)
    const [renderFormElements, setRenderFormElements] = useState(0)
    const [inputFormTitle, setInputFormTitle] = useState("")
    const [inputFormDescription, setInputFormDescription] = useState("");
    const [formExpiryDate, setFormExpiryDate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useState(props.match.params);
    const [availableTemplates, setAvailableTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState(-1)


    const performFormValidation = () => {
        if (inputFormTitle != "") {
            return true
        } else if (formExpiryDate == null) {
            message.error("Form Expiry Date is mandatory, please fill it in before submitting.")
            return false
        } 
        else if (expiry_Date < created_Date) {
            message.error("Form Expiry Date cannot be earlier than today, please correct it before submitting.")
            return false
        }else {
            message.error("Form Title is mandatory, please fill it in before submitting.")
            return false
        }
    }
    const submitCreateForm = () => {
        if (performFormValidation()) {
            let created_Date = moment().format("YYYY-MM-DD");
            let expiry_Date = formExpiryDate
            if (expiry_Date == null) {
                message.error("Form Expiry Date is mandatory, please fill it in before submitting.")
                return false
            }
            else if (expiry_Date < created_Date) {
                message.error("Form Expiry Date cannot be earlier than today, please correct it before submitting.")
                return false
            }

            const data = {
                owned_by: 0, // todo: update user based on logged in owner id
                project_id: (params.id).toString(),
                form_name: inputFormTitle.toString(),
                form_desc: inputFormDescription.toString(),
                form_template: JSON.stringify(formElements).toString(),
                expiry_date: expiry_Date.toString(),
                created_date: created_Date.toString(),
            }

            const postParams = (new URLSearchParams(data)).toString();
            console.log(data)

            axios.post('http://localhost:5000/api/formTemplate/?' + postParams).then(res => {
            
                try {
                    const redirect_id = res.data[0].project_id
                    message.success("Form Created Successfully");
                    history.push("/manager/projects/manage/" + params.id.toString());
                } catch (error) {
                    console.log(error)
                    throw new Error("Form Creation Failed")
                }
                
            }).catch(err => {
                console.log(err)
                message.error("Form Could Not Be Created");
            })
        }
    }

    const fetchTemplateData = () => {
        axios.get(`http://localhost:5000/api/formTemplate/allTemplates`).then(res => {
            res.data.forEach((element) => {
                if (element.form_template != "{}") {
                    setAvailableTemplates(prevState => [...prevState, element])
                }
            })
            setIsLoading(false)
        })
    }
    useEffect(() => {
        fetchTemplateData()
    }, [])
    const submitSaveDraft = () => {
        if (performFormValidation())
            alert("simulated draft submission:\ntitle: " + inputFormTitle + "\ndesc: " + inputFormDescription)
    }
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/home">
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/manager/projects">
                    <span>Project Management</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href={"/manager/projects/manage/" + params.id}>
                    View Projects</Breadcrumb.Item>
                <Breadcrumb.Item>Create Form</Breadcrumb.Item>
            </Breadcrumb>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Title level={2} style={{ marginBottom: 20, marginRight: 10 }}>
                        Create Form
                    </Title>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                </div>
            </div>

            <Card style={{ paddingBottom: 20 }} >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 50 }}
                        style={{ padding: "0" }}>
                        <Divider>Form Details</Divider>
                        <Form.Item label="Form Title">
                            <Input onChange={(e) => setInputFormTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Form Description">
                            <TextArea rows={4} onChange={(e) => setInputFormDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Form Expiry Date">
                            <DatePicker format={'DD/MM/YYYY'}
                                onChange={(e) => {
                                    setFormExpiryDate(e.format("YYYY-MM-DD").toString())
                                }} /> 
                        </Form.Item>


                        <Divider>Load From Template</Divider>
                            <Form.Item label="Form Template">
                                    <Select defaultValue="Choose template" 
                                    loading={isLoading}
                                    style={{ width: "60%", marginRight: 10 }}
                                    onChange={(value) => {
                                        setSelectedTemplate(value)
                                    }}
                                    >
                                        {availableTemplates.map((element, index) => {
                                            return(
                                                <Option 
                                                value={index}
                                                >{element.form_name}</Option>
                                            )
                                            })
                                        }
                                    </Select>
                                    <Button 
                                    type="primary"
                                    onClick={() => {
                                        if (selectedTemplate != -1) {
                                            console.log(formElements)
                                            const template = JSON.parse(availableTemplates[selectedTemplate].form_template)
                                            setFormElements(template)
                                            setRenderFormElements(renderFormElements+1)
                                            message.success("Template Loaded")
                                        } else {
                                            message.error("Please select a template")
                                        }
                                    }}>
                                        Load
                                    </Button>
                            </Form.Item>
                        <BuilderMain
                            formElements={formElements}
                            key={renderFormElements}
                            setFormElements={(elements) => {
                                setFormElements(elements)
                            }}
                        />

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}>
                            <div>
                                <Button onClick={() => submitCreateForm()}
                                    type="primary" className="btnCreate" style={{ marginRight: 10 }} >
                                    Create Form
                                </Button>

                                <Link to={"/manager/projects/manage/" + params.id}>
                                    <Button className="btnDelete">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </Card>
        </>
    )
}

export default CreateForm
