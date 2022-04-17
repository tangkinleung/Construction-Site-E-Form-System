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
    Popconfirm,
    Spin,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import CustomisedBuilder from '../../../components/CustomisedBuilder';
import BuilderLoadTemplate from './components/BuilderLoadTemplate';
import BuilderMain from './components/BuilderMain';
const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

function ManageForm(props) {
    const [formElements, setFormElements] = useState([])
    const [inputFormTitle, setInputFormTitle] = useState("")
    const [inputFormDescription, setInputFormDescription] = useState("");
    const [formExpiryDate, setFormExpiryDate] = useState(null);
    const [params, setParams] = useState(props.match.params);
    const [isLoading, setIsLoading] = useState(true)

    const fetchFormData = () => {
        axios.get(`http://localhost:5000/api/formTemplate/form/${params.formId}`).then(res => {
            setInputFormTitle(res.data[0].form_name)
            setInputFormDescription(res.data[0].form_desc)
            const resData = JSON.parse(res.data[0].form_template)
            setFormElements(resData)
            const expiryDate = res.data[0].expiry_date.substring(0, res.data[0].expiry_date.indexOf('T'))
            setFormExpiryDate(moment(expiryDate, "YYYY-MM-DD"))
            setIsLoading(false)
        })
    }
    useEffect(() => {
        fetchFormData()
    }, [])

    const validateForm = () => {
        if (inputFormTitle != "") {
            return true
        } else if (formExpiryDate == null) {
            message.error("Form Expiry Date is mandatory")
            return false
        }
        else {
            message.error("Form Title is mandatory")
            return false
        }
    }
    const submitUpdateForm = () => {
        if (validateForm()) {
            let created_Date = moment()
            let expiry_Date = formExpiryDate

            console.log(expiry_Date)
            console.log(created_Date)

            if (expiry_Date == null) {
                message.error("Form Expiry Date is mandatory")
                return false
            } 
            else if (expiry_Date.diff(created_Date, 'days') < 0) {
                message.error("Form Expiry Date cannot be earlier than today")
                return false
            }
            else {
                expiry_Date = expiry_Date.format("YYYY-MM-DD").toString()
                created_Date = created_Date.format("YYYY-MM-DD").toString()
            }

            const data = {
                owned_by: 0, // todo: update user based on logged in owner id
                project_id: (params.projectId).toString(),
                form_id: (params.formId).toString(),
                form_name: inputFormTitle.toString(),
                form_desc: inputFormDescription.toString(),
                form_template: JSON.stringify(formElements).toString(),
                expiry_date: expiry_Date.toString(),
                created_date: created_Date.toString(),
            }

            const postParams = (new URLSearchParams(data)).toString();
            console.log(data)

            axios.put('http://localhost:5000/api/formTemplate/?' + postParams).then(res => {
              
                try {
                    const redirect_id = res.data[0].project_id
                    message.success("Form Updated Successfully");
                    history.push("/manager/projects/manage/" + params.projectId.toString());
                } catch (error) {
                    console.log(error)
                    throw new Error("Form Updating Failed")
                }
               
            }).catch(err => {
                console.log(err)
                message.error("Form Could Not Be Updated");
            })
        }
    }

    const submitDeleteForm = () => {
        const data = {
            form_id: (params.formId).toString(),
        }

        const postParams = (new URLSearchParams(data)).toString();
        console.log(data)

        axios.delete('http://localhost:5000/api/formTemplate/?' + postParams).then(res => {
            try {
                const redirect_id = res.data[0].project_id
                message.success("Form Deleted Successfully");
                history.push("/manager/projects/manage/" + params.projectId.toString());
            } catch (error) {
                console.log(error)
                throw new Error("Form Deletion Failed")
            }
            // alert(res)
        }).catch(err => {
            console.log(err)
            message.error("Form Could Not Be Deleted");
        })
    }

    const submitSaveDraft = () => {
        if (validateForm())
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
                <Breadcrumb.Item href={"/manager/projects/manage/" + params.projectId}>
                    View Projects</Breadcrumb.Item>
                <Breadcrumb.Item>Manage Form</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Title level={2} style={{ marginBottom: 20, marginRight: 10 }}>
                        Manage Form
                    </Title>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                </div>
            </div>

            <Card style={{ paddingBottom: 20 }} >

                { isLoading ? <Spin/>
                :
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 50 }}
                        style={{ padding: "0" }}>
                        <Divider>Form Details</Divider>
                        <Form.Item label="Form Title">
                            <Input value={inputFormTitle} onChange={(e) => setInputFormTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Form Description">
                            <TextArea value={inputFormDescription} rows={4} onChange={(e) => setInputFormDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Form Expiry Date">
                            <DatePicker format={'DD/MM/YYYY'}
                                value = {formExpiryDate}
                                allowClear = {false}
                                onChange={(e) => {
                                    setFormExpiryDate(moment(e))
                                }} />
                        </Form.Item>

                        <BuilderMain
                            formElements={formElements}
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
                                <Button onClick={() => submitUpdateForm()}
                                    type="primary" className="btnCreate" style={{ marginRight: 10 }} >
                                    Update Form
                                </Button>
                                <Popconfirm
                                title={<div><b>Confirm Delete Form Template?</b><br/>This action is irreversible.</div>}
                                
                                onConfirm={() => {
                                    submitDeleteForm()
                                }}
                                onCancel={() => {
                                  
                                }}
                                okText="Yes"
                                cancelText="No"
                                >
                                <Button
                                    type="danger" className="btnDelete" style={{ marginRight: 10 }} >
                                    Delete Form
                                </Button>
                                </Popconfirm>
                                <Link to={"/manager/projects/manage/" + params.projectId}>
                                    <Button className="btnDelete">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
                }
            </Card>
        </>
    )
}

export default ManageForm
