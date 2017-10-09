import axios from 'axios';

export default {
  callApi(method, route, data) {
    let token = localStorage.getItem("id_token");
    let req = axios.create({
      baseURL: 'https://truong996-voting-app.herokuapp.com/api',
      headers: {
        Authorization: token
      }
    })

    switch (method) {
      case 'GET':
        return req.get(route);

      case 'POST':
        return req.post(route, data);

      case 'PUT':
        return req.put(route, data);

      case 'DELETE':
        return req.delete(route, data);

      default:
        return req.get(route);
    }
  },
  get(route) {
    return this.callApi('GET', route);
  },
  post(route, data) {
    return this.callApi('POST', route, data);
  },
  put(route, data) {
    return this.callApi('PUT', route, data);
  },
  delete(route, data) {
    return this.callApi('DELETE', route, data);
  }
}
