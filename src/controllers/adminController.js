const adminController = {
  index: (req, res) => {
    res.render('admin/dashboard.ejs');
  },
};

module.exports = adminController;
