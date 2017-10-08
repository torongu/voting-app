import axios from 'axios';

export default (function(_) {
  const token = localStorage.getItem("id_token");
  const req = _.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 300,
    headers: {
      Authorization: token
    }
  });

  return {
    get: (route) => {
      return req.get(route);
    },
    post: (route, data) => {
      return req.post(route, data);
    },
    put: (route, data) => {
      return req.put(route, data);
    },
    delete: (route, data) => {
      return req.delete(route, data);
    },
  }
})(axios)
