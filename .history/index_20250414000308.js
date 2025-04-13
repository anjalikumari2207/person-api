const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const personRoutes = require('./routes/personRoutes');

const app = express();
mongoose.connect("mongodb+srv://anjalikumari1153:admin123@cluster0.boq2ebj.mongodb.net/")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/person', personRoutes);
app.get('/', (req, res) => res.redirect('/person'));

app.listen(3000, () => console.log("🚀 Server on http://localhost:3000"));
