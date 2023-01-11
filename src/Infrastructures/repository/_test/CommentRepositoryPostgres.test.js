const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')

const CommentRepositoryPostgres = require('../CommentRepositoryPostgres')


const pool = require('../../database/postgres/pool');


const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const { random } = require('nanoid');


describe('CommentRepositoryTest', () => {

    describe('add comment function',  () => {

        it('should add new comment', async() => {

           /// const date = new Date()
            const idFake =  (Math.random() + 1).toString(36).substring(7);
            const payload = { content: "test", threadId: "xxxx", owner: "test owner"}

            const fakeIdGenerator = () =>  idFake
            //arrange
            const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator)

            //action
            const addComment = await commentRepository.addComments(payload)


            // //assert

            const getData = await ThreadTableTestHelper.getCommentId(`comment-${idFake}`)
          

            expect(getData).toHaveLength(1)
            expect(addComment.content).toBe(payload.content)
            expect(addComment.owner).toBe(payload.owner)
            expect(addComment.id).toBe(`comment-${idFake}`)

        })

        
    })

    describe('check owner comment', () => {

        it('should throw AuthorizationError if comment not authorized', async () => {

            const commentId = 1
            const owner = 1

            const fakeIdGenerator = () => 'xxx123'; 
            
            //arrange
            const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator)


            //action & assert
            await expect(commentRepository.checkOwnerComments(commentId, owner))
            .rejects.toThrow(AuthorizationError);
            
        })

        it('should not throw AuthorizationError if comment  authorized', async () => {

            const commentId = (Math.random() + 1).toString(36).substring(7)
            const owner = 'fake-owner-id-1'
            const ThreadId =  'fake-'+(Math.random() + 1).toString(36).substring(7)

            const fakeIdGenerator = () => 'xxx123'; 
            
            //arrange
            const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator)

            //action & assert
            const date = new Date()
            //insert
            await ThreadTableTestHelper.insertComment(owner, commentId, ThreadId, date)

            await expect(commentRepository.checkOwnerComments(commentId, owner))
            .resolves.not.toThrow(AuthorizationError);
            
        })

    })


    describe('check availability comment', () => {

        it('should throw error if comment not available', async () => {

            const commentId = 1

            //Arrange 
            const commentRepository = new CommentRepositoryPostgres(pool)


            //action & assert
            await expect(commentRepository.checkAvailabilityCommentId(commentId))
            .rejects.toThrow(NotFoundError);
        })


        it('should not throw error if comment available', async () => {

            const commentId =  (Math.random() + 1).toString(36).substring(7)
            const owner = 'fake-owner-id-test-99'
            const ThreadId =  'fake-'+(Math.random() + 1).toString(36).substring(7)

            //Arrange 
            const commentRepository = new CommentRepositoryPostgres(pool)


            //action & assert
            const date = new Date()
            await ThreadTableTestHelper.insertComment(owner, commentId,ThreadId, date)

            await expect(commentRepository.checkAvailabilityCommentId(commentId))
            .resolves.not.toThrow(NotFoundError);
        })
    })

    describe('delete comment', () => {
        
        it('should soft delete comment', async () => {

            
            const commentId =  (Math.random() + 1).toString(36).substring(7)
            const owner = 'fake-owner-id-test-99'

            const ThreadId =  'fake-'+(Math.random() + 1).toString(36).substring(7)
            //Arrange 
            const commentRepository = new CommentRepositoryPostgres(pool)

            //action & assert
            const date = new Date()
            await ThreadTableTestHelper.insertComment(owner, commentId, ThreadId, date)

            


            await commentRepository.deleteComment(commentId)

            const getComment = await ThreadTableTestHelper.getCommentId(commentId)
        

            expect(getComment[0].id).toBe(commentId)

            expect(getComment[0].is_delete).toBe(1)

        })


    })

    describe('getCommentByThreadId', () => {

        it('should get comment by thread id', async() => {

            const commentId =  (Math.random() + 1).toString(36).substring(7)
            const ThreadId =  'fake-'+(Math.random() + 1).toString(36).substring(7)
          
            const fakeUserID = 'fake-'+(Math.random() + 1).toString(36).substring(7)
    
    
    
             //Arrange 
            const commentRepository = new CommentRepositoryPostgres(pool)
    

            const date = new Date()
                //action & assert
            await ThreadTableTestHelper.insertComment(fakeUserID, commentId,ThreadId, date)

            await UsersTableTestHelper.addUser({id : fakeUserID, username: "test-dicoding-test", password: "test-password", fullname: "test-fullname"})


            const getComment = await commentRepository.getCommentByThreadId(ThreadId)
           
            expect(getComment.length).toBeGreaterThan(0)
            expect(getComment.length).toBe(1)

            expect(getComment[0].id).toBe(commentId)
            expect(getComment[0].is_delete).toBe(0)
            expect(getComment[0].content).toBe('test')
            expect(getComment[0].username).toBe('test-dicoding-test')
            expect(getComment[0].date).toBe(date.toISOString())

          
        })

       
    })






})