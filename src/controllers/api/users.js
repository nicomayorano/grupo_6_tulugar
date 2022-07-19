const { Users } = require('../../database/index');

const userController = {
  list: (req, res) => {
    Users.findAll()
      .then((users) => {
        const usersListResponse = {
          meta: {
            status: 200,
            total: users.length,
            url: '/api/userApi/',
          },
          data: { users },
        };
        res.json(usersListResponse);
      });
  },
  detail: (req, res) => {
    Users.findByPk(req.params.id)
      .then((users) => {
        const userDetailResponse = {
          meta: {
            status: 200,
            total: users.length,
            url: '/api/userApi/:id',
          },
          data: users,
        };
        res.json(userDetailResponse);
      });
  },
};

module.exports = userController;
