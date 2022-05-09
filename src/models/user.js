const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const User = {
      
      filepath: path.resolve(process.cwd(), 'src', 'data', 'users.json'),
      
      getData:function(){
        return JSON.parse(fs.readFileSync(this.filepath));
      },
      verifyUser(user,pass){
            const account = this.getUser(user);            
            return account && bcrypt.compareSync(pass, account.password);
      },
      getUser:function(user){
         return this.getData().find(x => x.email == user);
      },
      getIdByUser: function(user){        
        return this.getUser(user).id;
      }




}


module.exports = User;