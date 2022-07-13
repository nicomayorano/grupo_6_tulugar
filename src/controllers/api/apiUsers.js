const db = require('../../database/index');
const sequelize = db.sequelize;
const User = db.User;

const userAPIController = {
    'list': (req, res) => {
        User.findAll()
        .then(users => {
            let usersListResponse = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
                res.json(usersListResponse);
            })
    },
    
    'detail': (req, res) => {
        User.findByPk(req.params.id)
            .then(users => {
                let userDetailResponse = {
                    meta: {
                        status: 200,
                        total: users.length,
                        url: '/api/users/:id'
                    },
                    data: users
                }
                res.json(userDetailResponse);
            });
    }
};
    module.exports = userAPIController;