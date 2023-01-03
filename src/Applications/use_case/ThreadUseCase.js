const NewThread = require('../../Domains/thread/entities/NewThread')
const NewComments = require('../../Domains/comments/entities/NewComments')


class ThreadUseCase  {

    constructor({ threadRepository, commentRepository}){

        this._threadRepository = threadRepository
        this._commentRepository = commentRepository

    }

   async addThread(requestBody){

        const newThread = new NewThread(requestBody)
        return this._threadRepository.addThread(newThread);

    }


    async getThread(id){

        this._verifyThreadId(id)

        const listComments = await this._commentRepository.getCommentByThreadId(id)

        listComments.map((v, index) => {
            if(v.is_delete == 1){
                listComments[index].content = '**komentar telah dihapus**'
            }
        })

        const result = await this._threadRepository.getThread(id)

        result.comments = listComments
        return result
    }

    _verifyThreadId(id){
        if( typeof id !== 'string'){
            throw new Error('THREAD_USECASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION')
        }
    }
}

module.exports = ThreadUseCase