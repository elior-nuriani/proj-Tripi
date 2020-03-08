
const dbService = require('../../services/db-service.js')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    // getById,
    getByEmail,
    remove,
    update,
    add
}

async function query() {
    const collection = await dbService.getCollection('users')
    try {
        const users = await collection.find().toArray();
        return users;
    } catch (err) {
        // console.log('ERROR: cannot find users')
        throw err;
    }
}

// async function getById(userId) {
//     const collection = await dbService.getCollection('users')
//     try {
//         const user = await collection.findOne({"_id":ObjectId(userId)})
//         return user
//     } catch (err) {
//         console.log(`ERROR: while finding user ${userId}`)
//         throw err;
//     }
// }
async function getByEmail(email) {
    const collection = await dbService.getCollection('users')
    try {
        const user = await collection.findOne({email})
        return user
    } catch (err) {
        // console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('users')
    try {
        await collection.remove({"_id":ObjectId(userId)})
    } catch (err) {
        // console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('users')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        // console.log(`ERROR: cannot insert user`)
        throw err;
    }
}


async function update(user) {
    const collection = await dbService.getCollection('users')
    user._id = ObjectId(user._id);
    try {
        await collection.replaceOne({"_id":ObjectId(user._id)}, {$set : user})
        return user;
    } catch (err) {
        // console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {};
//     if (filterBy.txt) {
//         criteria.username = filterBy.txt
//     }
//     if (filterBy.minBalance) {
//         criteria.balance = {$gte : +filterBy.minBalance}
//     }
//     return criteria;
// }


