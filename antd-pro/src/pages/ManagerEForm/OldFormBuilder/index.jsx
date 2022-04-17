import React from 'react';
import { Form, Input, Select, Button, Space, Rate, InputNumber, Checkbox, Row, Col, Radio, Upload, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons'; //For Uploading of files
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'; //For pushing in stuff


// todo: revamp form builder
function FormBuilder() {
  const { Option } = Select; //For DropdownList

  const { RangePicker } = DatePicker; //For Calender

  //For Calender
function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}

//For Text Box with words countdown
const { TextArea } = Input;

const onChanges = e => {
    console.log('Change:', e.target.value);
};

const onFinish = values => {
    console.log('Received values of form: ', values);
};

//For uploading of files
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
    return e;
    }

    return e && e.fileList;
};

return (
    <Form name="complex-form" onFinish={onFinish}>

    {/* For Textbox */}
    <Form.List name="Customize">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item label="Textbox"
                {...restField}
                name={[name, 'text']}
                fieldKey={[fieldKey, 'text']}
                rules={[{ required: true, message: 'Input is required' }]}
                >
                <Input placeholder="Please input" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
            ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
                Add Textbox
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For DropdownList */}
    <Form.List name="DropdownList">
        {(fields, { add, remove }) => (
        <>
            {fields.map(field => (
            <Space key={field.key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                }
                >
                {() => (
                    <Form.Item
                    {...field}
                    label="DropdownList"
                    name={[field.name, 'DropdownList']}
                    fieldKey={[field.fieldKey, 'DropdownList']}
                    rules={[{ required: true, message: 'DropdownList is required' }]}
                    >
                    <Select placeholder="Select Dropdown">
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="C">C</Option>
                    </Select>
                    </Form.Item>
                )}
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
            </Space>
            ))}

            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
                Add DropdownList
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For Selecting MultipleList */}
    <Form.List name="MultipleList">
        {(fields, { add, remove }) => (
        <>
            {fields.map(field => (
            <Space key={field.key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) =>
                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                }
                >
                {() => (
                    <Form.Item
                    {...field}
                    label="Select[Multiple]"
                    name={[field.name, 'SelectMultiple']}
                    fieldKey={[field.fieldKey, 'SelectMultiple']}
                    rules={[{ required: true, message: 'Selection is required!', type: 'array'}]}
                    
                    >
                    <Select mode="multiple" placeholder="Please select favourite alphabets" style={{minWidth:'250px', maxWidth:'450px'}}>
                        <Option value="A">Alphabets A</Option>
                        <Option value="B">Alphabets B</Option>
                        <Option value="C">Alphabets C</Option>
                    </Select>
                    </Form.Item>
                )}
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
            </Space>
            ))}

            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
                Add Select Multiple List
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For Rating */}
    <Form.List name="Rating">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField}) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item label="Rate"
                {...restField}
                name={[name, 'rate']}
                fieldKey={[fieldKey, 'rate']}
                rules={[{ required: true, message: 'Rating is required' }]}
                >
                <Rate />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
            ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
                Add Rating
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For Input Number */}
    <Form.List name="InputNumber">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField}) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item label="Input Number(Minimum 1 - Maximum 10)"
                {...restField}
                name={[name, 'number']}
                fieldKey={[fieldKey, 'number']}
                rules={[{ required: true, message: 'Number Input is required' }]}
                >
                <InputNumber min={1} max={10} />
                <span className="ant-form-text"> Number</span>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
            ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
            Add Input Number
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For Checkbox */}
    <Form.List name="Checkbox">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField}) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item label="Checkbox"
                {...restField}
                name={[name, 'Checkbox']}
                fieldKey={[fieldKey, 'Checkbox']}
                rules={[{ required: true, message: 'Checkbox is required' }]}
                >
                <Checkbox.Group>
                <Row>
                    <Col span={8}>
                    <Checkbox
                        value="A"
                        style={{
                        lineHeight: '32px',
                        }}
                    >
                        A
                    </Checkbox>
                    </Col>
                    <Col span={8}>
                    <Checkbox
                        value="B"
                        style={{
                        lineHeight: '32px',
                        }}
                        //disabled
                    >
                        B
                    </Checkbox>
                    </Col>
                    <Col span={8}>
                    <Checkbox
                        value="C"
                        style={{
                        lineHeight: '32px',
                        }}
                    >
                        C
                    </Checkbox>
                    </Col>
                    <Col span={8}>
                    <Checkbox
                        value="D"
                        style={{
                        lineHeight: '32px',
                        }}
                    >
                        D
                    </Checkbox>
                    </Col>
                    <Col span={8}>
                    <Checkbox
                        value="E"
                        style={{
                        lineHeight: '32px',
                        }}
                    >
                        E
                    </Checkbox>
                    </Col>
                    <Col span={8}>
                    <Checkbox
                        value="F"
                        style={{
                        lineHeight: '32px',
                        }}
                    >
                        F
                    </Checkbox>
                    </Col>
                </Row>
                </Checkbox.Group>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
            ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
            Add Checkbox
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For Radio */}
    <Form.List name="Radio">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField}) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item label="Radio"
                {...restField}
                name={[name, 'radio']}
                fieldKey={[fieldKey, 'radio']}
                rules={[{ required: true, message: 'Radio Selection is required' }]}
                >
                <Radio.Group>
                <Radio value="A">Item A</Radio>
                <Radio value="B">Item B</Radio>
                <Radio value="C">Item C</Radio>
                </Radio.Group>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
            ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
            Add Radio Button
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For Upload Files */}
    <Form.List name="Upload">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField}) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item label="Upload Files"
                {...restField}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                name={[name, 'Upload']}
                fieldKey={[fieldKey, 'Upload']}
                rules={[{ required: true, message: 'Uploading of file is required' }]}
                >
                <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
            ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
            Add Upload Files
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For Calender */}
    <Form.List name="Calender">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField}) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item label="Date"
                {...restField}
                name={[name, 'Calender']}
                fieldKey={[fieldKey, 'Calender']}
                rules={[{ required: true, message: 'Calender Selection is required' }]}
                >
                <RangePicker
                format="YYYY-MM-DD"
                onChange={onChange}
                />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
            ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
            Add Calendar
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For AreaTextBox */}
    <Form.List name="AreaTextBox">
        {(fields, { add, remove }) => (
        <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 10 }} align="baseline">
                <Form.Item label="AreaTextBox"
                {...restField}
                name={[name, 'AreaTextBox']}
                fieldKey={[fieldKey, 'AreaTextBox']}
                rules={[{ required: true, message: 'Text Input is required' }]}
                >
                <TextArea showCount maxLength={500} onChanges={onChanges} style={{ width: '600px'}} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
            ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} style={{ width: '60%', marginTop: '20px' }} block icon={<PlusOutlined />}>
                Add AreaTextBox
            </Button>
            </Form.Item>
        </>
        )}
    </Form.List>

    {/* For Submit Button */}
    <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
        Submit
        </Button>
    </Form.Item>
    </Form>

);
}

export default FormBuilder