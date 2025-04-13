const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const personRoutes = require('./routes/personRoutes');

// ✅ MongoDB Atlas Connection
mongoose.connect("mongodb+srv://anjalikumari1153:admin123@cluster0.boq2ebj.mongodb.net/personDB")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/person', personRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Person API!');
  });
  

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
