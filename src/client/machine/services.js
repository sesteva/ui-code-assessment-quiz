import shuffle from "lodash.shuffle";

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
export const services = {
  getQuestionsAndRandomize
}