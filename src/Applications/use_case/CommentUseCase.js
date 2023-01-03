const NewComments = require('../../Domains/comments/entities/NewComments')
const NewThread = require('../../Domains/thread/entities/NewThread')

class CommentUseCase {
    
    constructor({ threadRepository, commentRepository}){
        this._threadRepository = threadRepository
        this._commentRepository = commentRepository

    }

    async addComments(requestBody){
        const newComments = new NewComments(requestBody)

        await this._threadRepository.checkAvailabilityThreadId(requestBody.threadId)

        return this._commentRepository.addComments(newComments);
    }

    async deleteComment({commentId ,owner, threadId}){
        
    
        this._verifyCommentId(commentId)

        await this._threadRepository.checkAvailabilityThreadId(threadId)
       
        await this._commentRepository.checkAvailabilityCommentId(commentId)

      
        await this._commentRepository.checkOwnerComments(commentId,owner)
       

        return this._commentRepository.deleteComment(commentId)

    }


    _verifyCommentId(id){
        if( typeof id !== 'string'){
            throw new Error('THREAD_USECASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}

module.exports = CommentUseCase