const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
  // get all users
  getAllUser(req, res) {
      User.find({})
      .populate({
        path: 'thought',
        select: '-__v'
      })
      .select('-__v')
      .sort({ createdAt: 'desc' })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  
  // get one Users by id
  getUserById({ params }, res) {
  User.findOne({ _id: params.id })
    .populate({
      path: 'thought',
      select: '-__v'
    })
    .select('-__v')
    .sort({ createdAt: 'desc' })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

    // createUser
  createUser({ body }, res) {
      User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

    // update User by id
  updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

        // delete User
    deleteUserById({ params }, res) {
        console.log(params);
        User.findOneAndDelete({ _id: params.id })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that ID.' });
                }
                return Thought.deleteMany(
                    { username: dbUserData.username },
                    { new: true, runValidators: true }
                )
                    .then(dbThoughtData => {
                        res.json({ message: `This user has been deleted.`, dbUserData, dbThoughtData });
                    });
            })
            .catch(err => res.status(400).json(err));
    },

    createFriend({ params, body }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
        { new: true, runValidators: true }
        )
        .select('-__v')
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(405).json({ message: 'No friend found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

     // delete friend
    deleteFriend( {params} , res) {
      console.log(params);
      console.log("*****************");
      console.log("user: "+params.userId);
      console.log("friend: "+params.friendId);
      console.log("*****************");

      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: { _id: params.friendId } } },
        { new: true, runValidators: true }
      )
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No friend found with this id!' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));  
    }
}

module.exports = userController;