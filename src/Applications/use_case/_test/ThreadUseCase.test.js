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

       
        mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve({
            id: "test",
            title: useCasePayload.title,
            owner: useCasePayload.owner

        }))


         /** creating use case instance */
        const threadUseCase = new ThreadUseCase({
            threadRepository: mockThreadRepository,

        });


         // Action
        const addedThread = await threadUseCase.addThread(useCasePayload);
        
        expect(addedThread).toStrictEqual({id: "test",
        title: useCasePayload.title,
        owner: useCasePayload.owner});

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

       

        const listComment = 
            [
                {
                    "id": "comment-test-12345",
                    "username": "dicoding",
                    "date": "2023-01-01T03:47:24.576Z",
                    "is_delete": 0,
                    "content": "sebuah comment"
                },
                {
                    "id": "comment-test-65432",
                    "username": "dicoding",
                    "date": "2023-01-01T03:47:24.576Z",
                    "is_delete": 1,
                    "content": "sebuah comment lama"
                },
            ]
        
    
        const mockThreadRepository = new ThreadRepository()
        const mockCommentRepository = new CommentRepository()

        mockCommentRepository.getCommentByThreadId = jest.fn()
        .mockImplementation(() => Promise.resolve(listComment));


        const listThread = {
            id: "test",
            title: "test title",
            body: "test body",
            date: "2022-11-06T13:04:54.960Z",
            username: "dicoding",
            comments: listComment

        }

         mockThreadRepository.getThread = jest.fn().mockImplementation(() => Promise.resolve({
            id: listThread.id,
            title: listThread.title,
            body: listThread.body,
            date: listThread.date,
            username: listThread.username,
            comments:  listThread.comments
         }))

        
    
        
        /** creating use case instance */
        const threadUseCase = new ThreadUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository

        });

        const getThread = await threadUseCase.getThread('test')
    
        listComment.map((v, index) => {

            if(v.is_delete == 1){
                expect(getThread.comments[index].content).toStrictEqual("**komentar telah dihapus**")
            }

        })
    
        expect(getThread.comments.length).toBe(listComment.length)
        expect(getThread).toStrictEqual(listThread)
        expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith('test')
        expect(mockThreadRepository.getThread).toBeCalledWith('test')

    })



})