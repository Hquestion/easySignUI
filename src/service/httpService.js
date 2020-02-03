const baseUrl = 'http://192.168.0.101:3000';

const sendRequest = function(url, method, data) {
  let _resolve, _reject;
  const token = wx.getStorageSync('token') || '';
  wx.request({
    url: `${baseUrl}${url}`,
    method: method.toUpperCase(),
    data,
    header: {
      authorization: token ? 'Bearer ' + token : ''
    },
    success (res) {
      _resolve(res.data);
    },
    fail(res) {
      _reject(res);
    }
  });
  return new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });
};

export default {
  get(url, data) {
    return sendRequest(url, 'GET', data);
  },
  post(url, data) {
    return sendRequest(url, 'POST', data);
  }
};
