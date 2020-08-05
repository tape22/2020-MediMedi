const express = require('express');
const router = express.Router();
var ps = require('../modules/python');
var request = require('request');
var cheerio = require('cheerio');
var { sc, au, rm } = require('../modules/utils');
var url = 'http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem';
var iv = require('iconv-lite');
var result = [];

var namelist = ['NAME', 'ENTP', 'ETC', 'STORAGE', 'VALID', 'EE', 'UD', 'NB'];
var aJson = new Object();
// API에 검색하기
router.post('/', ps, async (req, res) => {
  var medInfo = req.body;
  result.length = 0;
  medInfo = medInfo.toString();

  if (medInfo == '') {
    console.log('값 못읽어옴.');
    res.status(sc.BAD_REQUEST).send(au.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }

  /* 추가적인 알고리즘 */

  /* API에 검색하기-> 나중에 모듈로 빼기  */
  if (medInfo.length != 0) {
    var n = encodeURIComponent(medInfo);
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=VD6O56pfN7UxrkSMBnnUS0stE6c3vvZiClYmIUGuO0LS37jUVukST9GU3cva9Ens5cx5eldbQ8qWqp7EbN7Ing%3D%3D';
    queryParams += '&' + encodeURIComponent('item_name') + '=' + n; /* 제품명 */
    var queryInput = ['entp_name', 'induty', 'prdlst_Stdr_code', 'spclty_pblc', 'prduct_prmisn_no'];
    for (i = 0; i < 5; i++) {
      queryParams += '&' + encodeURIComponent(queryInput[i]) + '=' + encodeURIComponent('');
      /* 업체명 , 업종, 품목일련번호, 전문, 일반구분코드, 품목허가번호, 페이지번호, 한 페이지 결과 수 */
    }
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('5'); /* 한 페이지 결과수 */
  }

  try {
    request.get({ uri: url + queryParams }, function (error, response, body) {
      if (error) {
        res.status(sc.BAD_REQUEST).send(au.successFalse);
        console.log('err');
      }
      var content = Buffer.from(body);
      var xmlContent = iv.decode(content, 'utf-8').toString();
      var $ = cheerio.load(xmlContent, { xmlMode: true });

      /*totalCount가 0이면 에러처리하기  */
      if ($('totalCount') == 0) {
        res.status(sc.BAD_REQUEST).send(au.successFalse(rm.API_NULL));
      }
      $('item').each(function () {
        NAME = $(this).children('ITEM_NAME').text();
        ENTP = $(this).children('ENTP_NAME').text();
        ETC = $(this).children('ETC_OTC_CODE').text();
        STORAGE = $(this).children('STORAGE_METHOD').text();
        VALID = $(this).children('VALID_TERM').text();
        EE = $(this).children('EE_DOC_DATA').text();
        UD = $(this).children('UD_DOC_DATA').text();
        NB = $(this).children('NB_DOC_DATA').text();

        result.push(NAME, ENTP, ETC, STORAGE, VALID, EE, UD, NB);

        for (var i in result) {
          result[i] = result[i].replace(/\r/g, '');
          result[i] = result[i].replace(/\n/g, '');
          aJson[namelist[i]] = result[i];
        }
        // aJson.name = NAME;
        // aJson.entp = ENTP;
        // aJson.etc = ETC;
        // aJson.storage = STORAGE;
        // aJson.valid = VALID;

        // EE = EE.replace(/\n/g, ''); // 개행문자 제거
        // EE = EE.replace(/\r/g, '');
        // UD = UD.replace(/\n/g, ''); // 개행문자 제거
        // UD = UD.replace(/\r/g, '');
        // NB = NB.replace(/\n/g, ''); // 개행문자 제거
        // NB = NB.replace(/\r/g, '');
        // aJson.ee = EE;
        // aJson.ud = UD;
        // aJson.nb = NB;
      });
      //var sJson = JSON.stringify(aJson);
      console.log(aJson);

      res.status(sc.OK).send(au.successTrue(aJson));

      return;
    });
  } catch (err) {
    res.status(500).send('error');
    console.log(err);
    return;
  }
});

// API 검색 결과 가져오기
router.get('/', async (req, res) => {
  try {
    res.send(result);
    result.length = 0;
    console.log('통신성공');
  } catch (err) {
    console.log('err');
  }
});

module.exports = router;
