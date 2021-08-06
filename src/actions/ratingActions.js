export const STATUS_RATING = 'STATUS_RATING';

export const addRating = (id, rating, initialRating) => dispatch => {
  let url = 'https://my-json-server.typicode.com/AckeeCZ/web-task-cookbook-fake-api/recipes/'+ id +'/ratings';
  let score = parseInt(rating, 10);
  let statusCode, statusText;


  if (initialRating===0) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({score: +score})
    })
    .then(results => {
      statusCode = results.status;
      statusText = results.statusText;

      dispatch({type: STATUS_RATING, payload: "injecting", code: id, text: "rating"})

      return results.json();
    })
    .then(data => {
      if (statusCode===200) {
        dispatch({type: STATUS_RATING, payload: "complete", code: statusCode, text: statusText})
        window.location.reload();
      } else {
        dispatch({type: STATUS_RATING, payload: "error", code: statusCode, text: statusText})
      }
    })
  } else {
    console.log("Score already set!")
  }
}
