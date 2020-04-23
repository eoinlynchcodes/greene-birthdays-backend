const db = require('../dbConfig');

module.exports = {
addUser,
addFamilyMember,
findAllUsers,
findAllFamilyMembers,
findUserBy
}

async function addUser(user){
    await db('users')
    .insert(user, 'id');
    return db('users');
}

async function addFamilyMember(user){
    await db('familyMembers')
    .insert(user, 'id');
}

function findAllFamilyMembers(){
    return db('familyMembers')
}

function findAllUsers(){
    return db('users')
}

function findUserBy(filter){
    return db('users').where(filter);
}