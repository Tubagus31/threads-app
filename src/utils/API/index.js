const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem('threadsToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('threadsToken');
  }

  return {
    BASE_URL,
    _fetchWithAuth,
    putAccessToken,
    getAccessToken,
  };
})();

export default api;
