import { create } from 'svg-captcha';
import * as crypto from 'crypto';
export default () => {
  const captcha = create({
    size: 4, //生成字符数
    ignoreChars: 'Il', //过滤字符
    noise: 2, //干扰线数量
    background: '#999', //背景色
    color: true, //字体颜色是否随机生成
    width: 100,
    height: 40,
  });
  const id = crypto.randomBytes(10).toString('hex');
  return { captcha, id };
};
