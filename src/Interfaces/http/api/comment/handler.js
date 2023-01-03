
const CommentUseCase = require('../../../../Applications/use_case/CommentUseCase');


class CommentHandler {


    constructor(container) {

        this._container = container
        this.commentsHandler = this.commentsHandler.bind(this)
        this.deleteCommentsHandler = this.deleteCommentsHandler.bind(this)
    }


    async commentsHandler(request, h){

        const {content} = request.payload
    
        const { id: credentialId } = request.auth.credentials;
        const threadId = request.params.threadId
    
    
        const addCommentsUseCase = this._container.getInstance(CommentUseCase.name)
    
        const added = await addCommentsUseCase.addComments({ content, threadId, owner: credentialId });
    
        const response = h.response({
          status: 'success',
          data: {
            addedComment: added,
          },
        });
        
        
        response.code(201);
        return response;
    
      }
    
      async deleteCommentsHandler(request, h){
    
        const { id: credentialId } = request.auth.credentials;
    
    
    
        const commentId = request.params.commentId
        const threadId = request.params.threadId
    
        const useCase = this._container.getInstance(CommentUseCase.name)
    
       
        await useCase.deleteComment({ commentId, owner: credentialId, threadId })
    
        const response = h.response({
            status: 'success',
        })
    
        response.code(200);
        return response;
      }

}


module.exports = CommentHandler