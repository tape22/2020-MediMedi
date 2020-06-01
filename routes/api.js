const express = require('express');
const router = express.Router();
var ps = require('../modules/python');
var request = require('request');
var { sc, au, rm } = require('../modules/utils');
var url = 'http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=VD6O56pfN7UxrkSMBnnUS0stE6c3vvZiClYmIUGuO0LS37jUVukST9GU3cva9Ens5cx5eldbQ8qWqp7EbN7Ing%3D%3D';

// API에 검색하기
router.post('/', ps, async (req, res) => {
  try {
    var medInfo = req.body;
    medInfo = medInfo.toString();
    // 이게 반환이 안되는 게 아니라, 밑 코드가 먼저 실행되고 python이 실행되는 거다
    console.log('medInfo:', medInfo);
    if (medInfo == '') {
      console.log('못읽어옴.');
      res.status(sc.BAD_REQUEST).send(au.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    }

    if (medInfo.length != 0) {
      queryParams += '&' + encodeURIComponent('item_name') + '=' + encodeURIComponent(medInfo); /* 제품명 */
      var queryInput = ['entp_name', 'induty', 'prdlst_Stdr_code', 'spclty_pblc', 'prduct_prmisn_no'];
      for (i = 0; i < 5; i++) {
        queryParams += '&' + encodeURIComponent(queryInput[i]) + '=' + encodeURIComponent('');
        /* 업체명 , 업종, 품목일련번호, 전문, 일반구분코드, 품목허가번호, 페이지번호, 한 페이지 결과 수 */
      }
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('3'); /* 한 페이지 결과수 */
      request(
        {
          url: url + queryParams,
          method: 'GET',
        },
        await function (error, response, body) {
          //console.log('Status', response.statusCode);
          //console.log('Headers', JSON.stringify(response.headers));
          //console.log('Reponse received', body);
          res.send(body);
        }
      );
    }
  } catch (err) {
    res.status(500).send('error');
    console.log(err);
    return;
  }
});

// API 검색 결과 가져오기
/*router.get('/', async (req, res) => {
  try {
    res.send(result);
  } catch (err) {
    console.log('err');
  }
});*/

module.exports = router;
