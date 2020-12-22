const uploadUserImage = (req, res) => {
  if (!req.files || req.body.length === 0) {
    return res.status(400).send("عکسی ارسال نشد.");
  }
  let sampleFile = req.files.myFile;
  const randomNumber = Math.random().toString();
  const filepath = "uploads/users/"
    .concat(randomNumber)
    .concat(req.files.myFile.name);
  sampleFile.mv(__dirname + "../../../public/" + filepath, (err) => {
    if (err) return res.status(500).send(err);
    res.send({ path: filepath });
  });
};

module.exports = uploadUserImage;
