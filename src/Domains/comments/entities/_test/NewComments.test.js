const NewComments = require('../NewComments')



describe('NewComments entities', () => {


    it('should throw error when payload not contain needed property ', () => {

        const payload = {}


        expect(() => new NewComments(payload)).toThrowError('NEW_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY')

    })


    it('should throw error when payload did not meet data type specification', () => {

        const payload = {
            content: true
        }


        expect(() => new NewComments(payload)).toThrowError('NEW_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION')

    })


    it('should create NewComments entities correctly', () => {

        const payload = {
            content: 'test',
            owner: 'test-owner-id',
            threadId: 'test-threadId'

        }
        const newComments = new NewComments(payload)

        expect(newComments).toBeInstanceOf(NewComments);
     
        expect(newComments.content).toEqual(payload.content)
        expect(newComments.owner).toEqual(payload.owner)
        expect(newComments.threadId).toEqual(payload.threadId)

    })


})