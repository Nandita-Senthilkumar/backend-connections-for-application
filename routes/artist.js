const artist = require("../models/artist");

const router = require("express").Router();

// router.get("/allalbum", async (req, res) => {
//     return res.json("getting all artists")});

    router.post("/saveartist", async (req, res) => {
        const newArtist = artist({
          name: req.body.name,
          imageURL: req.body.imageURL,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
        });
        try {
          const savedArtist = await newArtist.save();
          res.status(200).send({ artist: savedArtist });
        } catch (error) {
          res.status(400).send({ success: false, msg: error });
        }
      });
      

router.get("/getone/:id", async (req, res) => {
        // return res.json(req.params.id)})
  const filter = { _id: req.params.id };

  const data = await artist.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "No Data Found" });
  }
        // if(data)
        // {
        //     return res.json(data);
        // }
        // else{
        //     return res.json("not available");
        // }
});

router.get("/getAll", async (req, res) => {
  const options = {
    sort: { createdAt: 1 },
  };

  const data = await artist.find(options);
  console.log(data); // Log the data variable to the console

  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "No Data Found" });
  }

  });
  
module.exports=router