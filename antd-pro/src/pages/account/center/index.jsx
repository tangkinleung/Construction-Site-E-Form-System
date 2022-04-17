import { PlusOutlined, NumberOutlined, ContactsOutlined, MailOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest } from 'umi';
import { queryCurrent } from './service';
import styles from './Center.less';


const TagList = ({ tags }) => {
  const ref = useRef(null);
  const [newTags, setNewTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showInput = () => {
    setInputVisible(true);

    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];

    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [
        ...tempsTags,
        {
          key: `new-${tempsTags.length}`,
          label: inputValue,
        },
      ];
    }

    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>Tags</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={showInput}
          style={{
            borderStyle: 'dashed',
          }}
        >
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

const Center = () => {
  const [tabKey, setTabKey] = useState('articles'); //  获取用户信息

  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  }); //  渲染用户信息

  const renderUserInfo = ({ title, email, phone }) => {
    return (
      <div className={styles.detail}>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          {title}
        </p>
        <p>
          <MailOutlined
            style={{
              marginRight: 8,
            }}
          />
          {email}
        </p>
        <p>
          <NumberOutlined
            style={{
              marginRight: 8,
            }}
          />
          {phone}
        </p>
       
      </div>
    );
  }; // 渲染tab切换

  

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={24} md={24}>
          <Card
            bordered={false}
            style={{
              marginBottom: 24,
            }}
            loading={loading}
          >
            {!loading && currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={currentUser.avatar} />
                  <div className={styles.name}>{currentUser.name}</div>
                  <div>{currentUser?.signature}</div>
                </div>
                {renderUserInfo(currentUser)}
                <Divider dashed />
                <TagList tags={currentUser.tags || []} />
                <Divider
                  style={{
                    marginTop: 16,
                  }}
                  dashed
                />
               
              </div>
            )}
          </Card>
        </Col>
        
      </Row>
    </GridContent>
  );
};

export default Center;
