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
import { history } from 'umi'
import {
    HomeOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
    MinusCircleOutlined,
} from '@ant-design/icons';
import FormRenderer from '../../components/FormRenderer'
import ApproveReject from '../ApproveReject';
const { Option } = Select;
const { Title } = Typography;
const { useBreakpoint } = Grid;

function ManagerFormReviewDetails(props) {
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
            <Breadcrumb.Item href="/manager/formreview">Pending Review</Breadcrumb.Item>
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
                                                        <b>Submitted By:</b> {submission.submitted_by} 
                                                        {/* todo: confirm if name should be used instead of id  */} 
                                                        <br/>
                                                    </p>
                                                </div>
                                                <ApproveReject submissionId={submission.submission_id} refreshData={() => { history.push("/manager/formreview") }}/>
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
export default ManagerFormReviewDetails
