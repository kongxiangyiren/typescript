import 'thinkjs3-ts';
import path from 'path';
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
      notFoundNext: true
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
