const Grade = require("../models/grade.model");

exports.addGrade = async (req, res) => {
  console.log(req.body.studentId);
  console.log(req.body.standardName);
  console.log(req.body.grade);

  if (req.body.id) {
    await Grade.findByIdAndUpdate(req.body.id, req.body);
    req.flash("info", "Grade updated!");
  } else {
    const grade = new Grade(req.body);
    await grade.save();
    req.flash("info", "Grade added!");
  }

  res.redirect("/Grades");
};

exports.deleteGrade = async (req, res) => {
  await Grade.findByIdAndDelete(req.params._id);

  res.redirect("/Grades");
};

exports.listGradesPage = async (req, res) => {
  let mainHeader = "Grade List";

  let grades = await Grade.find({}).lean();
  let name = req.user ? req.user.name : "Not logged in";
  let flashes = [...req.flash("info"), ...req.flash("success")];

  res.render("list", { header: mainHeader, grades, name, flashes });
};

exports.addUpdateGradePage = async (req, res) => {
  // This is an update, render the add-update handlebars file with
  // the grade information.
  if (req.params._id) {
    let grade = await Grade.findById(req.params._id).lean();

    res.render("add-update-grade", { grade });
  }
  // This is a request to add a new grade so show a blank form.
  else {
    res.render("add-update-grade");
  }
};
