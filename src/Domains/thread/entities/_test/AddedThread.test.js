const AddedThread = require('../AddedThread')


describe('AddedThread', () => {


    it('should throw error when object not contain needed property', () => {


        const payload =  {
            id: 1,
    
        }

        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')

    })

    it('should throw error when payload did not meet data type specification', () => {

        const payload =  {
            id: 1,
            title: true,
            owner: {}
    
        }
        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')

    })


    it('should create addedThread object correctly', () => {
        // Arrange
        const payload = {
          id: '123',
          title: 'dicoding',
          owner: 'user-123',
        };
    
        // Action
        const addedThread = new AddedThread(payload);
    
        // Assert
        expect(addedThread.id).toEqual(payload.id);
        expect(addedThread.title).toEqual(payload.title);
        expect(addedThread.owner).toEqual(payload.owner);
      });


})