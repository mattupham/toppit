const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const options = { promiseLibrary: require('bluebird') };

const uri = process.env.MONGODB_URI || `mongodb://localhost/toppit`;
const passportLocalMongoose = require('passport-local-mongoose');
var db = mongoose.createConnection(uri, options);

const topicSchema = mongoose.Schema({
  _id:            mongoose.Schema.Types.ObjectId,
  subtoppit:      String,
  headline:       String,
  description:    String,
  timeStamp:      Date,
  upvotes:        Number,
  commentId:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  authorId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorUsername: String,
  emotion:        String,
  upvoteUsers:    []
});

const commentSchema = mongoose.Schema({
  _id:            mongoose.Schema.Types.ObjectId,
  text:           String,
  timeStamp:      Date,
  authorId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorUsername: String,
  parentId:       mongoose.Schema.Types.ObjectId,
  comments:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  topicId:        String,
  username:       String,
  upvotes:        Number
});

// const nestedCommentSchema = mongoose.Schema({
//   _id:            mongoose.Schema.Types.ObjectId,
//   text:           String,
//   timeStamp:      Date,
//   authorId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   authorUsername: String,
//   parentId:       mongoose.Schema.Types.ObjectId,
//   comments:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'NestedComment' }],
//   topicId:        String,
//   username:       String,
//   upvotes:        Number
// });

const userSchema = mongoose.Schema({
  username:    String,
  password:    String,
  googleId:    String,
  githubId:    String,
  fullName:    String,
  photo:       String,
  topicId:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  listId:      Number,
  commentId:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

userSchema.plugin(passportLocalMongoose);

let Topic = db.model('Topic', topicSchema);
let User = db.model('User', userSchema);
let Comment = db.model('Comment', commentSchema);
// let NestedComment = db.model('NestedComment', nestedCommentSchema);
//let List = db.model('List', listchema);
//let Organization = db.model('Organization', sessionSchema);

let getTopics = (callback) => {

  Topic.find({}, null, {sort: '-timeStamp'})
    .populate('authorId')
    .exec(function(err, result) {
      if (err) {
        console.log(err.message);
        callback(err, null);
        return;
      }

      callback(null, result);
    });
};

let getTopicsInSubtoppit = (subtoppit, callback) => {
  console.log('in database...');
  Topic.find({'subtoppit': subtoppit}, null, {sort: '-timeStamp'}).exec((err, topics) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, topics);
    }
  });
};

//query key should be either username or _id
let getUser = (query, callback) => {
  User.findOne(query, (err, user) => {
    if (err) {
      console.log(err.message);
      callback(err, null);
      return;
    }
    callback(null, user);
  });
};

let findOrCreateUser = (query, attributes, callback) => {
  User.findOneAndUpdate(query, attributes, { new: true, upsert: true }, (err, user) => {
    if (err) {
      console.log(err.message);
      callback(err, null);
      return;
    }
    callback(null, user);
  });
}

let getSelectTopics = (query, callback) => {
  var sortParams = {};
  var filterParams = {};
  if (query.sortBy.length > 0) {
    sortParams[query.sortBy] = -1;
  }
  if (query.filterBy.length > 0) {
    filterParams['emotion'] = query.filterBy;
  }
  Topic.find(filterParams).sort(sortParams).populate('authorId').exec(function (err, results) {
    if (err) {
      console.log(err.message);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

let getTopicById = (topicId, callback) => {
  // find topic instancy by topicId, populate commentId, then inside commentId Values, populate authorId
  Topic.
    findById(topicId).
    populate('authorId').
    populate({path : 'commentId', populate : {path : 'authorId'}}).
    exec(function (err, topic) {
      if (err) {
        console.log(err.message);
        callback(err, null);
        return;
      }
      console.log('Topic Returned From DB: ', topic);
      callback(null, topic);
    });
};

// Save Topic to MongoDB
let saveTopic = (topic, callback) => {
  let id = mongoose.Types.ObjectId();

  let newTopic = new Topic(topic);
  newTopic._id = id;

  Topic.create(newTopic, (err, result) => {
    if (err) {
      console.log(err.message);
      callback(err, null);
    }
    callback(null, result);
  });
};

const updateVoteCount = (id, currentUser, callback) => {
  Topic.update(
    {
      "_id": id,
      "upvoteUsers": {"$ne": currentUser} 
    },
    {
      '$push': {'upvoteUsers': currentUser},
      '$inc': {'upvotes': 1}
    }, 
    (err, doc) => {
      if (err) {
        console.log(err)
        callback(err, null);
        return;
      }
      callback(null, doc)
    }
  )
};

const removeUpvote = (id, currentUser, callback) => {
  Topic.update(
    {
      "_id": id,
      "upvoteUsers": currentUser
    },
    {
      "$pull": {"upvoteUsers": currentUser},
      "$inc": {"upvotes": -1}
    },
    (err, doc) => {
      if (err) {
        console.log(err);
        callback(err, null);
        return;
      }
      callback(null, doc);
    }
  );
};

let getNestedComment = (commentId, callback) => {
  console.log('Comment id', commentId);
  Comment.findById(commentId).exec((err, comment) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('Got nested comment from db', comment);
      callback(null, comment);
    }
  });
};


let replyToComment = (commentObj, topicId, commentId, callback) => {
  let id = mongoose.Types.ObjectId();

  let commentModel = new Comment({
    _id:            id,
    text:           commentObj.text,
    timeStamp:      commentObj.timeStamp,
    topicId:        topicId,
    authorId:       commentObj.authorId,
    authorUsername: commentObj.authorUsername,
    parentId:       commentObj.parentId,
    comments:       commentObj.comments
  });

  console.log(commentModel);
  Topic.findById(topicId).exec((err, topic) => {
    if (err) {
      console.log('Error getting topic', err);
    } else {
      console.log('Topic', topic);
      console.log(topic.commentId);
      // Comment.findById(commentId, (err, comment) => {
      //   if (err) {
      //     console.log('Error getting comment', err);
      //   } else {
      //     console.log('Found comment', comment);
      //     let createdComment = Comment.create(commentModel, (err, created) => {
      //       if (err) {
      //         console.log('Could not create the comment', err);
      //       } else {
      //         Comment.update({ '_id': mongoose.Types.ObjectId(commentId) }, {'$addToSet': { 'comments': createdComment }}, (err, nested) => {
      //           if (err) {
      //             console.log('Could not update the commentId array', err);
      //             callback(err, null);
      //           } else {
      //             console.log('Updated the commentId array!', nested);
      //             callback(null, nested);
      //           }
      //         });
      //       }
      //     });
      //   }
      // });
      // let createdComment = Comment.create(commentModel, (err, result) => {
      //   if (err) {
      //     console.log('Could not create the comment', err);
      //   } else {

      //   }
      // })
      let created = Comment.create(commentModel);
      Comment.update({ '_id': commentId }, {'$push': { 'comments': commentModel._id }}, (err, nested) => {
        if (err) {
          console.log('Could not update the commentId array', err);
          callback(err, null);
        } else {
          console.log('Updated the commentId array!', nested);
          callback(null, nested);
        }
      });
      // topic.commentId.findOne({ _id: commentId }, (err, comment) => {
      //   if (err) {
      //     console.log('Error getting comment', err);
      //   } else {
      //     comment.update({'$addToSet': { 'comment.$.comments': commentModel}});
      //   }
      // });
      // Comment.findOne({ _id: commentId }).exec((err, data) => {
      //   if (err) {
      //     console.log('Error getting comment', err);
      //   } else {
      //     console.log('Successfully got comment', data);
      //   }
      // });
      // Comment.findOne({ _id: commentId }, {'$addToSet': {'comments': commentModel }});
      // Comment.findOne({ _id: commentId }, (err, comment) => {
      //   if (err) {
      //     console.log('Could not find comment', err);
      //   } else {
      //     console.log(comment);
      //     for (var i = 0; i < comments.$.comments.length; i++) {
      //       console.log(comment.comments[i]);
      //       // comment.update({ '$set': { 'comment.comments[i]': commentModel }}, (err, nested) => {
      //       //   if (err) {
      //       //     console.log('Error nesting comment', err);
      //       //     callback(err, null);
      //       //   } else {
      //       //     console.log('Successfully nested comment!', nested);
      //       //     callback(null, nested);
      //       //   }
      //       // });
      //     }
      //   }
      // });
      // Comment.update({ _id: commentId }, { '$set': {'comments.comments': commentModel }});
      

      // Comment.update({ _id: commentId }, $push: { commentModel })

      // let comment = Comment.findById(commentId);
      // console.log('Comment', comment);
      // comment.update({})
      // let populated = comment.populate({ path: 'comments', populate: { path: 'comments' }});
      // console.log('Populated', populated);

      // populated.exec((err, nested) => {
      //   if (err) {
      //     console.log('Error nesting comment', err);
      //     callback(err, null);
      //   } else {
      //     console.log('Successfully nested comment!', nested);
      //     callback(null, nested);
      //   }
      // });
    }
  });
};

let getOneComment = (text, topicId, author, callback) => {
  Topic.findOne({ _id: topicId }, (err, topic) => {
    if (err) {
      console.log('Could not find topic', err);
    } else {
      console.log(topic);
      Comment.findOne({ text: text, username: author }, (err, comment) => {
        if (err) {
          callback(err, null);
        } else {
          console.log('Got the comment!');
          callback(null, comment);
        }
      });
    }
  });
};

// - Saves comment to Mongo DB
let saveComment = (commentObj, topicId, callback) => {
  let id = mongoose.Types.ObjectId();

  let comment = new Comment({
    _id:        id,
    text:       commentObj.text,
    timeStamp:  commentObj.timeStamp,
    authorId:   commentObj.topicId,
    username:   commentObj.username,
    upvotes:    commentObj.upvotes
  });
  console.log('Being saved before findOne', comment);
  // find User instance by username
  User.findOne({ username: commentObj.username}, (err, doc) => {
    if (err) {
      console.log(err);
      return;
    }
    // then add that instances object id 'doc._id' to the comments authorId property
    comment = {
      _id:        id,
      text:       commentObj.text,
      timeStamp:  commentObj.timeStamp,
      authorId:   doc._id,
      topicId:    commentObj.topicId,
      username:   commentObj.username,
      upvotes:    commentObj.upvotes
    };
    console.log('Being created before create', comment);
    Comment.create(comment, (err, result) => {
      if (err) {
        console.log(err.message);
        callback(err, null);
      }
      console.log("Comment Save Success");
  
      // create reference from authorId property to user object
      Comment.populate(comment, {path:"authorId"}, (err, commentData) => {
        if (err) {
          console.log(err.message);
          callback(err, null);
          return;
        }
        callback(null, commentData);
      });
    });
  });

  // Add 'comment._id' to topic instance for comment-object reference
  // - Find topic by topicId  
  Topic.findById(topicId, (err, doc) => {
    if(err){
      console.log(err);
    } else {
      // - Insert comment._id into Topic
      doc.commentId.push(comment._id);      
      // - Update Database
      Topic.update({_id: topicId}, doc, (err, raw) => {
        if (err) {
          console.log(err);
        }
        console.log("Successful update of topic", raw);       
      });
    }
  });

};

module.exports.saveComment = saveComment;
module.exports.saveTopic = saveTopic;
module.exports.getTopics = getTopics;
module.exports.updateVoteCount = updateVoteCount;
module.exports.getSelectTopics = getSelectTopics;
module.exports.getTopicById = getTopicById;
module.exports.User = User;
module.exports.getUser = getUser;
module.exports.findOrCreateUser = findOrCreateUser;
module.exports.removeUpvote = removeUpvote;
module.exports.replyToComment = replyToComment;
module.exports.getTopicsInSubtoppit = getTopicsInSubtoppit;
module.exports.getOneComment = getOneComment;
module.exports.getNestedComment = getNestedComment;
// module.exports.users = User;
// module.exports.comments = Comment;
// module.exports.lists = List;
// module.exports.organizations = Organizatoin;