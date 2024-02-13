const userCreate = require('../../../controllers/users/user.create');
const { getAllUsers, getSingleUser } = require('../../../controllers/users/user.read');
const { userTemporaryRemove, userPermanentRemove } = require('../../../controllers/users/user.remove');
const { userUpdate } = require('../../../controllers/users/user.update');

const UserRoots = {
    getUsers: (args, context) => getAllUsers(args, context),
    getUser: (args, context) => getSingleUser(args, context),
    createUser: (args) => userCreate(args.inputData),
    updateUser: (args, context) => userUpdate(args.inputData, context),
    removeTempUser: (args, context) => userTemporaryRemove(args.inputData, context),
    removePerUser: (args, context) => userPermanentRemove(args.inputData, context)
}

module.exports = UserRoots;
