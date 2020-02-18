const request = (path, method, body) => {
  //return fetch(`${process.env.API_URL}${path}`,{
  return fetch(`https://conf-sched.herokuapp.com/api/v1/presentation/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: body && JSON.stringify(body)
  })
    .then(res => Promise.all([res.ok, res.json()]))
    .then(([ok, json]) => {
      if(!ok) throw json;
      return json;
    });
};

export const postPresentation = (presentation) => {
  return request('', 'POST', presentation)
    .then(res => res);
};

export const getPresentations = () => {
  return request('', 'GET')
    .then(res => res);
};

