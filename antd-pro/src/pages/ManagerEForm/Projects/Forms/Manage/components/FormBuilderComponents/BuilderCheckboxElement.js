import React, { useState, useEffect } from 'react'
import {
    Form,
    Input,
    Checkbox,
    Switch,
    Button,
    Space,
} from 'antd';

import QuestionModifier from './QuestionModifier';

import { CloseOutlined } from '@ant-design/icons';

function BuilderCheckboxElement(props) {
    const [inputText, setInputText] = useState(props.question)
    const [checkboxOptions, setCheckboxOptions] = useState(props.options)
    
    const refreshCheckboxOptions = () => {
        props.onChangeCheckboxOptions(props.position, checkboxOptions)
    }
    useEffect(() => {
        refreshCheckboxOptions()
    }, [checkboxOptions])

    return (
    <>  
        <Form.Item label={"Question " + (props.position+1)}>
            <Input 
            placeholder="Enter Question"
            value = {inputText}
            onChange={(e) => {
                setInputText(e.target.value)
                props.onChangeQuestion(props.position, e.target.value)
                // probably would be more optimal to only save the text to object states when move/submit/save is triggered
            }}
            style={{
                marginBottom: 15
            }}
            />
            <Space direction='vertical'>
            { checkboxOptions.map((option, key) => {
                    return(
                        <>  
                            <Space direction="horizontal">
                                <Checkbox disable/> 
                                <Input 
                                
                                value={option} 
                                key={key}
                                onChange={(e) => {
                                    let index = key
                                    setCheckboxOptions(checkboxOptions.map((option, key) => {
                                        if (key === index) {
                                            return e.target.value
                                        } else {
                                            return option
                                        }
                                    }))
                                }}/> 
                                { key !== 0 &&
                                    <Button
                                    onClick={ async () => {
                                            setCheckboxOptions(checkboxOptions.filter((option, thisKey) => {
                                                return key !== thisKey
                                            }))
                                        }
                                    }
                                    ><CloseOutlined /></Button>
                            }
                            </Space>
                        </>
                    )
                }) 
            }
            <Button 
            style={{ width:"100%" }}
            onClick={() => {
                setCheckboxOptions([...checkboxOptions, ""])
            }}
            >+ Add Option</Button>
            </Space>
            <QuestionModifier
            type="Checkbox"
            questionListSize={props.questionListSize}
            required={props.required}
            position={props.position}
            onChangeRequired={(e) => { props.onChangeRequired(props.position, e)}}
            onTriggerPositionChange={(e) => { props.onTriggerPositionChange(props.position, e)}} // +1 
            onDelete={() => { props.onTriggerDelete(props.position) }}
            />
        </Form.Item>
    </>
    )
}

export default BuilderCheckboxElement
