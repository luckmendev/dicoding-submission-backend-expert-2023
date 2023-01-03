
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')

const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')

const NewThread = require('../../../Domains/thread/entities/NewThread')
const pool = require('../../database/postgres/pool');


const NotFoundError = require('../../../Commons/exceptions/NotFoundError');


 describe('ThreadRepositoryPostgres',() => {

    afterEach(async () => {
        await ThreadTableTestHelper.cleanTable();
    });
    
    afterAll(async () => {
        await pool.end();
    });
    
    describe('add new thread function', () => {

        it('should add thread to database', async () => {

            const payload = { title: "test title", body: "test body", owner: "test owner"}

            const fakeIdGenerator = () => 'xxx123'; // stub!
            //arrange
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

            //action
          const threadAdd =  await threadRepository.addThread(new NewThread(payload))


            // //assert

            const getData = await ThreadTableTestHelper.getThreadById('xxx123')

            expect(getData).toHaveLength(1);
            expect(threadAdd.id).toBe('xxx123')
            expect(threadAdd.owner).toBe(payload.owner)
            expect(threadAdd.title).toBe(payload.title)
        })
    })


    describe('getThread function', () => {

        it('should return ok list thread',async () => {

            const fakeIdGenerator = () => 'xxx123';
            const idFake =  (Math.random() + 1).toString(36).substring(7)
            const idThread =  (Math.random() + 2).toString(30).substring(7)
            const date = new Date()
            const payload = { id: idThread, title: "test title", body: "test body", owner: idFake, date}
            
           
            //arrange
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

    
              /// Action & Assert
             await ThreadTableTestHelper.insertThread(payload)
             await UsersTableTestHelper.addUser({ id: idFake, username: 'test-username', password: 'password', fulname : "fulname"})


             const getData = await threadRepository.getThread(idThread)

            
             expect(getData.body).toBe(payload.body);
             expect(getData.title).toBe(payload.title);
             expect(getData.username).toBe('test-username');
             expect(getData.id).toBe(idThread)
             expect(getData.date).toBe(date.toISOString())

        })

        it('should throw NotFoundError thread',async () => {

            const fakeIdGenerator = () => 'xxx123';
            const payload = { title: "test title", body: "test body", owner: "test owner"}
           
            //arrange
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

    
              /// Action & Assert
             await threadRepository.addThread(new NewThread(payload))

             await expect(threadRepository.getThread('321'))
             .rejects.toThrow(NotFoundError);
    

        })

    })

    describe('checkAvailabilityThreadId function', () => {

        it('should return ok', async ()=> {

            const fakeIdGenerator = () => 'xxx123';
            const payload = { title: "test title", body: "test body", owner: "test owner"}
           
            //arrange
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

               /// Action & Assert
            await threadRepository.addThread(new NewThread(payload))

            await expect(threadRepository.checkAvailabilityThreadId('xxx123'))
            .resolves.not.toThrow(NotFoundError);
        })

        it('should return not found error', async ()=> {

            const fakeIdGenerator = () => 'xxx123';
            //arrange
            const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

        
            await expect(threadRepository.checkAvailabilityThreadId('121313'))
            .rejects.toThrow(NotFoundError);
        })

    })

    

})