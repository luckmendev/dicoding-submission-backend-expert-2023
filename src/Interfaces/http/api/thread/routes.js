const routes = (handler) => ([
    {
      method: 'POST',
      path: '/threads',
      handler: handler.threadHandler,
      options: {
        auth: 'forum_jwt',
      }
    },
    {
      method: 'GET',
      path: '/threads/{threadId}',
      handler: handler.getThreadHandler,
     
    }
  ]);
  
  module.exports = routes;
  