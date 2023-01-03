const routes = (handler) => ([

    {
        method: 'POST',
        path: '/threads/{threadId}/comments',
        handler: handler.commentsHandler,
        options: {
          auth: 'forum_jwt'
        }
      },
      {
        method: 'DELETE',
        path: '/threads/{threadId}/comments/{commentId}',
        handler: handler.deleteCommentsHandler,
        options: {
          auth: 'forum_jwt'
        }
      },

])

module.exports = routes