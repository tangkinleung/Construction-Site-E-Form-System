import React, { useState, useEffect } from 'react'
import SortDropdown from '../../components/SortDropdown';
import SearchInput from '../../components/SearchInput';
import FormCard from '../../components/FormCard';
import { HomeOutlined, FormOutlined, } from '@ant-design/icons';
import { useIntl, useModel } from 'umi';
import request from 'umi-request';
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
    Row,
    Col,
    Grid
} from 'antd';
const { Option } = Select;
const { Title } = Typography;
const { useBreakpoint } = Grid;
function Forms(props) {
    const [userLoginState, setUserLoginState] = useState({});
    const [params, setParams] = useState(props.match.params);
    const [sortDirection, setSortDirection] = useState('desc');
    const [type, setType] = useState('account');
    const { initialState, setInitialState } = useModel('@@initialState');
    const intl = useIntl();
    const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    }
    const screen = useBreakpoint();
    const [searchQuery, setSearchQuery] = useState("")
    const [projectTitle, setProjectTitle] = useState("Loading...")
    const [forms, setForms] = useState([])

    const fetchProjectInfo = async () => {
        const response = await request('http://localhost:5000/api/Project/' + params.id, {
            params,
        }).then(res => {
            try {
                setProjectTitle(res[0].title)
            } catch (error) {
                console.log(error)
            }
        });
    }

    const fetchFormsForProject = async (sortDir) => {
        const response = await request('http://localhost:5000/api/formTemplate/' + params.id, {
            params,
        }).then(res => {
            try {
                if (res == [] || res == null) {
                    setForms([])
                } else {
                    // remove forms that have is_in_bin = true
                    let filteredForms = res.filter(form => form.is_in_bin == false)
                    if (sortDir == 'asc') {
                        filteredForms.sort((a, b) => {
                            return a.form_id - b.form_id
                        })
                    } else {
                        filteredForms.sort((a, b) => {
                            return b.form_id - a.form_id
                        })
                    }
                    setForms(filteredForms)
                }
            } catch (error) {
                console.log(error)
            }
        });
    }
    
    useEffect(() => {
        fetchProjectInfo();
        fetchFormsForProject(sortDirection);
    }, [])

    const onSortChange = (selection) => {
        console.log(selection)
        // expected return parameters: sort_ascending, sort_descending
        if (selection == "sort_ascending") {
            setSortDirection('asc')
            fetchFormsForProject('asc')
        } else {
            setSortDirection('desc')
            fetchFormsForProject('desc')
        }
    }

    const editTriggered = () => {
        alert("edit button was triggered")
    }

    const onSearch = (query) => {
        setSearchQuery(query)
    }
    
    return (
        <>
        <Breadcrumb style={{marginBottom: "15px"}}>
            <Breadcrumb.Item href="/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/manager/projects">
                <span>Project Management</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>View Projects</Breadcrumb.Item>
        </Breadcrumb>

            {/* responsive header */}
            <Row gutter={[24, 0]} style={{ marginBottom: 20 }}>
                <Col xl={12} lg={24}>
                    <div style={{display:'flex'}}>
                        <Title level={2} style={{ marginBottom: 20, marginRight: 10 }}>
                                {projectTitle}
                        </Title>
                        <SearchInput label="Search" placeholder="Enter Form Name" btnLabel="Search" onSearch={(e) => onSearch(e)}/>
                    </div>
                </Col>
                <Col xl={12} lg={24} >
                        <div style={{ display: 'flex', flexDirection: 'row', float:(screen.xl == true) ? 'right' : 'left' }}>
                            <SortDropdown onSortChange={(e) => onSortChange(e)}/>
                            <Link to={"/manager/projects/manage/" + params.id + "/createForm"}>
                                <Button type="primary" className="btnManage" style={{ marginLeft: 10, marginTop: 7 }} >
                                    <FormOutlined /> Create Form
                                </Button>
                            </Link>
                        </div>
                </Col>
            </Row>
        
        { forms.length == 0 ?
            <Card style={{ 
                paddingTop: 20,
                marginBottom: 20,
                textAlign: 'center',
                }} >
                    <p>There are no forms for this project yet.</p>
            </Card>
        :
        forms.map((form) => {
            return (
                form.form_name.toLowerCase().includes(searchQuery.toLowerCase()) ?
                <FormCard title={form.form_name} 
                desc={form.form_desc} 
                isDraft={form.is_draft}
                objectRef={form.form_id}
                editTriggered={() => editTriggered()}
                projectId={params.id}
                />
                :
                null // don't render projectcard if doesnt match searchquery
            )
        })}
        </>
    )
}

export default Forms
