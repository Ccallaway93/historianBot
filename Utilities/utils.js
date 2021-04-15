const _memberRepository = require('../Repository/memberRepository');
const _hotTakeRepository = require('../Repository/hotTakeRepository');


let coords, people, name, member, hotTake;

function Member(first, last, id) {
    this.id = id;
    this.firstName = first;
    this.lastName = last;
}

function HotTake(description, punishment, id) {
    this.id = id;
    this.description = description;
    this.punishment = punishment;
}


const getMembers = async (requestString) => {
    
    const members = [];

    coords = /\b(Conner|Kevin|Matt|Erik|Mack|Nick|Seth|Duncan|Morgan)(\b\s*([A-Z]\w+)){0,2}/g

    people = requestString.match(coords);

    if (people != null) 
    {

        people.forEach(person => {
            name = person.split(" ");
            member = new Member(name[0], name[1]);
           members.push(member);
       })

    }
    else {
        throw TypeError('No Name given, please provide at least 1 name associated with this HotTake');
    }

    console.log('members: ' + members)
    // Now look up the Member in the Database to find the Ids
    const sanitizedMembers = await _memberRepository.getMemberIds(members);

    return sanitizedMembers;

}

const getDescriptionAndPunishment = (requestString) => {

    coords = /\(([^)]+)\)/g
    const body = requestString.match(coords);

    var removeSpecialChars = /[^a-zA-Z0-9-. ]/g;

    if(body != null)
    {

        if(body.length < 1)
            throw TypeError('Wrong type given, expected at least 1 set of parenthesis');
        else if(body.length == 1)
            hotTake = new HotTake(body[0].replace(removeSpecialChars, ""));
        else if(body.length == 2)
            hotTake = new HotTake(body[0].replace(removeSpecialChars, ""), body[1].replace(removeSpecialChars, ""));
        else {
            throw TypeError('Wrong type given, wrong format used');
        }
    }
    else {
        throw TypeError('Wrong type given, wrong format used');
    }


   return hotTake;

}





module.exports = {
    getMembers,
    getDescriptionAndPunishment
}