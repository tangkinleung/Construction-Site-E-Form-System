import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import moment from 'moment';
const { Option } = Select;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const { TextArea } = Input;

function Fill(props) {
    const history = useHistory();
    const [params, setParams] = useState(props.match.params);
    const [searchQuery, setSearchQuery] = useState("")
    const [formTitle, setFormTitle] = useState("") // todo: useeffect and fetch title, desc, and data from db
    const [isLoading, setIsLoading] = useState(true)
    const [formData, setFormData] = useState([])

    const onLoadFormData = (resFormData) => {
        // append relevant data to resFormData
        for (let i = 0; i < resFormData.length; i++) {
            if (resFormData[i].type == "input" || resFormData[i].type == "numericInput" || resFormData[i].type == "textarea") {
                resFormData[i].data = ""
            } else if (resFormData[i].type == "checkbox") {
                // fill array of booleans based on number of checkbox options
                resFormData[i].data = []
                for (let j = 0; j < resFormData[i].checkboxOptions.length; j++) {
                    resFormData[i].data.push(false)
                }
            } else if (resFormData[i].type == "radio") {
                resFormData[i].data = -1
            }
        }
        setFormData(resFormData)
    }
    const [form] = Form.useForm();

    const screen = useBreakpoint();

    const onSortChange = (selection) => {
        console.log(selection)
        // expected return parameters: sort_ascending, sort_descending
    }

    const onSearch = (query) => {
        setSearchQuery(query)
    }

    const fetchFormData = () => {
        axios.get(`http://localhost:5000/api/formTemplate/form/${params.id}`).then(res => {
            setFormTitle(res.data[0].form_name)
            const resData = JSON.parse(res.data[0].form_template)
            onLoadFormData(resData)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        fetchFormData()
    }, [])

    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item href="/worker/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Link to="/worker/forms">
            <Breadcrumb.Item>Action Required</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Fill Form</Breadcrumb.Item>
        </Breadcrumb>
            <Row gutter={[24, 0]} style={{ marginBottom: 20 }}>
                <Col lg={15} md={24}>
                    <div style={{display:'flex'}}>
                        <Title level={2} style={{ marginBottom: 20, marginRight: 10 }}>
                                { isLoading ? "Loading..." : ("Filling Form: " + formTitle) }
                        </Title>
                    </div>
                </Col>
            </Row>


            <Card style={{ marginBottom: 20 }}>

                <Form labelCol={{ span: 8 }} 
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
                            form={form}
                            colon={false}>
                                {
                                    formElement.type === "input" ?
                                        <Input 
                                            placeholder=""
                                            required={formElement.required}
                                            onChange={(e) => {
                                                setFormData(formData => {
                                                    var newFormData = [...formData]
                                                    newFormData[formElement.position].data = e.target.value
                                                    return newFormData
                                                })
                                            }}
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
                                        onChange={(e) => {
                                            setFormData(formData => {
                                                var newFormData = [...formData]
                                                newFormData[formElement.position].data = e.target.value
                                                return newFormData
                                            })
                                        }}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        placeholder="" />
                                    : formElement.type === "textarea" ?
                                        <TextArea
                                        required={formElement.required}
                                        onChange={(e) => {
                                            setFormData(formData => {
                                                var newFormData = [...formData]
                                                newFormData[formElement.position].data = e.target.value
                                                return newFormData
                                            })
                                        }}
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
                                                                onChange={(e) => {
                                                                    console.log("Question Index " + formElement.position + ", Checkbox Option " + key + ": " + e.target.checked)
                                                                    // set element within formData[formElement.position].data[key] to e.target.checked
                                                                    setFormData(formData => {
                                                                        var newFormData = [...formData]
                                                                        newFormData[formElement.position].data[key] = e.target.checked
                                                                        return newFormData
                                                                    })
                                                                    console.log(formData)
                                                                }}
                                                                value={key}
                                                                >{option}</Checkbox> 
                                                            </Space>
                                                        </>
                                                    )
                                                }) 
                                            }
                                        </Space>
                                    : formElement.type === "radio" ?
                                        <Radio.Group onChange={(e) => {
                                            console.log("Question Index " + formElement.position + ", Radio Option " + e.target.value)

                                            setFormData(formData => {
                                                var newFormData = [...formData]
                                                newFormData[formElement.position].data = e.target.value
                                                return newFormData
                                            })
                                        }}
                                        >
                                        { formElement.radioOptions.map((option, key) => {
                                                return(
                                                    <Col span={24}>  
                                                        <Space direction="horizontal">
                                                            <Radio
                                                            value={key}
                                                            required={formElement.required}
                                                            >{option}</Radio> 
                                                        </Space>
                                                    </Col>
                                                )
                                            }) 
                                        }
                                        </Radio.Group>
                                    : null
                                }
                            </Form.Item>
                        )
                    })
                    }

                    <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                    {
                    Object.keys(formData).length > 0 ?
                        <Space wrapperCol={ { span: 4} }>
                                <Button type="primary" htmlType='submit'>
                                Submit Form
                                </Button>
                                <Link to ="/worker/forms">
                                    <Button type="default">
                                    Cancel
                                    </Button>
                                </Link>
                        </Space>
                        :
                        <Space wrapperCol={ { span: 4} } style= {{
                            paddingTop: "0.5em"
                        }}>
                                <Link to ="/worker/forms">
                                    <Button type="default">
                                    Back
                                    </Button>
                                </Link>
                        </Space>
                    }
                    </Form.Item> 
                </Form>
            </Card>
        </>
    )
}

export default Fill;
