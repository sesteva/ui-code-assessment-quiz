import React from 'react';
import {decode} from 'he'
import Radio from 'antd/es/radio'
import Input from 'antd/es/input'
import 'antd/es/radio/style/css'; 
import 'antd/es/input/style/css'; 

export const TextAnswer = ({onChange, ...rest}) => {
  return (
    <div {...rest}>
      <Input placeholder="Please type your answer here" onChange={(evt)=> onChange(evt.target.value)} {...rest}/>
    </div>
  )
}

export const MultipleChoiceAnswer = ({onChange, options, ...rest}) => {
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

