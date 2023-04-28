const { ObjectId } = require('mongodb');
const { Operation } = require("../modals");

async function getUserInto (){
    try {
        const id = "643931f2ac660fd824eed10a";
        const query = {_id: new ObjectId(id)}

		const dbUtil = new Operation("users");

        const user = await dbUtil.readOne(query);

        return user

      } catch (err) {
       console.log(err)
      }
}

module.exports = {
    getUserInto
}