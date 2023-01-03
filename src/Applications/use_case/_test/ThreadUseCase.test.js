const NewThread = require('../../../Domains/thread/entities/NewThread')
const AddedThread = require('../../../Domains/thread/entities/AddedThread')

const NewComments = require('../../../Domains/comments/entities/NewComments')
const AddedComments = require('../../../Domains/comments/entities/AddedComments')

const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const CommentRepository = require('../../../Domains/comments/CommentRepository')
const ThreadUseCase = require('../ThreadUseCase')


describe('ThreadUseCaseTest',() => {

    it('should orchestrating the add thread action correctly', async () => {

        //payload

        const useCasePayload = {
            title: 'Test-title',
            body: 'description body',
            owner: 'user-123'
        }

        const expectedAddedThread = {
            title: useCasePayload.title,
            owner: useCasePayload.owner,
            body: useCasePayload.body
        }

        const mockThreadRepository = new ThreadRepository()

       
        mockThreadRepository.addThread = jest.fn(() => (useCasePayload))


         /** creating use case instance */
        const threadUseCase = new ThreadUseCase({
            threadRepository: mockThreadRepository,

        });


         // Action
        const addedThread = await threadUseCase.addThread(useCasePayload);
        
        expect(addedThread).toStrictEqual(expectedAddedThread);

        expect(mockThreadRepository.addThread).toHaveBeenCalledWith(new NewThread({
            body: useCasePayload.body,
            title: useCasePayload.title,
            owner: useCasePayload.owner
          }));


    })

    
})



describe('GetThread', () => {


    it('should error when thread id not string', async () => {

     
        const threadUseCase = new ThreadUseCase({})

        expect(threadUseCase.getThread(1)).rejects.toThrowError("THREAD_USECASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION")
    })

    it('should orchestrating Get thread', async () => {

       

        const expectedListcomment = 
            [
                {
                    "id": "comment-test-12345",
                    "username": "dicoding",
                    "date": "2023-01-01T03:47:24.576Z",
                    "is_delete": 0,
                    "content": "sebuah comment"
                },
            ]
        
        const expectedThread = {
            id: "test",
            title: "test title",
            body: "test body",
            date: "2022-11-06T13:04:54.960Z",
            username: "dicoding",
            comments: expectedListcomment

        }
            

        const mockThreadRepository = new ThreadRepository()
        const mockCommentRepository = new CommentRepository()

        mockCommentRepository.getCommentByThreadId = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedListcomment));

         mockThreadRepository.getThread = jest.fn(() => ({
            id: 'test',
            title: "test title",
            body: "test body",
            date: "2022-11-06T13:04:54.960Z",
            username: "dicoding"
         }))

        
        /** creating use case instance */
        const threadUseCase = new ThreadUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository

        });

        const getThread = await threadUseCase.getThread('test')

    
        expect(getThread).toStrictEqual(expectedThread)
        expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith('test')
        expect(mockThreadRepository.getThread).toBeCalledWith('test')

    })



})