const CommentRepository = require('../CommentRepository')


describe('CommentRepository Test', () => {


    it('should throw error when invoke unimplemented method',() => {

        const payload = {
            title: "test-title",
            body: 'test-body',
            owner: 'user-123'
        }

        commentRepository = new CommentRepository()

        expect(()=> commentRepository.addComments()).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        expect(()=> commentRepository.checkOwnerComments()).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        expect(()=> commentRepository.deleteComment()).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        expect(()=> commentRepository.getComments()).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        expect(()=> commentRepository.getCommentByThreadId()).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        expect(() => commentRepository.checkAvailabilityCommentId()).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    })

})