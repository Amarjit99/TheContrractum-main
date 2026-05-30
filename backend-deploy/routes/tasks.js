const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// GET all tasks (Admins only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    // If super admin, fetch all. If regular admin, fetch only tasks assigned to them or created by them.
    let filter = {};
    if (req.user.role !== 'super-admin') {
      filter = { $or: [{ assignedTo: req.user._id }, { createdBy: req.user._id }] };
    }
    
    const tasks = await Task.find(filter)
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .sort({ dueDate: 1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
});

// POST a new task
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate, relatedModule } = req.body;
    
    if (!title || !assignedTo) {
      return res.status(400).json({ message: 'Title and Assignee are required.' });
    }

    const newTask = new Task({
      title,
      description,
      assignedTo,
      createdBy: req.user._id,
      priority,
      dueDate,
      relatedModule
    });

    const savedTask = await newTask.save();
    const populatedTask = await Task.findById(savedTask._id)
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email');
      
    res.status(201).json(populatedTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Server error creating task' });
  }
});

// PUT update a task (status, reassign, etc.)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only super-admin, task creator, or task assignee can edit
    const isSuperAdmin = req.user.role === 'super-admin';
    const isCreator = task.createdBy.toString() === req.user._id.toString();
    const isAssignee = task.assignedTo.toString() === req.user._id.toString();

    if (!isSuperAdmin && !isCreator && !isAssignee) {
      return res.status(403).json({ message: 'Not authorized to edit this task' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email');
      
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Server error updating task' });
  }
});

// DELETE a task
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const isSuperAdmin = req.user.role === 'super-admin';
    const isCreator = task.createdBy.toString() === req.user._id.toString();

    if (!isSuperAdmin && !isCreator) {
      return res.status(403).json({ message: 'Only the creator or a super admin can delete this task.' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Server error deleting task' });
  }
});

module.exports = router;
