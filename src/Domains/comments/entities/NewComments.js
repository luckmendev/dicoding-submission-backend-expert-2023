class NewComments {

    constructor(payload){
        
        this._validation(payload)

        this.content = payload.content
        this.owner = payload.owner
        this.threadId = payload.threadId
    
    }

    _validation({content}){

        if(!content){
            throw new Error('NEW_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY')
        }

        if (typeof content !== 'string') {
            throw new Error('NEW_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

    }
}


module.exports = NewComments