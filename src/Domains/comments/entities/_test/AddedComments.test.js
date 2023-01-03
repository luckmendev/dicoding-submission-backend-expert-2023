const AddedComments = require('../AddedComments')


describe('AddedComments entities', () => {


    it('should throw error when object not contain needed property', () => {

        const payload =  {
            id: 1,
    
        }

        expect(() => new AddedComments(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')

    })

    it('should throw error when payload did not meet data type specification', () => {

        const payload =  {
            id: 1,
            content: true,
            owner: {}
    
        }
        expect(() => new AddedComments(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')

    })


    it('should create addedComments object correctly', () => {
        // Arrange
        const payload = {
          id: '123',
          content: 'dicoding',
          owner: 'user-123',
        };
    
        // Action
        const addedComments = new AddedComments(payload);
    
        // Assert
        expect(addedComments.id).toEqual(payload.id);
        expect(addedComments.content).toEqual(payload.content);
        expect(addedComments.owner).toEqual(payload.owner);
      });


})