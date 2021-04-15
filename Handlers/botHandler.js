const _hotTakeRepository = require('../Repository/hotTakeRepository');
const _memberRepository = require('../Repository/memberRepository')
const utils = require('../Utilities/utils');


const Handle = async (requestString) => 
{

    console.log('in the handler');
    const members = await utils.getMembers(requestString);
    const hotTake = utils.getDescriptionAndPunishment(requestString);

    let str = JSON.stringify(requestString);
    let res = str.toUpperCase();

    if(res.includes('NEW') && res.includes('HOT') && res.includes('TAKE'))
    {
        try{

            console.log('inside the if');
            // Creates New HotTake
            _hotTakeRepository.postHotTake(hotTake);

            // Adds associated members to the Member_HotTake table
            _memberRepository.postMember_HotTake(members);

            return "Success"

        } catch (err)
        {
            console.log(err)
            return "Failed"
        }

    }
    else{
        return "Wrong command"
    }
}

exports.Handle = Handle;