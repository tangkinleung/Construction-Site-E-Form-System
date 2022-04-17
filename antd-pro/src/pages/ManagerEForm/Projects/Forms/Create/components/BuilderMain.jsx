import React, { useState, useEffect } from 'react';
import {
Form,
Select,
Input,
DatePicker,
Switch,
Slider,
Button,
Rate,
Typography,
Space,
Divider,
} from 'antd';
import AddButton from './FormBuilderComponents/AddButton'
import BuilderInputElement from './FormBuilderComponents/BuilderInputElement'
import BuilderNumericInputElement from './FormBuilderComponents/BuilderNumericInputElement'
import BuilderTextAreaElement from './FormBuilderComponents/BuilderTextAreaElement'
import BuilderCheckboxElement from './FormBuilderComponents/BuilderCheckboxElement'
import BuilderRadioButtonElement from './FormBuilderComponents/BuilderRadioButtonElement'
import { forEach } from 'lodash-es';
const { Option } = Select;
const { Title } = Typography;

const BuilderMain = (props) => {
        
    const [formElements, changeFormElements] = useState(props.formElements)

useEffect(() => {
    // send default form elements to parent on first render
    props.setFormElements(formElements)
}, [formElements])

const setFormElements = (newFormElements) => {
    // logic to pass data to parent
    props.setFormElements(newFormElements)
    changeFormElements(newFormElements)
}

const addElement = (type) => {
    let newInput = {}
    let newPos = formElements[formElements.length-1].position + 1
    if (type == "input") {
        newInput = { 
            position: newPos,
            key: newPos,
            type: "input",
            question: "",
            required: false
        }
        setFormElements([...formElements, newInput])
    } else if (type == "checkbox") {
        newInput = { 
            position: newPos,
            key: newPos,
            type: "checkbox",
            question: "",
            checkboxOptions: ["Option 1", "Option 2"],
            required: false
        }
        setFormElements([...formElements, newInput])
    } else if (type == "radio") {
        newInput = { 
            position: newPos,
            key: newPos,
            type: "radio",
            question: "",
            radioOptions: ["Option 1", "Option 2"],
            required: false
        }
        setFormElements([...formElements, newInput])
    } else if (type == "numericInput") {
        newInput = { 
            position: newPos,
            key: newPos,
            type: "numericInput",
            question: "",
            required: false
        }
        setFormElements([...formElements, newInput])
    } else if (type == "textarea") {
        newInput = { 
            position: newPos,
            key: newPos,
            type: "textarea",
            question: "",
            required: false
        }
        setFormElements([...formElements, newInput])
    } else {
    alert("Unsupported Element")
    }
} 

const updateRequired = (position, value) => {
    let newFormElements = [...formElements];
    newFormElements[position].required = value;
    setFormElements(newFormElements)
}

const updateQuestion = (position, question) => {
    let newFormElements = [...formElements];
    newFormElements[position].question = question;
    setFormElements(newFormElements)
}

const updateCheckboxOptions = (position, checkboxOptions) => {
    let newFormElements = [...formElements];
    newFormElements[position].checkboxOptions = checkboxOptions;
    setFormElements(newFormElements)
}

const updateRadioOptions = (position, radioOptions) => {
    let newFormElements = [...formElements];
    newFormElements[position].radioOptions = radioOptions;
    setFormElements(newFormElements)
}

const updatePosition = (currentPosition, delta) => {
    let newFormElements = [...formElements];
    var swap = newFormElements[currentPosition]
    newFormElements[currentPosition] = newFormElements[currentPosition+delta]
    newFormElements[currentPosition+delta] = swap
    newFormElements[currentPosition+delta].position = currentPosition + delta
    newFormElements[currentPosition].position = currentPosition
    setFormElements(newFormElements)
}

const deletePosition = (position) => {
    let newFormElements = [];
    let tempElements = [...formElements];
    tempElements.splice(position, 1)
    forEach(tempElements, (element, index) => {
        if (index < position) {
            newFormElements.push(element)
        } else {
            let tempElement = {...element}
            tempElement.position = index // replace position with index (position-1)
            newFormElements.push(tempElement)
        }
    })
    setFormElements(newFormElements)
}

return (
<>
    <Divider>Customise Form</Divider>
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 0 }}
    style={{ backgroundColor : "#fff", minWidth: "100%" }}>
    {
        formElements != null && formElements.length > 0 ?
        formElements.map((e) => {
        if (e.type == "input") {
            return (
            <BuilderInputElement
            key={e.key}
            position={e.position}
            question={e.question}
            required={e.required}
            questionListSize={formElements.length}
            onChangeRequired={(position, value) => {
                updateRequired(position, value)
            }}
            onChangeQuestion={(position, value) => {
                updateQuestion(position, value)
            }}
            onTriggerPositionChange={(position, changeValue) => {
                updatePosition(position, changeValue)
            }}
            onTriggerDelete={(position) => {
                deletePosition(position)
            }}
            />
            )
        } else if (e.type == "checkbox") {
            
            return (
                <BuilderCheckboxElement
                key={e.key}
                position={e.position}
                question={e.question}
                required={e.required}
                options={e.checkboxOptions}
                questionListSize={formElements.length}
                onChangeRequired={(position, value) => {
                    updateRequired(position, value)
                }}
                onChangeQuestion={(position, value) => {
                    updateQuestion(position, value)
                }}
                onChangeCheckboxOptions={(position, value) => {
                    updateCheckboxOptions(position, value)
                }}
                onTriggerPositionChange={(position, changeValue) => {
                    updatePosition(position, changeValue)
                }}
                onTriggerDelete={(position) => {
                    deletePosition(position)
                }}
                />
                )

        } else if (e.type == "radio") {

            
            return (
                <BuilderRadioButtonElement
                key={e.key}
                position={e.position}
                question={e.question}
                required={e.required}
                options={e.radioOptions}
                questionListSize={formElements.length}
                onChangeRequired={(position, value) => {
                    updateRequired(position, value)
                }}
                onChangeQuestion={(position, value) => {
                    updateQuestion(position, value)
                }}
                onChangeRadioOptions={(position, value) => {
                    updateRadioOptions(position, value)
                }}
                onTriggerPositionChange={(position, changeValue) => {
                    updatePosition(position, changeValue)
                }}
                onTriggerDelete={(position) => {
                    deletePosition(position)
                }}
                />
                )
        
        } else if (e.type == "numericInput") {

            return (
                <BuilderNumericInputElement
                key={e.key}
                position={e.position}
                question={e.question}
                required={e.required}
                questionListSize={formElements.length}
                onChangeRequired={(position, value) => {
                    updateRequired(position, value)
                }}
                onChangeQuestion={(position, value) => {
                    updateQuestion(position, value)
                }}
                onTriggerPositionChange={(position, changeValue) => {
                    updatePosition(position, changeValue)
                }}
                onTriggerDelete={(position) => {
                    deletePosition(position)
                }}
                />
                )
        } else if (e.type == "textarea") {

            return (
                <BuilderTextAreaElement
                key={e.key}
                position={e.position}
                question={e.question}
                required={e.required}
                questionListSize={formElements.length}
                onChangeRequired={(position, value) => {
                    updateRequired(position, value)
                }}
                onChangeQuestion={(position, value) => {
                    updateQuestion(position, value)
                }}
                onTriggerPositionChange={(position, changeValue) => {
                    updatePosition(position, changeValue)
                }}
                onTriggerDelete={(position) => {
                    deletePosition(position)
                }}
                />
                )
        } else if (e.type == "") {

        }
        })
        :
        <p>There are no elements in this form.</p>
    }
    <AddButton addElement={(type) => {
        addElement(type)
    }}/>
    
    </Form>
</>
)};

export default BuilderMain;