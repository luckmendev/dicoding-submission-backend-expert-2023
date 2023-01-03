class CommentRepository {

    async addComments(newComments){
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }


    async checkOwnerComments(commentId, owner){
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }


    async deleteComment(id) {
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }


    async getComments(threadId){
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')

    }   

    async getCommentByThreadId(id){
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async checkAvailabilityCommentId(id){
        throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }       

}

module.exports = CommentRepository