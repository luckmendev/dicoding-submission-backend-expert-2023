const ThreadRepository = require('../../Domains/thread/ThreadRepository')
const AddedThread = require('../../Domains/thread/entities/AddedThread')

const AddedComments = require('../../Domains/comments/entities/AddedComments')
const DetailThread = require('../../Domains/thread/entities/DetailThread')


const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')

class ThreadRepositoryPostgres extends ThreadRepository {

    constructor(pool, idGenerator){

        super()
        this._pool = pool
        this._idGenerator = idGenerator
    }

    
    
    async getThread(id) {

      const query = {
        text: 'SELECT thread.id, thread.title, thread.body, thread.date, users.username FROM thread left join users on thread.owner = users.id WHERE thread.id = $1',
        values: [id],
      };


      const result = await this._pool.query(query);
    
      if (result.rows.length === 0) {
        throw new NotFoundError('thread tidak ditemukan');
      }

      return new DetailThread({ ...result.rows[0]})

    }


    async addThread(newThread){

        const { title, body, owner} = newThread

        const id = this._idGenerator()

      

        const date = new Date()
        const query = {
            text: 'INSERT INTO thread VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
            values: [id, title, owner, body, date.toISOString()],
          };
      
        
        const result = await this._pool.query(query);
    
    
        return new AddedThread({ ...result.rows[0] });

    }

    async checkAvailabilityThreadId(id) {

        const query = {
          text: 'SELECT * FROM thread WHERE id = $1',
          values: [id],
        };
    
        const result = await this._pool.query(query);
    
        if (result.rows.length === 0) {
          throw new NotFoundError('thread tidak ditemukan');
        }
    }

}


module.exports = ThreadRepositoryPostgres