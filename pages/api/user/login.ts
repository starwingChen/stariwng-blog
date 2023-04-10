import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from 'config/index';
import { prepareConnection } from "db/index";
import { IronSession } from 'iron-session';

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { phone, verify } = req.body;
  // const db = await prepareConnection()
  // 在db中拿到相应的数据库
  // 4.11 4.12节

  // 先用假数据顶一下
  const mock = {
    userId : '123',
    nikename: 'hhh',
    avatar: 'assets/images/avatar.jpeg'
  }
  const session = req.session as IronSession & Record<string, any>
  if(mock){
    session.userId = mock.userId
    session.nikename = mock.nikename
    session.avatar = mock.avatar
    await session.save()
    res.status(200).json({
      phone,
      verify,
      code: 0,
      msg: '登录成功',
      data: {
        userId: session.userId,
        nikename: session.nikename,
        avatar: session.avatar
      }
    });
  }else{
    res?.status(200).json({ code: -1, msg: '验证码错误' });
  }

}

export default withIronSessionApiRoute(login, ironSessionOptions);
