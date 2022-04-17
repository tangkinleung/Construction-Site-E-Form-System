import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { HomeOutlined } from '@ant-design/icons';
import {
Form,
Select,
Input,
DatePicker,
Switch,
Slider,
Button,
Rate,
Typography,
Space,
Grid,
Breadcrumb,
Row,
Col,
Card,
Checkbox,
Radio,
message,
Divider,
} from 'antd';
import moment from 'moment';

function FormRenderer(props) {
    const { TextArea } = Input;
    const [formData , setFormData] = useState(JSON.parse(props.data))
    return (
        <>
        {
            formData == null || formData == {} ?
            <div>This form has no elements.</div>
        :
        <Form labelCol={{ span: 24 }} 
                wrapperCol={{ span: 0 }}
                layout="vertical"
                onSubmitCapture={(e) => {
                    console.log("submit captured, performing additional validation")
                    try {
                        formData.forEach((formElement, index) => {
                            if (formElement.required && formElement.type === "checkbox") {
                                // if array in formElement.data doesn't contain a true value
                                if (!formElement.data.includes(true)) {
                                    alert("Please fill the required checkbox question. (Question " + (formElement.position+1) + ")")
                                    throw BreakException;
                                }
                            } else if (formElement.required && formElement.type === "radio") {
                                // if formElement.data is -1
                                if (formElement.data == -1) {
                                    alert("Please fill the required radio question. (Question " + (formElement.position+1) + ")")
                                    throw BreakException;
                                }
                            }
                        })

                        // proceed to process form submission
                        let created_Date = moment().format("YYYY-MM-DD");
                        const data = {
                            submitted_by: 0, // todo: update user based on logged in owner id
                            form_id: (params.id).toString(),
                            submission_data: JSON.stringify(formData).toString(),
                            created_date: created_Date.toString(),
                        }
            
                        const postParams = (new URLSearchParams(data)).toString();
            
                        axios.post('http://localhost:5000/api/FormSubmissions/worker/?' + postParams).then(res => {
                            
                            try {
                                message.success("Form Submitted Successfully");
                                history.push("/worker/status")
                            } catch (error) {
                                console.log(error)
                                throw new Error("Form Submission Failed")
                            }
                            // alert(res)
                        }).catch(err => {
                            console.log(err)
                            message.error("Form Could Not Be Submitted");
                        })


                    } catch (e) {
                        console.log("validation failed: " + e)
                    }
                }}
                style={{ backgroundColor : "#fff", minWidth: "100%" }}>
                { // for each form element, render the appropriate component
                    Object.keys(formData).length === 0 ? <p style={{ paddingTop: "1.5em" }}>This form has no questions.</p>
                    :
                    formData.map((formElement, index) => {
                        return (
                            <Form.Item 
                            label={"Question " + (formElement.position+1) + ": " + formElement.question} 
                            required={formElement.required}
                            colon={false}>
                                {
                                    formElement.type === "input" ?
                                        <Input 
                                            placeholder=""
                                            required={formElement.required}
                                            value={formElement.data}
                                            disabled
                                            style={{
                                                marginBottom: 15
                                            }}
                                        />
                                    : 
                                    formElement.type === "numericInput" ?
                                        <Input 
                                        type="tel" 
                                        pattern="[0-9]*" 
                                        required={formElement.required}
                                        value={formElement.data}
                                        disabled
                                        placeholder="" />
                                    : formElement.type === "textarea" ?
                                        <TextArea
                                        required={formElement.required}
                                        value={formElement.data}
                                        disabled
                                        style={{ height: 120 }} 
                                        placeholder=''/>
                                    : formElement.type === "checkbox" ?
                                        <Space direction='vertical'>
                                            { 
                                            formElement.checkboxOptions.map((option, key) => {
                                                    return(
                                                        <>  
                                                            <Space direction="horizontal">
                                                                <Checkbox
                                                                defaultChecked={formElement.data[key] == true}
                                                                disabled
                                                                value={key}
                                                                >{option}</Checkbox> 
                                                            </Space>
                                                        </>
                                                    )
                                                }) 
                                            }
                                        </Space>
                                    : formElement.type === "radio" ?
                                        <Radio.Group 
                                        defaultValue={formElement.data}
                                        onChange={(e) => {
                                            
                                        }}
                                        >
                                        { formElement.radioOptions.map((option, key) => {
                                                return(
                                                    <Col span={24}>  
                                                        <Space direction="horizontal">
                                                            <Radio
                                                            disabled
                                                            value={key}
                                                            required={formElement.required}
                                                            >{option}</Radio> 
                                                        </Space>
                                                    </Col>
                                                )
                                            }) 
                                        }
                                        </Radio.Group>
                                    // </Space>
                                    : null
                                }
                            </Form.Item>
                        )
                    })
                    }
                </Form>
            }
            </>
    )
}

export default FormRenderer