// const album = require("../models/album");

const router = require("express").Router();

router.get("/allalbum", async (req, res) => {
    return res.json("getting all albums")
//   const options = {
//     // sort returned documents in ascending order
//     sort: { createdAt: 1 },
//     // Include only the following
//     // projection : {}
//   };
//   const cursor = await album.find(options);
//   if (cursor) {
//     res.status(200).send({ success: true, data: cursor });
//   } else {
//     res.status(200).send({ success: true, msg: "No Data Found" });
//   }
});
module.exports=router