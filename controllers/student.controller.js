const Student = require("../models/student.model");
const User = require("../models/user.model");

exports.addStudent = async (req, res) => {
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.studentId);

  if (req.body.id) {
    await Student.findByIdAndUpdate(req.body.id, req.body);
    req.flash("info", "Student updated!");
  } else {
    const student = new Student(req.body);
    await student.save();
    req.flash("info", "Student added!");
  }

  res.redirect("/");
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params._id);

  res.redirect("/");
};

exports.listStudentsPage = async (req, res) => {
  let mainHeader = "Student List";

  let students = await Student.find({}).lean();
  let name = req.user ? req.user.name : "Not logged in";
  let flashes = [...req.flash("info"), ...req.flash("success")];

  res.render("list", { header: mainHeader, students, name, flashes });
};

exports.addUpdateStudentPage = async (req, res) => {
  // This is an update, render the add-update handlebars file with
  // the student information.
  if (req.params._id) {
    let student = await Student.findById(req.params._id).lean();

    res.render("add-update-student", { student });
  }
  // This is a request to add a new student so show a blank form.
  else {
    res.render("add-update-student");
  }
};
