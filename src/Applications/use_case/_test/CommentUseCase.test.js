const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const CommentRepository = require('../../../Domains/comments/CommentRepository')
const AddedComments = require('../../../Domains/comments/entities/AddedComments')
const NewComments = require('../../../Domains/comments/entities/NewComments')
const CommentUseCase = require('../CommentUseCase')


describe('CommentUseCase Test', () => {

        describe('AddCommentThread', () => {

            it('should orchestrating the add comments action correctly', async () => {

                //payload

                const useCasePayload = {
                    id: 'test-id-1234',
                    content: 'Test-content',
                    owner: 'owner-123',
                    threadId: '1',
                }

                const expectedResponseBody = new AddedComments(useCasePayload)

                const mockThreadRepository = new ThreadRepository()
                const mockCommentRepository = new CommentRepository()


                mockThreadRepository.checkAvailabilityThreadId = jest.fn().mockImplementation(() => Promise.resolve())

                mockCommentRepository.addComments = jest.fn(() => ({id : useCasePayload.id, content: useCasePayload.content, owner: useCasePayload.owner}))
            


                /** creating use case instance */
                const commentUseCase = new CommentUseCase({
                    threadRepository: mockThreadRepository,
                    commentRepository: mockCommentRepository

                });


                // Action
                const addedComments = await commentUseCase.addComments(useCasePayload);
                
                expect(addedComments.id).toStrictEqual(expectedResponseBody.id);
                expect(addedComments.content).toStrictEqual(expectedResponseBody.content);
                expect(addedComments.owner).toStrictEqual(expectedResponseBody.owner);
                expect(mockThreadRepository.checkAvailabilityThreadId).toBeCalledWith(useCasePayload.threadId)
                expect(mockCommentRepository.addComments).toBeCalledWith(new NewComments({
                    content: useCasePayload.content,
                    owner: useCasePayload.owner,
                    threadId:  useCasePayload.threadId
                }));
            })

        })

        describe('DeleteCommentThread', () => {

        
        
            it('should throw error if id not string', async () => {
                // Arrange
                const commentId = 1234
            

                const deleteCommentThread = new CommentUseCase({})
                
                // Action & Assert
                await expect(deleteCommentThread.deleteComment(commentId))
                .rejects
                .toThrowError('THREAD_USECASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
            });

            
            
            it('should delete comment', async () => {


                const mockThreadRepository = new ThreadRepository()
                const mockCommentRepository = new CommentRepository()
            

                mockThreadRepository.checkAvailabilityThreadId = jest.fn().mockImplementation(() => Promise.resolve())

                mockCommentRepository.checkAvailabilityCommentId = jest.fn().mockImplementation(() => Promise.resolve()) 

                mockCommentRepository.checkOwnerComments = jest.fn().mockImplementation(() => Promise.resolve())
                mockCommentRepository.deleteComment = jest.fn().mockImplementation(() => Promise.resolve())

                const useCase =  new CommentUseCase({
                    threadRepository : mockThreadRepository,
                    commentRepository: mockCommentRepository
                })
                

            

                await useCase.deleteComment({commentId: "fake-test-comment-id" ,owner: "fake-test-owner", threadId: "fake-test-thread-id"})


                expect(mockThreadRepository.checkAvailabilityThreadId).toBeCalledWith('fake-test-thread-id')
                expect(mockCommentRepository.checkAvailabilityCommentId).toBeCalledWith('fake-test-comment-id')
                expect(mockCommentRepository.checkOwnerComments).toBeCalledWith("fake-test-comment-id", "fake-test-owner")
                expect(mockCommentRepository.deleteComment).toBeCalledWith('fake-test-comment-id')
                
            })

        })

})