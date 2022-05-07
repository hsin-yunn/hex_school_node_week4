const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const responseHelper = require('../helpers/responseHelper');

//store post
router.post('/posts', async function (req, res, next) {
  try {
    const postData = req.body;
    //add auth id
    postData.user = '62755d5f0b8518e011bf7c11';
    //name check
    if (!postData.user) {
      responseHelper.errorHandler(res, 400, 'user is required');
    } else if (!postData.content && !postData.image) {
      responseHelper.errorHandler(res, 400, 'content or image is required');
    } else {
      const post = await Post.create(postData);
      res.status(201).json({
        data: post,
      });
    }
  } catch (err) {
    responseHelper.errorHandler(res, 400, 'data format is not correct');
  }
});

module.exports = router;
