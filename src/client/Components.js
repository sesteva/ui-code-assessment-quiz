import React from 'react';
import {decode} from 'he'
import Radio from 'antd/es/radio'
import Input from 'antd/es/input'
import Card from 'antd/es/card'
import Descriptions from 'antd/es/descriptions'
import Statistic from 'antd/es/statistic'
import 'antd/es/radio/style/css'; 
import 'antd/es/input/style/css'; 
import 'antd/es/card/style/css'; 
import 'antd/es/descriptions/style/css'
import 'antd/es/statistic/style/css'

export const QuestionCard = ({display, onChange,...rest})=>{  
  const {type,index,correct_answer, incorrect_answers, question} = display
  const title = decode(question)
  return (
    <div {...rest}>
      <Card title={title} style={{ width: 700 }}>
        {type === "text" && <TextAnswer onChange={onChange} key={index} data-show="question"/>}
        {type !== "text" && <MultipleChoiceAnswer onChange={onChange} key={index} options={[correct_answer, ...incorrect_answers]} data-show="question"/>}      
      </Card>
    </div>
  )
}

const TextAnswer = ({onChange, ...rest}) => {
  return (
    <div {...rest}>
      <Input placeholder="Please type your answer here" onChange={(evt)=> onChange(evt.target.value)} {...rest}/>
    </div>
  )
}

const MultipleChoiceAnswer = ({onChange, options, ...rest}) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <div {...rest}>
      <Radio.Group onChange={(evt) => onChange(evt.target.value)} checked={false} {...rest}>
        {options.map((option, index) => {
          return (
            <Radio style={radioStyle}  value={option} key={option}>
              {decode(option)}
            </Radio>
          )
        })}     
      </Radio.Group>
    </div>
  )
}

export const Summary = ({results, ...rest})=>{
  const { correct, incorrect, total, score} = results
  return (
    <div {...rest}>      
      <Descriptions title="Summary" bordered layout="vertical">
        <Descriptions.Item label="Correct answers">{correct}</Descriptions.Item>
        <Descriptions.Item label="Incorrect answers">{incorrect}</Descriptions.Item>
        <Descriptions.Item label="Total answers">{total}</Descriptions.Item>  
        <Descriptions.Item label="Final score">        
          <Statistic            
            value={score*100}                                   
            suffix="%"
          />
        </Descriptions.Item>        
      </Descriptions>
    </div>
  )
}