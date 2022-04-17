import React, { useState, useEffect } from 'react'
import SortDropdown from '../components/SortDropdown';
import SearchInput from '../components/SearchInput';
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
const { Option } = Select;
const { Title } = Typography;
const { useBreakpoint } = Grid;
import ApproveReject from './ApproveReject';
function ManagerFormReview() {
    const screen = useBreakpoint();
    const [submissionData, setSubmissionData] = useState([])
    const [refreshSubmission, setRefreshSubmission] = useState(0)
    const [sortDirection, setSortDirection] = useState('desc')
    const onSortChange = (selection) => {
        console.log(selection)
        // expected return parameters: sort_ascending, sort_descending
        if (selection == "sort_ascending") {
            fetchSubmissionData("asc")
            setSortDirection('asc')
        } else {
            fetchSubmissionData("desc")
            setSortDirection('desc')
        }
        setRefreshSubmission(refreshSubmission+1)
    }

    const onSearch = (query) => {
        console.log(query)
    }



    const fetchSubmissionData = (order) => {
        axios.get(`http://localhost:5000/api/formSubmissions/pending`).then(res => {
            res.data.sort((a, b) => {
                if (order == "desc") {
                    return b.submission_id - a.submission_id
                } else {
                    return a.submission_id - b.submission_id
                }
            })
            setSubmissionData(res.data)
        })
    }
    useEffect(() => {
        fetchSubmissionData("desc")
    }, [])

    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item href="/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Pending Review</Breadcrumb.Item>
        </Breadcrumb>
        
                {/* responsive header */}
                <Row gutter={[24, 0]} style={{ marginBottom: 20 }}>
                    <Col lg={15} md={24}>
                        <div style={{display:'flex'}}>
                            <Title level={2} style={{ marginBottom: 0, marginRight: 10 }}>
                                    Pending Review
                            </Title>
                            {/* <SearchInput label="Search" placeholder="Enter Form Name" btnLabel="Search" onSearch={(e) => onSearch(e)}/> */}
                        </div>
                    </Col>
                    <Col lg={9} md={24} >
                            <div style={{ display: 'flex', flexDirection: 'row', float:(screen.lg == true) ? 'right' : 'left' }}>
                                <SortDropdown onSortChange={(e) => onSortChange(e)}/>
                            </div>
                    </Col>
                </Row>

                {/*Hardcoded cards as dummy forms*/}
                {/* start of cards*/}
                <Row justify="left" align="stretch" gutter={[16,24]} style={{ display:'flex', flex: "1 1 0px", flexDirection:"row" }} key={refreshSubmission}>
                    { submissionData.length > 0 ? submissionData.map((submission, index) => {
                        return(
                            <Col xs={24} sm={12} md={8} style={{ }} key={index}> 
                            <Card 
                                
                            title={("Submission #" + submission.submission_id)} 
                            extra={<a href={("/manager/formreview/" + submission.submission_id)}>Details</a>}
                            style={{ height:"100%" }}
                            bodyStyle={{
                                height:"80%"
                            }} >
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
                                    <ApproveReject submissionId={submission.submission_id} refreshData={() => { fetchSubmissionData(sortDirection) }}/>
                                </div>
                                </Card> 
                            </Col>
                        )
                    })
                    :
                    <Col xs={24} sm={24} md={24} style={{ }}> 
                    <Card>
                        <p style={{ marginTop:"1em" }}>There are no submissions pending review.</p>
                    </Card>
                    </Col>
                }
                </Row>
            </>
    )
}

{/* Add padding into button but not sure where to add
    .review-button-ghost-wrapper {
    padding: 26px 16px 16px;
    background: rgb(190, 200, 200);
    } 
*/}
export default ManagerFormReview
