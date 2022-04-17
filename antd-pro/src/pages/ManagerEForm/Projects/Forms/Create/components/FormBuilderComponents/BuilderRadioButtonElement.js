import React, { useState, useEffect } from 'react'
import {
    Form,
    Input,
    Radio,
    Switch,
    Button,
    Space,
} from 'antd';

import QuestionModifier from './QuestionModifier';
import { CloseOutlined } from '@ant-design/icons';
function BuilderRadioButtonElement(props) {
    const [inputText, setInputText] = useState(props.question)
    const [radioOptions, setRadioOptions] = useState(props.options)

    const refreshRadioOptions = () => {
        props.onChangeRadioOptions(props.position, radioOptions)
    }
    useEffect(() => {
        refreshRadioOptions()
    }, [radioOptions])
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
            { radioOptions.map((option, key) => {
                    return(
                        <>  
                            <Space direction="horizontal">
                                <Radio disable/> 
                                <Input 
                                value={option} 
                                key={key}
                                onChange={(e) => {
                                    let index = key
                                    setRadioOptions(radioOptions.map((option, key) => {
                                        if (key === index) {
                                            return e.target.value
                                        } else {
                                            return option
                                        }
                                    }))
                                }}/>

                                { key !== 0 &&
                                    <Button
                                    onClick={ () => {
                                        setRadioOptions(radioOptions.filter((option, thisKey) => {
                                                return key !== thisKey
                                            }))
                                        }
                                    }
                                    ><CloseOutlined /></Button>
                                }
                                {/* todo: pass changes on option value back to state, then back to parent component */}
                                {/* todo: include a option modifier component here? */}
                            </Space>
                        </>
                    )
                }) 
            }
            <Button 
            style={{ width:"100%" }}
            onClick={() => {
                setRadioOptions([...radioOptions, ""])
            }}
            >+ Add Option</Button>
            </Space>
            <QuestionModifier
            type="Radio"
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

export default BuilderRadioButtonElement
