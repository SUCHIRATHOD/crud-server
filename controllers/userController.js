const userService = require("../service/service");

class UserController {
    async createUser(req, res) {
        try {
            const { FirstName, LastName, email, Phone, Address, Gender } = req.body;
            const savedUser = await userService.createUser(FirstName, LastName, email, Phone, Address, Gender);
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllUsers(req, res) {
        try {
           const users = await userService.getAllUsers();
           res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getUserById(req, res) {
        const userId = req.params.id;
        try{
          const user = await  userService.getUserById(userId);
          if(!user)
            return res.status(404).json({error:"User Not Found"});
        res.json(user);
        }catch (error){
            res.status(500).json({error:error.message});

        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const updatedData = req.body;
        try{
          const updatedUser = await  userService.updateUser(userId, updatedData);
          if(!updatedUser)
            return res.status(404).json({error:"User Not Found"});
        res.json(updatedUser);
        }catch (error){
            res.status(500).json({error:error.message});

        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        try{
          const deletedUser = await  userService.deleteUser(userId);
          if(!deletedUser)
            return res.status(404).json({error:"User Not Found"});
        res.json({message : "User Deleted Successfully", user:deletedUser });
        }catch (error){
            res.status(500).json({error:error.message});

        }
    }
};

module.exports = new UserController();