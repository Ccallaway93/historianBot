const sql = require('mssql');
const config = require('../Database/connect')


let pool, result;

const getHotTakes = async () => {

    try {
        pool = await sql.connect(config)
         result = await pool.request()
            .query('select * from HotTake')
            
        return result;
        
    } catch (err) {
        console.log(err);
        throw Error('SQL Exception: ' + err)
    }

}

const getLatestHotTakeId = async () => {

    try {
        pool = await sql.connect(config)
         result = await pool.request()
            .query('select TOP 1 HotTakeId from HotTake Order by HotTakeId desc')
            
        return result.recordset[0].HotTakeId;
        
    } catch (err) {
        console.log(err);
        throw Error('SQL Exception: ' + err)
    }
}



const postHotTake = async (HotTake) => {

    try {

        pool = await sql.connect(config)
        result = await pool.request()
           .input('Description', sql.NVarChar, HotTake.description)
           .input('Punishment', sql.NVarChar, HotTake.punishment)
           .input('Active', sql.Bit, 1)
           .execute('InsertOrUpdateHotTake')
       
           console.log('Successfully added a HotTake')
           return 'Success';

    } catch (err) {
        console.log(err);
        throw Error('SQL Exception: ' + err)
    }
    


}


module.exports = {
    getHotTakes,
    postHotTake,
    getLatestHotTakeId
}

