
import React from 'react';
import Descriptions from 'antd/es/descriptions'
import Statistic from 'antd/es/statistic'
import 'antd/es/descriptions/style/css'
import 'antd/es/statistic/style/css'


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