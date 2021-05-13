const express = require('express');
const router = express.Router();
const student = require('../controllers/student.controller.js');
const grade = require('../controllers/grade.controller.js');
const standard = require('../controllers/standard.controller.js');
const user = require('../controllers/users.controller');
const auth = require('../controllers/auth.controller');
const passport = require('passport');

// Route to handle POST /addStudent
router.get('/login', auth.loginPage);
router.post('/login', auth.login);

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))
router.get('/auth/google/redirect', passport.authenticate('google',
{ failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

router.use(auth.isAuthenticated);
//student routes
router.get('/', student.listStudentsPage);
router.get('/Students', student.listStudentsPage);
router.get('/addStudent', student.addUpdateStudentPage);
router.get('/updateStudent', student.addUpdateStudentPage);
router.post('/addNewStudent', student.addStudent);


router.get('/updatestudent/:_id', student.addUpdateStudentPage);
router.get('/updatestandard/:_id', standard.addUpdateStandardPage);
router.get('/updategrade/:_id', grade.addUpdateGradePage);
router.get('/deletestudent/:_id', student.deleteStudent);
router.get('/deletestandard/:_id', standard.deleteStandard);
router.get('/deletegrade/:_id', grade.deleteGrade);
router.get('/logout', auth.logout);
//standard routes
router.get('/Standards',standard.listStandardsPage)
router.get('/addStandard', standard.addUpdateStandardPage);
router.get('/updatestandard', standard.addUpdateStandardPage);
router.post('/addNewStandard', standard.addStandard);
//grade routes
router.get('/Grades',grade.listGradesPage)
router.get('/addGrade',grade.addUpdateGradePage);
router.post('/addNewGrade',grade.addGrade);
module.exports = router;