import { assign } from "xstate";
import shuffle from "lodash.shuffle";

const incrementDisplayedQuestions = assign({
  answers: (context, __) => ({
    ...context.answers,
    total: context.answers.total + 1
  })
});

const pickNextQuestion = assign({
  display: (context, __) => {
    const questionIndex =
      context.display === null ? 0 : context.display.index + 1;
    return {
      ...context.data[questionIndex],
      index: questionIndex
    };
  }
});

const logResponse = assign({
  answers: ({ answers, display }, { payload }) => {
    const { correct, incorrect } = answers;
    let isCorrect
    
    switch(display.type) {
      case "boolean":
        isCorrect = payload === display.correct_answer;
        break;
      default:
        isCorrect = display.correct_answer.indexOf(payload) > -1      
    }        

    return {
      ...answers,
      correct: isCorrect ? correct + 1 : correct,
      incorrect: isCorrect ? incorrect : incorrect + 1
    };
  }
});

const calculateScore = assign({
  answers: ({ answers }, __) => {
    const { correct, total } = answers;
    const ratio = correct / total;
    return {
      ...answers,
      score: ratio.toFixed(2)
    };
  }
});

const setDefaultContext = assign((context, __) => {
  return {
    ...defaultContext,
    questionSetSize: context.questionSetSize      
  }
})

const randomizeQuestions = assign({
  data: (context, event) => {    
    const shuffled = shuffle(event.data.results);
    return shuffled.slice(0, context.questionSetSize)    
  }
})

export const defaultContext = {
  data: [],
  display: null,
  answers: {
    correct: 0,
    incorrect: 0,
    total: 0,
    score: 0
  }
}

export const actions = {
  incrementDisplayedQuestions,
  pickNextQuestion,
  logResponse,
  calculateScore,
  setDefaultContext,
  randomizeQuestions
}