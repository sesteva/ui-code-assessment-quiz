
const isTheLastQuestion = (context, event) => typeof event.payload !== "undefined" && context.data.length === context.answers.total

const didAnswer = (_, event) => typeof event.payload !== "undefined"                          

export const guards = {
  didAnswer,
  isTheLastQuestion
}