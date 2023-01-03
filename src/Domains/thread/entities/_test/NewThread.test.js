const NewThread = require('../NewThread')


describe('NewThread entities', () => {

    it('should throw error when payload not contain needed property ', () => {

        const payload = {}


        expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')

    })


    it('should throw error when payload not meet data type specification ', () => {

        const payload = {
            body: true,
            title: "title",
            owner: "oke"
        }


        expect(() => new NewThread(payload)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')

    })

    it('should create NewThread entities correctly', () => {

        const payload = {
            title: 'test',
            body: 'test body',
            owner: 'user-123'
        }

        const newThread = new NewThread(payload)

        expect(newThread).toBeInstanceOf(NewThread);
        expect(newThread.body).toEqual(payload.body)
        expect(newThread.title).toEqual(payload.title)
        expect(newThread.owner).toEqual(payload.owner)

    })

})