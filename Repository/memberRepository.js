const sql = require('mssql');
const _hotTakeRepository = require('../Repository/hotTakeRepository')
const config = require('../Database/connect')

let pool, result;


const getMemberIds = async (members) => {


    try {

        pool = await sql.connect(config)

        for(var i = 0; i < members.length; i++){

            if((members[i].lastName === undefined) || (members[i].firstName === undefined))
                throw TypeError('Wrong name given, Please type the full name of the person associated with this HotTake')

            result = await pool.request()
            .input('lastName_parm', sql.NVarChar, members[i].lastName)
            .query('select MemberId from Member where LastName = @lastName_parm')
            members[i].id = result.recordset[0].MemberId;
        }

        return members;
        
    } catch (err) {
        console.log(err);
        throw Error('SQL Exception: ' + err)
    }
}

const postMember_HotTake = async (members) => {

    const hotTakeId = await _hotTakeRepository.getLatestHotTakeId();

    try {
        pool = await sql.connect(config);


        for(var i = 0; i < members.length; i++){
    
            result = await pool.request()
            .input('memberId_parm', sql.Int, members[i].id)
            .input('hotTakeId_parm', sql.Int, hotTakeId)
            .query('Insert into Member_HotTake (MemberId, HotTakeId) VALUES (@memberId_parm, @hotTakeId_parm)')
    
        }
        console.log('Successfully added to Members_HotTakes');

    } catch(err) {
        console.log(err);
        throw Error('SQL Exception: ' + err)
    }

}


module.exports = {
    getMemberIds,
    postMember_HotTake
}