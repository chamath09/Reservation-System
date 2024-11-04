const express = require('express');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');

const authRoutes = require('./routes/auth.route.js');
const adminRoutes = require('./routes/admin.route.js');

const lectureRoutes = require('./routes/lecture.route.js');
const labRoutes = require('./routes/lab.route.js');
const examRoutes = require('./routes/exam.route');

const lectureLabRoutes = require('./routes/lectureLabRoutes');

const examroutes = require('./routes/examRoutes'); 

const Exam = require('./models/Exam');
const Lab = require('./models/Lab');
const Lecture = require('./models/Lecture');
const deletePastRecords = require('./utils/recordCleanup');

const noticeRoutes = require('./routes/noticeRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Add all origins you want to allow
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add other methods if needed
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

app.use('/api/auth', authRoutes);
app.use('/api/auth/admin', adminRoutes);

app.use('/api/lecture', lectureRoutes);
app.use('/api/lab', labRoutes);
app.use('/api/exams', examRoutes);

app.use('/api/sessions', lectureLabRoutes);

app.use('/api/exams', examroutes);

app.use('/api/notices', noticeRoutes);

cron.schedule('0 * * * *', () => {
    deletePastRecords(Exam);
    deletePastRecords(Lab);
    deletePastRecords(Lecture);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
