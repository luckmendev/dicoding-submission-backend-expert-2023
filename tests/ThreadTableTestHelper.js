const pool = require('../src/Infrastructures/database/postgres/pool');



const ThradTableTestHelper = {

    async cleanTable() {
        await pool.query('DELETE FROM comments WHERE 1=1');
        await pool.query('DELETE FROM thread WHERE 1=1')
    },
    async getThreadById(id) {
        const query = {
          text: 'SELECT body, title, owner FROM thread where id = $1',
          values: [id],
        };
    
        const result = await pool.query(query);

        return result.rows;
    },
   
    async getCommentId(id){
        const query = {
            text: 'SELECT id, is_delete FROM comments where id = $1',
            values: [id],
          };
      
          const result = await pool.query(query);
  
          return result.rows;

    },
    async insertComment(owner, fakeId, fakeThreadId, date) {

    
        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, owner, is_delete',
            values: [fakeId, "test", fakeThreadId, owner, 0, date.toISOString()],
        }

        await pool.query(query)
    },
    async insertThread({id, title, owner, body, date}){

        const query = {
            text: 'INSERT INTO thread VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
            values: [id, title, owner, body, date.toISOString()],
          };

          await pool.query(query)

    }
};



module.exports = ThradTableTestHelper