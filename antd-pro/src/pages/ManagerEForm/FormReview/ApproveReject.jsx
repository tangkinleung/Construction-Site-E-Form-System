import React, { useState } from 'react'
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
    Grid,
    message,
    Input,
    Spin
} from 'antd';
import axios from 'axios';
function ApproveReject(props) {
    const { TextArea } = Input;

    const [isLoading, setIsLoading] = useState(false)
    const [submissionId, setSubmissionId] = useState(props.submissionId)
    const [isRejecting, setIsRejecting] = useState(false)
    const [rejectReason, setRejectReason] = useState("")
    const approveSubmission = () => {
        setIsLoading(true)
        const data = {
            submission_id: submissionId,
        }
        
        const params = (new URLSearchParams(data)).toString();
        axios.post('http://localhost:5000/api/formSubmissions/manager/approve?' + params).then(res => {
            
            try {
                const redirect_id = res.data[0].project_id
                message.success("Submission Approved");
                setIsLoading(false)
                props.refreshData()
            } catch (error) {
                throw new Error("Approving Submission Failed")
                setIsLoading(false)
            }
           
        }).catch(err => {
            message.error("Submission Could Not Be Approved");
            setIsLoading(false)
        })
       
    }

    const rejectSubmission = () => {
        if (rejectReason == "") {
            message.warning("Please enter a reason for rejection")
        } else {
            setIsLoading(true)
            const data = {
                submission_id: submissionId,
                reject_reason: rejectReason,
            }
            
            const params = (new URLSearchParams(data)).toString();
            axios.post('http://localhost:5000/api/formSubmissions/manager/reject?' + params).then(res => {
                try {
                    const redirect_id = res.data[0].project_id
                    message.success("Submission Rejected");
                    setIsRejecting(false)
                    setIsLoading(false)
                    setRejectReason("")
                    props.refreshData()
                } catch (error) {
                    setIsRejecting(false)
                    setIsLoading(false)
                    setRejectReason("")
                    throw new Error("Rejecting Submission Failed")
                }
            }).catch(err => {
                message.error("Submission Could Not Be Rejected");
                setIsRejecting(false)
                setRejectReason("")
                setIsLoading(false)
            })
        }
    }
    return (
        <div className="review-button-ghost-wrapper" style={{ }}>
            { isLoading ? 
            <div style={{ display:'flex', justifyContent:'center' }}><Spin/></div> :
            isRejecting ?
            <div style={{ display:'flex', flexDirection:'column',  }}>
                <p>
                    Enter a reason for rejection:
                </p>
                <TextArea rows={4} onChange={(e) => setRejectReason(e.target.value)} style={{ marginBottom: "1em" }}/>
                <div>
                <Button type="secondary" danger style={{
                    marginRight:"2%",
                    width: "28%"
                }}
                onClick={() => {
                    setIsRejecting(false)
                    setRejectReason("")
                }}
                >
                    Cancel
                </Button>
                <Button type="primary" danger style={{
                    width: "70%"
                }}
                onClick={() => {
                    rejectSubmission()
                }}
                >
                    Confirm Rejection
                </Button>
                </div>
            </div>
            :
            <>
            <Button 
            type="primary" 
            style={{
                marginRight:"2%",
                width: "49%"
                }}
            onClick={() => {
                approveSubmission()
            }}
            >
                Approve
            </Button>
            <Button type="primary" danger style={{
                width: "49%"
            }}
            onClick={() => {
                setIsRejecting(true)
            }}>
                Reject
            </Button>
            </>
            }
        </div>
    )
}

export default ApproveReject