import React from 'react'
import SortDropdown from '../components/SortDropdown';
import SearchInput from '../components/SearchInput';


import {
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
import {
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

function FormTemplate() {
    const screen = useBreakpoint();
    const onSortChange = (selection) => {
        console.log(selection)
        // expected return parameters: sort_ascending, sort_descending
    }

    const onSearch = (query) => {
        console.log(query)
    }
    return (

        <>
                {/* responsive header */}
                <Row gutter={[24, 0]} style={{ marginBottom: 20 }}>
                    <Col lg={15} md={24}>
                        <div style={{display:'flex'}}>
                            <Title level={2} style={{ marginBottom: 20, marginRight: 10 }}>
                                    Form Templates
                            </Title>
                            <SearchInput label="Search" placeholder="Enter Form Template" btnLabel="Search" onSearch={(e) => onSearch(e)}/>
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
                <div>
                    <Row justify="space-between" align="middle" gutter={[16,24]}>
                        <Col xs={36} sm={18} md={12}> 
                            <Card size="small" title="Form Template 1" style={{textAlign:"center"}} >
                                <p style={{textAlign:"center"}}>
                                    Form to be added here<br/>
                                    
                                    <br/>
                                    
                                    <Button type="primary" >
                                        Use Template
                                    </Button>
                                </p>
                            </Card> 
                        </Col>

                        <Col xs={36} sm={18} md={12}>
                            <Card size="small" title="Form Template 2" style={{textAlign:"center"}} >
                                <p style={{textAlign:"center"}}>
                                    Form to be added here<br/>
                                    
                                    <br/>
                                    
                                    <Button type="primary" >
                                        Use Template
                                    </Button>
                                </p>
                            </Card> 
                        </Col>

                    </Row>
                </div>
            </>
    )
}


export default FormTemplate
