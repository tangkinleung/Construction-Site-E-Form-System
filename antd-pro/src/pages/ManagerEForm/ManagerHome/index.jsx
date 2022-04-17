import {
    HomeOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Alert, Button, message, Tabs, Select, Typography, Space, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import NewsCard from '../components/NewsCard'

const { Option } = Select;
const { Title } = Typography;

const ManagerHome = () => {
    const [userLoginState, setUserLoginState] = useState({});
    const [type, setType] = useState('account');
    const { initialState, setInitialState } = useModel('@@initialState');
    const intl = useIntl();
    const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    }
    const [news, setNews] = useState([
        {
            project_title: 'Test',
            project_desc: 'New description',
        }
    ]);

    useEffect(() => {

    }, []);

    
    return (
        <>
        <Breadcrumb>
            <Breadcrumb.Item href="/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
        </Breadcrumb>
            <div style={{ display: 'flex', paddingTop: 0, justifyContent: 'space-between' }}>
                <Title level={2} style={{ marginBottom: 40 }}>
                    Manager Dashboard
                </Title>
            </div>
            
        <Card style={{ marginBottom: 200 }} >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Title level={4} style ={{marginBottom: 10}}>
                    <b>Latest News</b>
                </Title>

            </div>


            { news.map((ourNews) => {
                return (
                    ourNews.project_title.toLowerCase() ?
                    <NewsCard title={ourNews.project_title} 
                    text={ourNews.project_desc}
                    />
                    :
                    null 
                )
            })}
        </Card>
        </>
    );
};

export default ManagerHome;
