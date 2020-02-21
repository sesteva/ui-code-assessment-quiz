import { interpret } from 'xstate'
import { quizMachine} from '../index'
import { fixture } from './fixture'

// http mocking
const machine = quizMachine(2).withConfig({
  services: { 
    getQuestions: (_, __) => async () => ({results: fixture}) 
  }
})

describe('Example of how to test the state machine', ()=>{
  it('should get 2 questions and randomize them', (done)=>{
      const quiz = interpret(machine).onTransition(state => {       
        if(state.matches("question")){
          expect(state.context.data).toHaveLength(2)
          expect(state.context.data).not.toEqual(fixture.slice(0, 2) )
          done()
        }
      }).start()  
      quiz.send('START')  
  })
})

