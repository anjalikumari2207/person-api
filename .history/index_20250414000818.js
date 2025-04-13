const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const personRoutes = require('./routes/personRoutes');

const app = express();
mongoose.connect('mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    serverSelectionTimeoutMS: 30000, // Increase timeout
    socketTimeoutMS: 45000 // Increase socket timeout
  })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ DB connection error:", err));
  ;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/person', personRoutes);
app.get('/', (req, res) => res.redirect('/person'));

app.listen(3000, () => console.log("🚀 Server on http://localhost:3000"));
