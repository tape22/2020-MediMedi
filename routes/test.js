const express = require('express');
const router = express.Router();
const hanspell = require('hanspell');

router.post('/', async (req, res) => {
  var medInfo = req.body;
  medInfo = medInfo.medInfo;
  console.log(medInfo);
  hanspell.spellCheckByDAUM(medInfo, 6000, console.log); //의심이 되면~ 체크해보기!
  
  hanspell.spellCheckByPNU(medInfo, 6000, console.log); // 맞는지 한 번 더 물어볼까?
});

module.exports = router;
