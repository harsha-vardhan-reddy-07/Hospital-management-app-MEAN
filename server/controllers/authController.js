// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');

exports.register = async (req, res) => {
  try {
    const { username, password, role, specialization, contact, age, gender } = req.body;

    console.log(username, password, role);
 
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role,
    });

    
    
    if (role === 'doctor'){
      
      const newDoc = new Doctor({
        name: username,
        specialization,
        contact
      })
      await newDoc.save();
    }

    if (role === 'patient'){
      
      const newPat = new Patient({
        name: username,
        age,
        gender,
        contact
      })
      console.log(newPat);
      await newPat.save();
    }
    
    await newUser.save();
    // Save the user

    return res.status(201).json(newUser);
  } catch (err) {
    // console.error(err);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ username }).populate('role');
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, role: user.role.name }, 'secretkey');
  
      // Include user data in the response
      return res.status(200).json({ user, token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to login' });
    }
  };
  

exports.createRole = async (req, res) => {
    try {
      const { name } = req.body;
  
      // Check if the role already exists
      const existingRole = await Role.findOne({ name });
      if (existingRole) {
        return res.status(400).json({ error: 'Role already exists' });
      }
  
      // Create a new role
      const newRole = new Role({ name });
  
      // Save the role
      await newRole.save();
  
      return res.status(201).json(newRole);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create role' });
    }
  };
