import React, {useState} from 'react';
import { useMachine } from "@xstate/react"
import { quizMachine } from "./machine"
import Button from 'antd/es/button'
import { Summary } from './components/Summary'
import { QuestionCard } from './components/Question'
import 'antd/es/button/style/css'; 

export const Quiz = () =>{
  const [answer, setAnswer] = useState()  
  const quizMachineInstance = quizMachine(10)
  const [current, send] = useMachine(quizMachineInstance)  
  const {display, answers} = current.context

  function startQuiz(){
    send('START')
  }
  function nextQuestion(){
    send('NEXT', { payload: answer })
    setAnswer(undefined)
  }
  function restart(){
    send('RESTART')
  }

  // Note 1: Two techniques are used below to decide content to render (current.matches) or to hide ( custom attr data-show and css definition)
  // Note 2: The state machine abstracts all the logic and our DOM related components become simple.
  
  return (
    <div data-state={current.value}>  
        
      {current.matches("question") && <QuestionCard display={display} onChange={setAnswer} key={display.index}/>}
      {current.matches("summary") && <Summary results={answers} /> }
      {current.matches("failure") && <div>Error: {current.meta.message}</div>}
      
      <div className="buttons">
        <Button onClick={startQuiz} data-show="idle" type="primary">Start</Button>  
        <Button onClick={nextQuestion} data-show="question" type="primary">Next</Button>
        <Button onClick={restart} data-show="summary" type="primary">Restart</Button>
        <Button onClick={restart} data-show="failure" type="primary">Retry getting the questions</Button>
      </div>

    </div>
  )
}