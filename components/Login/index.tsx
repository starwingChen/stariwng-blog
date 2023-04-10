import { ChangeEvent, FC, useState } from 'react';
import styles from './index.module.scss';
import CountDown from 'components/CountDown';
import { message } from 'antd';
import request from 'service/fetch';
import { useStore } from '@/store/index';
interface LoginProps {
  onClose: Function;
}
const Login: FC<LoginProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });
  const [isVerifyEnd, setIsVerifyEnd] = useState(false);
  const store = useStore()
  
  const handleClose = () => {
    onClose();
  };
  const handleVerifyEnd = () => {
    setIsVerifyEnd(false);
  };
  // 获取验证码
  const handleGetVerifyCode = () => {
    if (!form.phone) {
      message.warning('请输入手机号');
      return;
    }
    request
      .post('/api/user/verifycode', {
        to: form.phone,
        templateId: 1,
      })
      .then((res: any) => {
        
        if (res.code === 0) {
          setIsVerifyEnd(true);
          
        } else {
          message.error(res.msg || '未知错误');
        }
      });
  };
  // 处理登录请求
  const handleLogin = () => {
    request
      .post('/api/user/login', {
        ...form,
      })
      .then((res: any) => {
        // 登录成功

        if (res?.code === 0) {
          store.user.setUserInfo(res?.data);
          handleClose();
        } else {
          message.error(res?.msg || '未知错误');
        }
      });
  };
  const handleOAuthGtihub = () => {};
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <div className={styles['login']}>
      <div className={styles['login__box']}>
        <div className={styles['title']}>
          <span>手机号登录</span>
          <span onClick={handleClose} className={styles['close']}>
            X
          </span>
        </div>
        <input
          type="text"
          name="phone"
          placeholder="请输入手机号"
          value={form.phone}
          onChange={handleFormChange}
        />
        <div className={styles['verify__area']}>
          <input
            type="text"
            name="verify"
            placeholder="请输入验证码"
            value={form.verify}
            onChange={handleFormChange}
          />
          <span
            onClick={handleGetVerifyCode}
            className={styles['verify__button']}
          >
            {isVerifyEnd ? (
              <CountDown time={3} onEnd={handleVerifyEnd} />
            ) : (
              '获取验证码'
            )}
          </span>
        </div>
        <div onClick={handleLogin} className={styles['login__button']}>
          登录
        </div>
        <div onClick={handleOAuthGtihub} className={styles['oauth']}>
          使用GitHub登录
        </div>
        <div className={styles['privacy']}>
          注册即表示同意
          <a href="https://juejin.cn/terms" target="_blank">
            用户协议
          </a>
          和
          <a href="https://juejin.cn/privacy" target="_blank">
            隐私政策
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
