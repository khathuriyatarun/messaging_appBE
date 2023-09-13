const userModel = require("../models/user.model")

const getUserDetails = async (userEmail) => {
    console.log("in get usersdetaisl")
    try {
        const user = await userModel.findOne({ email: userEmail })
        console.log(user, "sdsd")
        if (user) return user
        else {
            const user = await userModel.create({ email: userEmail })
            if (user) return user
        }

    }
    catch (err) {
        return res.status(500).json({ error: "Internal user reference" });
    }
}

module.exports =  getUserDetails 

