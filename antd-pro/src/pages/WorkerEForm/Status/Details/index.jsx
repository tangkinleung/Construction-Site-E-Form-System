import React, { useState, useEffect } from 'react'
import {
    Breadcrumb,
    Select,
    Button,
    Typography,
    Space,
    Card,
    Col,
    Row,
    Tag,
    Grid
} from 'antd';
import axios from 'axios';
import {
    HomeOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import FormRenderer from '../../../ManagerEForm/components/FormRenderer'
const { Option } = Select;
const { Title } = Typography;
const { useBreakpoint } = Grid;

function WorkerFormSubmissionDetails(props) {

    let colors = ["processing", "green", "red"]
    let status = ["Pending", "Approved", "Rejected"]
    const screen = useBreakpoint();
    const [submission, setSubmissionData] = useState(null)
    const [params, setParams] = useState(props.match.params);
    const onSortChange = (selection) => {
        console.log(selection)
        // expected return parameters: sort_ascending, sort_descending
    }

    const onSearch = (query) => {
        console.log(query)
    }



    const fetchSubmissionData = () => {
        axios.get(`http://localhost:5000/api/formSubmissions/${params.submissionId}`).then(res => {
            setSubmissionData(res.data[0])
            console.log(res.data[0])
        })
    }
    useEffect(() => {
        fetchSubmissionData()
    }, [])

    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item href="/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/worker/status">Form Management</Breadcrumb.Item>
            <Breadcrumb.Item>Submission Details</Breadcrumb.Item>
        </Breadcrumb>

                {/* responsive header */}
                <Row gutter={[24, 0]} style={{ marginBottom: 20 }}>
                    <Col lg={15} md={24}>
                        <div style={{display:'flex'}}>
                            <Title level={2} style={{ marginBottom: 0, marginRight: 10 }}>
                                {submission != null ? ("Submission #" + submission.submission_id) : "Loading.."}
                            </Title>
                        </div>
                    </Col>
                </Row>

                {/*Hardcoded cards as dummy forms*/}
                {/* start of cards*/}
                <div>
                    <Row justify="left" align="stretch" gutter={[16,24]} style={{ display:'flex', flex: "1 1 0px", flexDirection:"row" }}>
                            {/* <Col xs={24} sm={12} md={8}>  */}
                            {  submission != null ?
                                <Col xs={24} sm={24} md={24} style={{ }}> 
                                <Card 
                                // size="large" 
                                title={
                                    
                                    (
                                        <div style={{
                                            display:'flex',
                                            flexDirection:'column',
                                            justifyContent:'space-between',
                                            height:"100%"
                                        }}>
                                                <div style={{ height:'100%' }}> 
                                                    <p style={{textAlign:"left"}}>
                                                        <b>Form Name:</b> {submission.form_name}
                                                        <br/>
                                                        <b>Project Title:</b> {submission.project_title}
                                                        <br/>
                                                        <b>Submitted Date:</b> {submission.created_date.substring(0,10)}
                                                        <br/>
                                                            <Tag color={colors[submission.form_status]} key={submission.form_status}>
                                                            <b>
                                                                Status:
                                                            </b>  {status[submission.form_status]}
                                                            </Tag>

                                                            { submission.form_status == 2 ? 
                                                            <><br/>
                                                            <Tag style={{ marginTop:"1em"}} color={'orange'} key={submission.form_status}>
                                                                <b>Rejection Reason:</b>&nbsp;{submission.reject_reason}
                                                            </Tag></>
                                                            :null}
                                                        {/* todo: confirm if name should be used instead of id  */} 
                                                        <br/>
                                                    </p>
                                                </div>
                                        </div>
                                    )
                                }
                                style={{ height:"100%" }}
                                bodyStyle={{
                                    height:"80%"
                                }} >
                                    {
                                        submission != null ?
                                            <FormRenderer data={submission.submission_data} test={"hello"} />
                                            :
                                            <div>Loading...</div>
                                    }
                                </Card> 
                                </Col>
                            : null }
                    </Row>
                </div>
            </>
    )
}

{/* Add padding into button but not sure where to add
    .review-button-ghost-wrapper {
    padding: 26px 16px 16px;
    background: rgb(190, 200, 200);
    } 
*/}
export default WorkerFormSubmissionDetails
