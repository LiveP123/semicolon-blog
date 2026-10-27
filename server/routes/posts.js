const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// 1. GET: שליפת כל הפוסטים
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// 2. GET: שליפת פוסט בודד לפי ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST: הוספת פוסט חדש
router.post('/', async (req, res) => {
  try {
    const { title, excerpt, content, category } = req.body;
    const newPost = new Post({ title, excerpt, content, category });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error saving post:', err); // הדפסה בטרמינל של השרת
    res.status(400).json({ error: err.message }); // החזרת השגיאה המפורטת
  }
});

// 4. PUT: עדכון פוסט קיים
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update post' });
  }
});

// 5. DELETE: מחיקת פוסט
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;