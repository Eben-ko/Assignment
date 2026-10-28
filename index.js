const express = require('express');
const index = express();
const PORT = 3000;

index.use(express.json()); // Middleware to parse JSON request bodies

// In-memory database (JavaScript array)
let students = [];

// Add a new student
index.post('/create', (req, res) => {
    const { name, age, gender, phone, email, college, department, level } = req.body;

    // New student profile
    const newStudent = {
        id: Date.now(),
        name,
        age,
        gender,
        phone,
        email,
        college,
        department,
        level
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// Get all students
index.get('/getall', (req, res) => {
    res.json(students);
});

// Get a student by ID
index.get('/getone/:id', (req, res) => {
    const { id } = req.params;
    const student = students.find((s) => s.id === parseInt(id));

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    };

    res.json(student);
});

// Update student informaion
index.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, gender, phone, email, college, department, level } = req.body;
    const student = students.find((s) => s.id === parseInt(id));

    if (!student) {
        return res.status(404).json({ error:'Student not found' });
    };

    student.name = name;
    student.age = age;
    student.gender = gender;
    student.phone = phone;
    student.email = email;
    student.college = college;
    student.department = department;
    student.level = level;

    res.json(student);
});

// Delete a student
index.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const studentIndex = students.findIndex(s => s.id === parseInt(id));

    if (!studentIndex === -1) {
        return res.status(401).json('student not found');
    };

    const deletedStudent = students.splice(studentIndex, 1);
    res.json(deletedStudent);
});

index.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});