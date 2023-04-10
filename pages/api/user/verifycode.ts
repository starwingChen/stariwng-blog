import dayjs from 'dayjs';
import md5 from 'md5';
import { encode } from 'js-base64';
import { NextApiRequest, NextApiResponse } from 'next';
import request from 'service/fetch';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironSessionOptions } from "config/index";
import { IronSession } from 'iron-session';

async function verifycode(req: NextApiRequest, res: NextApiResponse) {
  const { to, templateId } = req.body;
  const accountId = '2c948876870df82e0187660773140d5a';
  const appId = '2c948876870df82e0187660774360d61';
  const authToken = 'd0924a3de55044ab8529a28c90683950';
  const nowDate = dayjs(new Date()).format('YYYYMMDDHHmmss');
  // sigParameter authorization两个都要加密
  const sigParameter = md5(`${accountId}${authToken}${nowDate}`);
  const authorization = encode(`${accountId}:${nowDate}`);

  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${accountId}/SMS/TemplateSMS?sig=${sigParameter}`;

  // const verifycode = Math.floor(Math.random() * 8999) + 1000;
  const verifycode = 1000
  // node端的返回
  const response = await request.post(
    url,
    {
      to,
      templateId,
      appId,
      // datas: [verifycode, '3'], // 过期时间，现在发datas过去也替换不了了
    },
    {
      headers: {
        Authorization: authorization,
      },
    }
  );

  console.log(response);
  /* 
  成功参考：
    {
      statusCode: '000000',
      templateSMS: {
        smsMessageSid: '25ad2bb2213b4376b95112558b503af6',
        dateCreated: '20230409212534'
      }
    }
  */
  // 给请求开一个session（就是一个存放在内存的字典，默认绑了个save方法）
  const session = req.session as IronSession & Record<string, any>
  const {statusCode, statusMsg, templateSMS} = response as any
  /* -------------test---------------- */
  if (statusCode){
    // 验证码发送成功
    session.verifycode = verifycode
    await session.save()
    // 浏览器端的返回
    res.status(200).json({
      code: 0,
      msg: templateSMS,
    });
  }else{
    res.status(200).json({
      code: statusCode,
      msg: statusMsg,
    });
  }


};

export default withIronSessionApiRoute(verifycode, ironSessionOptions);
