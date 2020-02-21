async function getQuestions(_,__) {
  try {
    const response = await fetch("http://localhost:4000/api/questions");
    const data = await response.json();
    return data
  } catch (err) {
    //TODO: do something here such as Log to monitoring, alert user, etc
    throw new Error(err)
  }
}
export const services = {
  getQuestions
}