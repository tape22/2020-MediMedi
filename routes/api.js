const express = require('express');
const router = express.Router();
var request = require('request');

let result = new Array();
router.post('/', async (req, res) => {
  const { medInfo } = req.body;
  console.log(medInfo);

  // data 정리
  // var url = 'http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem';
  // var queryParams = '?' + encodeURIComponent('ServiceKey') + '=VD6O56pfN7UxrkSMBnnUS0stE6c3vvZiClYmIUGuO0LS37jUVukST9GU3cva9Ens5cx5eldbQ8qWqp7EbN7Ing%3D%3D'; /* Service Key*/
  // queryParams += '&' + encodeURIComponent('item_name') + '=' + encodeURIComponent(''); /* 제품명 */
  // queryParams += '&' + encodeURIComponent('entp_name') + '=' + encodeURIComponent(''); /* 업체명 */
  // queryParams += '&' + encodeURIComponent('induty') + '=' + encodeURIComponent(''); /* 업종 */
  // queryParams += '&' + encodeURIComponent('prdlst_Stdr_code') + '=' + encodeURIComponent(''); /* 품목일련번호 */
  // queryParams += '&' + encodeURIComponent('spclty_pblc') + '=' + encodeURIComponent(''); /* 전문/일반구분코드_M58 */
  // queryParams += '&' + encodeURIComponent('prduct_prmisn_no') + '=' + encodeURIComponent(''); /* 품목허가번호 */
  // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
  // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('3'); /* 한 페이지 결과수 */

  try {
    result.push(medInfo);
    console.log(result);
    res.send(result);
    // request(
    //   {
    //     url: url + queryParams,
    //     method: 'GET',
    //   },
    //   await function (error, response, body) {
    //     //console.log('Status', response.statusCode);
    //     //console.log('Headers', JSON.stringify(response.headers));
    //     //console.log('Reponse received', body);
    //     result.push(body);
    //     console.log(result);
    //     res.send(result);
    //   }
    // );
  } catch (err) {
    res.status(500).send('error');
    console.log(err);
    return;
  }
});

router.get('/', async (req, res) => {
  try {
    res.send(result);
  } catch (err) {
    console.log('err');
  }
});
module.exports = router;
