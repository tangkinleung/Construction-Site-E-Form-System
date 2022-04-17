import React, { useState } from 'react'
import {
    Form,
    Input,
    Checkbox,
    Switch,
    Space,
} from 'antd';

import QuestionModifier from './QuestionModifier';
function BuilderInputElement(props) {
    const [inputText, setInputText] = useState(props.question)
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
            <Input disabled placeholder="Input Field" />
            <QuestionModifier
            type="Input Field"
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

export default BuilderInputElement
