const ThreadRepository = require('../ThreadRepository')


describe('ThreadRepository', () => {

    it('should throw error when invoke unimplemented method',() => {

        const payload = {
            title: "test-title",
            body: 'test-body',
            owner: 'user-123'
        }

        threadRepository = new ThreadRepository()

        expect(()=> threadRepository.addThread()).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        expect(()=> threadRepository.checkAvailabilityThreadId()).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        expect(()=> threadRepository.getThread()).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    })


})



