// 基于axios,用于发送网络请求
import axios from 'axios';

const requestInstance = axios.create({
  baseURL: '/',
});
// 定义拦截器
requestInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return {
        data: '',
        code: -1,
        msg: '未知错误',
      };
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requestInstance;