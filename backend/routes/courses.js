const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all courses
router.get('/', async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /courses failed:', err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// CREATE new course
router.post('/', async (req, res) => {
  try {
    const {
      image,
      type,
      description_1,
      title,
      description_2,
      price,
      educator,
      timeline,
      people,
      rating,
      coupon
    } = req.body;

    const result = await pool.query(
      `INSERT INTO courses (image_url, type, description_1, title, description_2, price, educator, timeline, people, rating, coupon)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [image, type, description_1, title, description_2, price, educator, timeline, people, rating, coupon]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('POST /courses failed:', err);
    res.status(500).json({ error: 'Failed to add course' });
  }
});

// UPDATE a course
router.put('/:id', async (req, res) => {
  try {
    const {
      image,
      type,
      description_1,
      title,
      description_2,
      price,
      educator,
      timeline,
      people,
      rating,
      coupon
    } = req.body;

    const result = await pool.query(
      `UPDATE courses
       SET image=$1, type=$2, description_1=$3, title=$4, description_2=$5,
           price=$6, educator=$7, timeline=$8, people=$9, rating=$10, coupon=$11
       WHERE id=$12 RETURNING *`,
      [image, type, description_1, title, description_2, price, educator, timeline, people, rating, coupon, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /courses/:id failed:', err);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// DELETE a course
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courses WHERE id = $1', [req.params.id]);
    res.json({ deleted: true });
  } catch (err) {
    console.error('DELETE /courses/:id failed:', err);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

module.exports = router;
