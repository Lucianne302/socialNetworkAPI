//const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');
//const Comment = require('./Comment');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
    //   required: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: createdAtVal => dateFormat(createdAtVal)
//     },
//     size: {
//       type: String,
//       required: true,
//       enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
//       default: 'Large'
//     },
    thoughts: [],
    comments: [
      {
        type: Schema.ObjectId,
        ref: 'Thought'
      }
    ]
  },
//     toppings: [],
//     comments: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Comment'
//       }
//     ]
//   },
//   {
//     toJSON: {
//       virtuals: true,
//       getters: true
//     },
//     id: false
//   }
// );

// // get total count of comments and replies on retrieval
// UserSchema.virtual('commentCount').get(function() {
//   //return this.comments.length;
//   return this.comments.reduce(
//     (total, comment) => total+ comment.replies.length+1,0)
//}
);

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;