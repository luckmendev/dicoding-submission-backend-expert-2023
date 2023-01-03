const CommentRepository = require('../../Domains/comments/CommentRepository')

const AddedComments = require('../../Domains/comments/entities/AddedComments')


const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')


class CommentRepositoryPostgres extends CommentRepository {

    constructor(pool, idGenerator){
        super()
        this._pool = pool
        this._idGenerator = idGenerator

    }


    async addComments(newComments){
        const {content, threadId, owner} = newComments

        const thread_id = threadId
    

        const id = `comment-${this._idGenerator()}`
        const date = new Date()
        

        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
            values: [id, content, thread_id, owner, 0, date.toISOString()],
          };
      
        const result = await this._pool.query(query)
        
        return new AddedComments({...result.rows[0]})
    }


    async checkAvailabilityCommentId(id){

        const query = {
          text: 'SELECT * FROM comments where id = $1',
          values: [id]
        }
  
        const result = await this._pool.query(query)
  
        if (result.rows.length === 0) {
          throw new NotFoundError('comment id tidak ditemukan');
        }
  
    }

    async checkOwnerComments(commentId, owner){

        const query = {
          text : 'SELECT * FROM comments where id = $1 AND owner = $2',
          values: [commentId,owner]
        }

        const result = await this._pool.query(query);
    
        if (result.rows.length === 0) {
          throw new AuthorizationError('the comments not authorized')
        }

    }

    async deleteComment(id) {
       //
       const query = {
        text: 'UPDATE comments SET is_delete = 1 WHERE id = $1',
        values: [id],
      };
  
      const result =  await this._pool.query(query);


      return result
    }

    async getCommentByThreadId(threadId) {

      const query = {
        text: `select comments.id, username ,date, is_delete, content from comments left join users on comments.owner = users.id where comments.thread_id = $1`,
        values: [threadId]
      }
      
      const results = await this._pool.query(query);

      return results.rows
    }


}

module.exports = CommentRepositoryPostgres