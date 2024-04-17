const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Express now includes built-in JSON parsing
app.use(express.json());

// Handle preflight requests for /submit-contact-form
app.options('/submit-contact-form', cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecoexplorer', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email is already taken
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database with the hashed password
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'Registration successful. Click <a href="/select.html" style="color: #007bff; text-decoration: underline;">here</a> to continue.'});
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 

// Login endpoint
app.post('/login', async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Check if the username or email exists in the database
        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.json({ message: 'Login successful. Click <a href="/select.html" style="color: #007bff; text-decoration: underline;">here</a> to continue.' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Reset password endpoint
app.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Email not found' });
        }

        // Implement logic to send a password reset email to the user (not included in this example)

        res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define the contact schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

// Create the Contact model
const Contact = mongoose.model('Contact', contactSchema);

// Contact form endpoint
app.post('/submit-contact-form', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Save the contact form data to the database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // You can also implement logic here to send a confirmation email to the user (not included in this example)

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a schema for the data
const speciesDataByCountrySchema = new mongoose.Schema({
    country: String,
    plants: [String],
    wildlife: [String]
});

// Create a model based on the schema
const SpeciesDataByCountry = mongoose.model('speciesDataByCountry', speciesDataByCountrySchema);

// Define a route to fetch the list of countries
app.get('/countries', async (req, res) => {
    try {
        // Retrieve all unique country names from the MongoDB collection
        const countries = await SpeciesDataByCountry.distinct('country');
        res.json({ countries });
    } catch (error) {
        console.error('Error retrieving country list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Define a route to fetch data
app.get('/species/:country', async (req, res) => {
    const country = req.params.country;
    try {
        // Retrieve data from the MongoDB collection based on the requested country
        const data = await SpeciesDataByCountry.findOne({ country: country });
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Data not found for the requested country');
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});