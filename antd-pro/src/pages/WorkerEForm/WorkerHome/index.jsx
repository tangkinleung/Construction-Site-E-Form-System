import React, { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import {
    Breadcrumb,
    Select,
    Button,
    Typography,
    Space,
    Card,
    Grid,
    notification
} from 'antd';
import NewsCard from "../components/NewsCard"
const { Option } = Select;
const { Title } = Typography;
const { useBreakpoint } = Grid;

function WorkerHome() {
    const screen = useBreakpoint();
    const [news, setNews] = useState([
        {'title' : "Team 22 being awesome!", 
        'text' : 'Assembling a team of stars and heroes seems like good business. Surely a group of brilliant contributors should succeed and deliver outstanding results.',
        },
    ])

    const openNotification = () => {
        notification.open({
        message: <b>NOTIFICATION</b>,
        description:
            'You have 2 Form to fill up!',
        icon: <NotificationOutlined style={{ color: '#108ee9' }} />,
        duration: 0,
        });
        notification.open({
            message: <b>Testing</b>,
            description:
            'Testing to showcase what if there is another notification!',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            duration: 0,
        });
    };
                
        return (
            <>
        <Breadcrumb>
            <Breadcrumb.Item href="/worker/home">
                <HomeOutlined/>
            </Breadcrumb.Item>
        </Breadcrumb>
                <div style={{ display: 'flex', paddingTop: 0, justifyContent: 'space-between' }}>
                    <Title level={2} style={{ marginBottom: 40 }}>
                        Worker Dashboard
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
                            ourNews.title.toLowerCase() ?
                            <NewsCard title={ourNews.title} 
                            text={ourNews.text}
                            />
                            :
                            null // don't render projectcard if doesnt match searchquery
                        )
                    })}
                </Card>
            </>
        )
}
export default WorkerHome;