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
        Thought.findOne({  _id: params.id })
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

    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
          .then(({ _id }) => {
            return Thought.findOneAndUpdate(
              { _id: params.id },
              { $push: { thought: _id } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            console.log(dbThoughtData);
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },
    
    //Create thought
    // addThought({ body }, res) {
    // console.log(params);
    // Thought.findOneAndUpdate(
    //     { _id: params.thoughtId },
    //     { $push: { User: thought._id } },
    //     { new: true, runValidators: true }
    //     )
    //     .then(dbThoughtData => {
    //         console.log(dbThoughtData);
    //         if (!dbThoughtData) {
    //             res.status(404).json({ message: 'No user found with this id!' });
    //             return;
    //         }
    //         res.json(dbThoughtData);
    //     })
    //     .catch(err => res.json(err));
    // },


    // update thought by id
    updateThoughtById({ params, body }, res) {
    console.log(params);
    console.log(body);
    Thought.findOneAndUpdate(
        { _id: params.id },
        { $push: { User: body.username } },
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
    removeThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then (deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return Thought.findOneAndUpdate(
                { _id: params.id },
                { $pull: { thought: {_id: params.id } } },
                { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        })
    },
    
    // add reaction to thought
    addReaction({ params, body }, res) {
        console.log(params);
        console.log(body);
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbReactionData => {
            if (!dbReactionData) {
                res.status(404).json({ message: 'No reaction found!' });
                return;
            }
            res.json(dbReactionData);
        })
        .catch(err => res.status(400).json(err));
    },

    // remove reaction
    removeReactionById({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true, runValidators: true }
        )
        .then(dbReactionData => {
            if (!dbReactionData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbReactionData);
        })
        .catch(err => res.status(400).json(err));        
    }
};

module.exports = thoughtController;
