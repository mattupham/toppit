const api = require('express').Router();
const db = require('../db');

// Get all topics
api.get('/topics', (req, res) => {

  if (Object.keys(req.query).length) {
    
    db.getSelectTopics(req.query, (error, result) => {
      if (error) {
        res.status(503).end();
        console.log('Error: ', error.message);
        return;
      }
      res.status(200).send(result);
    });
  } else {
    db.getTopics((error, result) => {
      if (error) {
        res.status(503).end();
        console.log('Error: ', error.message);
        return;
      }
      res.status(200).send(result);
    });
  }
});

api.get('/:subtoppit', (req, res) => {
  console.log('server req', req.params.subtoppit);
  db.getTopicsInSubtoppit(req.params.subtoppit, (error, result) => {
    if (error) {
      res.status(503).end();
      return;
    } else {
      console.log('result..... in server', result);
      res.status(200).send(result);
    }
  });
});


// Get an individual topic
api.get('/topic/:topicId', (req, res) => {
  db.getTopicById(req.params.topicId, (error, topic) => {
    if (error) {
      console.log(error.message);
      res.status(503).end();
      return;
    }
    res.status(200).send(topic);
  });
});


// Create a new topic
api.post('/topic', (req, res) => {
  db.saveTopic(req.body, (error, result) => {
    if (error) {
      res.status(503).end();
      console.log('Error: ', error.message);
      return;
    }
    res.status(200).send(result);
  });
});


// Update a topic
api.patch('/topic/:topicId', (req, res) => {
  if (req.body.upvotes === 1) {
    db.updateVoteCount(req.params.topicId, req.body.currentUser, (error, result) => {
      if (error) {
        res.status(503).end();
        return;
      }
      res.status(200).send(result);

    });
    
  } else {
    db.removeUpvote(req.params.topicId, req.body.currentUser, (error, result) => {
      if (error) {
        res.status(503).end();
        return;
      }
      res.status(200).send(result);

    });
  }

});


//Post a comment to a topic
api.post('/topic/:topicId', (req, res) => {
  
  db.saveComment(req.body, req.params.topicId, (error, result) => {
    if (error) {
      res.status(503).end();
      return;
    }
    res.send(result);
  });
});

api.get('/comments/:topicId/:author', (req, res) => {
  db.getOneComment(req.query.text, req.params.topicId, req.params.author, (err, data) => {
    if (err) {
      res.status(404).send('Unable to get one comment');
    } else {
      console.log('Got', req.body.text, req.params.topicId, req.params.author);
      res.status(200).send(data);
    }
  });
});

api.post('/topic/:topicId/:commentId', (req, res) => {
  db.replyToComment(req.body, req.params.topicId, req.params.commentId, (err, data) => {
    if (err) {
      res.status(400).send('Unable to reply to comment');
    } else {
      console.log('Replied to comment!', data);
      res.status(200).send(data);
    }
  });
  // console.log('Hi', req.params.topicId, req.params.commentId);
  // res.send('Hi', req.params.topicId, req.params.commentId);
});

api.get('/user/:userId', (req, res) => {

  let query = {};
  if (req.params.userId === 'current') {
    query._id = req.session.passport.user;
  } else {
    query = req.params.userId._id;
  }

  db.getUser(query, (err, user) => {
    if (err) {
      res.status(400).send('Unable to retrieve user');
      console.log('Error: ', err.message);
      return;
    }

    res.status(200).send(user);
  });
});

module.exports = api;