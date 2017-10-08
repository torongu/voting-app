export default {
  isAuthenticated: () => {
    let token = localStorage.getItem('id_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
