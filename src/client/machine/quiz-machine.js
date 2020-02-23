import { Machine } from "xstate";
import { services } from './services'
import { actions, defaultContext } from './actions'
import { guards } from "./guards"

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
          src: "getQuestions",
          onDone: {
            target: "question",
            actions: "randomizeQuestions"
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
              cond: "isTheLastQuestion",
              actions: "calculateScore"
            },
            { 
              target: "question",
              cond: "didAnswer"
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
    actions,
    services,
    guards
  }
);
