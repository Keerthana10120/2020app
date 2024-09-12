const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

router.post('/setprofilepic', (req, res) => {
    const { email, profilepic } = req.body;


    // console.log("email: ", email);
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Credentials" })
            }
            savedUser.profilepic = profilepic;
            savedUser.save()
                .then(user => {
                    res.json({ message: "Profile picture updated successfully" })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/addpost', async (req, res) => {
  const { email, post, postdescription } = req.body;

  try {
    // Find the user with the given email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    // Create a new post
    const newPost = await new Post({
      user: user._id,
      image: post,
      caption: postdescription,
    }).save();

    // Add the post to the user's posts array
      user.posts.push({ postId: newPost._id, post: post, postdescription: postdescription });

    // Save the user
    await user.save();

    res.json({ message: "Post added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ error: "Error adding post" });
  }
});


router.post('/addmoviepost', async (req, res) => {
  const { email, post, postdescription } = req.body;

  try {
    // Find the user with the given email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({ error: "Invalid Credentials" });
    }

    // Create a new post
    const newPost = await new Post({
      user: user._id,
      image: post,
      caption: postdescription,
    }).save();

    // Add the post to the user's posts array
      user.posts2.push({ postId: newPost._id, post: post, postdescription: postdescription });

    // Save the user
    await user.save();

    res.json({ message: "Post added successfully" });
  } catch (err) {
    console.log(err);
    res.json({ error: "Error adding post" });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', ['profilepic', 'username'])
      .sort({ createdAt: 'desc' });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
