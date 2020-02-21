import React from 'react';
import {decode} from 'he'
import { TextAnswer, MultipleChoiceAnswer} from './Answers'
import Card from 'antd/es/card'
import 'antd/es/card/style/css'; 

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
