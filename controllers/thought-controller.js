const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // get one Users by id
    getThoughtById({ params }, res) {
        Thought.findOne({  _id: params.thoughtId })
        .then(dbThoughtData => { 
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    //Create thought
    addThought({ params, body }, res) {
        console.log(params);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { User: thought._id } },
            { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        },


    // update thought by id
    updateThoughtById({ params, body }, res) {
    console.log(params);
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { User: thought._id } },
        { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            console.log(dbThoughtData);
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // remove reply
    removeThoughtById({ req }, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { thought: { thoughtId: params.thoughtId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    
    // add reaction to thought
    addReaction({ req }, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.reactionId },
            { $addToSet: { reaction: req.body } },
            { new: true, runValidators: true }
        )
        .then(dbReactionData => {
            if (!dbReactionData) {
                res.status(404).json({ message: 'No reaction found with this id!' });
                return;
            }
            res.json(dbReactionData);
        })
        .catch(err => res.json(err));
    },

    // remove reaction
    removeReactionById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then (deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reaction: {_id: params.reactionId } } },
                { new: true, runValidators: true }
            )
            .then(dbReactionData => {
                if (!dbReactionData) {
                    res.status(404).json({ message: 'No reaction found with this id!' });
                    return;
                }
                res.json(dbReactionData);
            })
            .catch(err => res.json(err));
        })
    }
};

module.exports = thoughtController;
