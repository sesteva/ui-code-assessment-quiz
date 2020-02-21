import { Machine } from "xstate";
import { services } from './services'
import { actions, defaultContext } from './actions'
import { guards } from "./guards"

// We can play /test/discuss with the machine here -> https://xstate.js.org/viz/?gist=c48d51f8787b9a09bee29e816c452e1d
// This is reusable across React, Angular, Vue, Server side, etc....

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
