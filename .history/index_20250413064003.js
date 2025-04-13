const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const personRoutes = require('./routes/personRoutes');

// Connect to MongoDB (replace with your connection string if using MongoDB Atlas)
mongoose.connect(
    mongodb+srv://anjalikumari1153:<db_password>@cluster0.boq2ebj.mongodb.net/,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/person', personRoutes);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
