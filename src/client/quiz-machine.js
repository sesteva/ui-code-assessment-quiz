import shuffle from "lodash.shuffle";
import { assign, Machine } from "xstate";

// We can play /test/discuss with the machine here -> https://xstate.js.org/viz/?gist=c48d51f8787b9a09bee29e816c452e1d
// This is reusable across React, Angular, Vue, Server side, etc....

async function getQuestionsAndRandomize(context, _) {
  try {
    const response = await fetch("http://localhost:4000/api/questions");
    const data = await response.json();
    const shuffled = shuffle(data.results);
    return shuffled.slice(0, context.questionSetSize)
  } catch (err) {
    //TODO: do something here such as Log to monitoring, alert user, etc
    throw new Error(err)
  }
}

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

const defaultContext = {
  data: [],
  display: null,
  answers: {
    correct: 0,
    incorrect: 0,
    total: 0,
    score: 0
  }
}

export const quizMachine = (questionSetSize = 3)=> Machine(
  {
    id: "quiz",
    initial: "idle",
    context: {
      questionSetSize,
      ...defaultContext
    },
    states: {
      idle: {
        on: {
          START: "gettingQuestions"
        }
      },
      gettingQuestions: {
        invoke: {
          src: "getQuestionsAndRandomize",
          onDone: {
            target: "question",
            actions: assign({
              data: (_, event) => event.data
            })
          },
          onError: {
            target: 'failure'
          }
        }
      },
      question: {
        entry: ["incrementDisplayedQuestions", "pickNextQuestion"],
        on: {
          NEXT: [
            {
              target: "summary",
              cond: (context, event) =>
                typeof event.payload !== "undefined" && context.data.length === context.answers.total,
              actions: "calculateScore"
            },
            { 
              target: "question",
              cond: (_, event) => typeof event.payload !== "undefined"                          
            }
          ]
        },
        exit: ["logResponse"]
      },
      failure:{
        on: {
          RETRY: 'gettingQuestions'
        },
        meta: {
          message: 'failed to retrieve the questions'
        }
      },
      summary: {
        on: {
          RESTART: {
            target: "gettingQuestions",
            actions: "setDefaultContext"
          }
        }
      }
    }
  },
  {
    actions: {
      incrementDisplayedQuestions,
      pickNextQuestion,
      logResponse,
      calculateScore,
      setDefaultContext
    },
    services: {
      getQuestionsAndRandomize
    }
  }
);
