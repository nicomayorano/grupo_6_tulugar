const adminController = {
  index: (req, res) => {
    res.render('admin/dashboard.ejs'); // En un futuro /admin/dashboard.ejs?
  },
  editForm: (req, res) => {
    res.render('admin/edit-form.ejs');
  },
  edit: (req, res) => {
    res.render('index.ejs'); // TO DO
  },
  newForm: (req, res) => {
    res.render('admin/new.ejs');
  },
  new: (req, res) => {
    res.render('index.ejs'); // TO DO
  },
};

module.exports = adminController;
