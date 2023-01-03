class NewThread {


    constructor(payload){

        this._validatePayload(payload)

        this.body = payload.body
        this.title = payload.title
        this.owner = payload.owner

    }

    _validatePayload(payload){

        const {body, title, owner} = payload

        if(!body || !title || !owner){
            throw new Error('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')    
        }

        if (typeof body !== 'string' || typeof title !== 'string') {
            throw new Error('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
          }
    }



}

module.exports = NewThread