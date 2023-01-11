const DetailThread = require('../DetailThread')


describe('DetailThread entity test', () => {

    it('should detail thread entities correctly', () => {

        const payload = {
            id: 'test',
            title: 'title',
            body: 'body',
            date: 'date',
            username: 'username',
            comments: []
        }

        const detailThread = new DetailThread(payload)
        expect(detailThread).toBeInstanceOf(DetailThread);
        expect(detailThread.body).toEqual(payload.body)
        expect(detailThread.id).toEqual(payload.id)
        expect(detailThread.date).toEqual(payload.date)
        expect(detailThread.title).toEqual(payload.title)
        expect(detailThread.comments).toEqual(payload.comments)
        expect(detailThread.username).toEqual(payload.username)

    })

    it('should throw error,  payload did not meet data type specification', () => {

        const payload = {}

        expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')

    })

})
