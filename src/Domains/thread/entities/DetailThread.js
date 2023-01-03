class DetailThread {


    constructor(payload){

        this._validate(payload)

        this.id = payload.id
        this.title = payload.title
        this.body = payload.body
        this.date = payload.date
        this.username = payload.username
        this.comments = []
    }

    _validate(payload){

        if(!payload.id || !payload.title || !payload.body || !payload.username){
            throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
        }

    }


}

module.exports = DetailThread