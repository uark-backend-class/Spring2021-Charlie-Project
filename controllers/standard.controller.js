const Standard = require("../models/standard.model");

exports.addStandard = async (req, res) => {
  console.log(req.body.standardName);
  console.log(req.body.standardNumber);
  console.log(req.body.standardDescription);

  if (req.body.id) {
    await Standard.findByIdAndUpdate(req.body.id, req.body);
    req.flash("info", "standard updated!");
  } else {
    const standard = new Standard(req.body);
    await standard.save();
    req.flash("info", "standard added!");
  }

  res.redirect("/Standards");
};

exports.deleteStandard = async (req, res) => {
  await Standard.findByIdAndDelete(req.params._id);

  res.redirect("/Standards");
};

exports.listStandardsPage = async (req, res) => {
  let mainHeader = "Standards List";

  let standards = await Standard.find({}).lean();
  let name = req.user ? req.user.name : "Not logged in";
  let flashes = [...req.flash("info"), ...req.flash("success")];

  res.render("list", { header: mainHeader, standards, name, flashes });
};

exports.addUpdateStandardPage = async (req, res) => {
  // This is an update, render the add-update handlebars file with
  // the standard information.
  if (req.params._id) {
    let standard = await Standard.findById(req.params._id).lean();

    res.render("add-update-standard", { standard });
  }
  // This is a request to add a new standard so show a blank form.
  else {
    res.render("add-update-standard");
  }
};
