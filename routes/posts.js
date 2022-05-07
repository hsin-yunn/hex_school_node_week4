const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const responseHelper = require('../helpers/responseHelper');

//index
router.get('/', async function (req, res, next) {
  try {
    const filter = {};
    //search
    if (req.query.search) {
      const search = req.query.search;
      filter.content = {
        $regex: search,
      };
    }
    //sort
    const sort = {};
    if (req.query.orderWay && req.query.orderBy) {
      sort[req.query.orderBy] = req.query.orderWay === 'asc' ? 1 : -1;
    }
    //sort->createdAt/asc.desc,
    const posts = await Post.find(filter)
      .populate({
        path: 'user likes',
        select: 'name -_id',
      })
      .sort(sort);
    res.status(200).json({
      data: posts,
    });
  } catch (err) {
    responseHelper.errorHandler(res, 400, 'get posts error');
  }
});
//store
router.post('/', async function (req, res, next) {
  try {
    const postData = req.body;
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
//update
router.patch('/:id', async function (req, res, next) {
  try {
    const postData = req.body;
    const _id = req.params.id;
    //name check
    if (!postData.name) {
      responseHelper.errorHandler(res, 400, 'name is required');
    } else if (!postData.content) {
      responseHelper.errorHandler(res, 400, 'name is required');
    } else if (!_id) {
      responseHelper.errorHandler(res, 400, 'data is not exist.');
    } else {
      const post = await Post.findByIdAndUpdate(_id, postData, {
        new: true,
      });
      if (!post) {
        responseHelper.errorHandler(res, 400, 'data is not exist.');
      } else {
        res.status(200).json({
          data: post,
        });
      }
    }
  } catch (err) {
    responseHelper.errorHandler(res, 400, 'data format is not correct');
  }
});
//delete
router.delete('/:id', async function (req, res, next) {
  const _id = req.params.id;
  await Post.findByIdAndDelete(_id).then((data) => {
    if (!data) {
      responseHelper.errorHandler(res, 400, 'data is not exist.');
    } else {
      res.status(200).json({
        status: 'success',
        message: 'data delete',
      });
    }
  });
});
//delete all
router.delete('/', async function (req, res, next) {
  await Post.deleteMany({});
  res.status(201).json({
    data: [],
  });
});
//show
router.get('/:id', async function (req, res, next) {
  const _id = req.params.id;
  if (!_id) {
    responseHelper.errorHandler(res, 400, 'data is not exist.');
  }
  const post = await Post.findById(_id);
  if (!post) {
    responseHelper.errorHandler(res, 400, 'data is not exist.');
  } else {
    res.status(200).json({
      data: post,
    });
  }
});
module.exports = router;
