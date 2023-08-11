import 'thinkjs3-ts';
import path from 'path';
import { ParameterizedContext } from 'koa';
import { Stats } from 'fs';
const isDev = think.env === 'development';
const isVercel = think.env === 'vercel';
export = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev || isVercel,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/,
      notFoundNext: true,
      setHeaders: (
        res: ParameterizedContext['res'],
        url: string,
        stats: Stats
      ) => {
        if (!isVercel) {
          return true;
        }
        // 设置缓存
        if (/(\.jpe?g|\.png|\.gif|\.svg|\.webp)$/i.test(url)) {
          res.setHeader('Cache-Control', 'max-age=' + 30 * 24 * 60 * 60);
        }
        if (/(\.js|\.css|\.json)$/i.test(url)) {
          res.setHeader('Cache-Control', 'max-age=' + 24 * 60 * 60);
        }
      }
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      uploadDir: isVercel ? '/tmp/_tmp' : path.join(think.RUNTIME_PATH, '_tmp'),
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
];
