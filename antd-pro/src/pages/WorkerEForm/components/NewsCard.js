import React, { useState } from 'react'
import { Card, Typography, Tag } from 'antd'
const { Title } = Typography;

function NewsCard(news) {
    return (
        
        <Card style={{ marginBottom: 20 }} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{textAlign:"left"}}>
                    <Title level={5}>
                        {news.title}
                    </Title>
                    <p>
                        {news.text}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default NewsCard
