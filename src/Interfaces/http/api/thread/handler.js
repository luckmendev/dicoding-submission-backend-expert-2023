const ThreadUseCase = require('../../../../Applications/use_case/ThreadUseCase');

class ThreadHandler {
  constructor(container) {
    this._container = container;

    this.threadHandler = this.threadHandler.bind(this)
    this.getThreadHandler = this.getThreadHandler.bind(this)
  }

  async threadHandler(request, h) {

    const { title, body } = request.payload

  
    const { id: credentialId } = request.auth.credentials;


    const addUThreadUseCase = this._container.getInstance(ThreadUseCase.name);
    const added = await addUThreadUseCase.addThread({ title, body, owner: credentialId });

    const response = h.response({
      status: 'success',
      data: {
        addedThread: added,
      },
    });
    response.code(201);
    return response;
  }


  async getThreadHandler(request, h){

   // const { id: credentialId} = request.auth.credentials

    const threadId = request.params.threadId


    const threadUseCase = this._container.getInstance(ThreadUseCase.name)
    const thread = await threadUseCase.getThread(threadId)

    const response = h.response({
      status: 'success',
      data: {
        thread: thread,
      },
    });
    response.code(200);
    return response;

  }

  
}

module.exports = ThreadHandler;
