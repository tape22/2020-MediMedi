const express = require('express');
router = express.Router();
const group_path = __dirname + '/../public/javascripts/medi.csv';
const csv = require('csvtojson');
const mediList = [];

router.get('/', async (req, res) => {
  // TODO 그룹 구성원 전체 보기
  try {
    const result = await csv().fromFile(group_path);
    if (!result) {
      console.log('no file');
    }
    //console.log(result);
    mediList.push(result);
    res.send(mediList);
  } catch (err) {
    console.log('err');
  }
});
//console.log(mediList);
router.post('/', async (req, res) => {
  const { medName } = req.body;
  console.log(medName);
  //console.log(mediList);

  const idx = mediList.findIndex((x) => x.value === 'medName');
  console.log(idx);
  console.log(mediList[idx]);
});

module.exports = router;
