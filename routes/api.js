const express = require('express');
const router = express.Router();
var ps = require('../modules/python');
var request = require('request');
var json = require('xml-js');
var { sc, au, rm } = require('../modules/utils');
var url = 'http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=VD6O56pfN7UxrkSMBnnUS0stE6c3vvZiClYmIUGuO0LS37jUVukST9GU3cva9Ens5cx5eldbQ8qWqp7EbN7Ing%3D%3D';

// API에 검색하기
router.post('/', ps, async (req, res) => {
  try {
    var medInfo = req.body;
    medInfo = medInfo.toString();

    if (medInfo == '') {
      console.log('값 못읽어옴.');
      res.status(sc.BAD_REQUEST).send(au.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    }

    /* 추가적인 알고리즘 */

    /* API에 검색하기-> 나중에 모듈로 빼기  */
    if (medInfo.length != 0) {
      queryParams += '&' + encodeURIComponent('item_name') + '=' + encodeURIComponent(medInfo); /* 제품명 */
      var queryInput = ['entp_name', 'induty', 'prdlst_Stdr_code', 'spclty_pblc', 'prduct_prmisn_no'];
      for (i = 0; i < 5; i++) {
        queryParams += '&' + encodeURIComponent(queryInput[i]) + '=' + encodeURIComponent('');
        /* 업체명 , 업종, 품목일련번호, 전문, 일반구분코드, 품목허가번호, 페이지번호, 한 페이지 결과 수 */
      }
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('5'); /* 한 페이지 결과수 */
      request(
        {
          url: url + queryParams,
          method: 'GET',
        },
        await function (error, response, body) {
          /*totalCount가 0이면 에러처리하기  */
          if (error) {
            res.status(sc.BAD_REQUEST).send(au.successFalse);
            console.log('err');
          }
          var result = json.xml2json(body, { compact: true });
          res.status(sc.OK).send(au.successTrue(result));
          var jsp = JSON.parse(result).response.body;
          var item = jsp.items.item;

          if (jsp.totalCount == 0) {
            res.status(sc.API_NULL).send(au.successFalse(rm.API_NULL));
          }

          // 이름. 회사명, 일반/전문의약품 구분, 용기와 유통기한
          console.log('이름,회사명,일반/전문의약품 구분', item[0].ITEM_NAME._text, item[0].ENTP_NAME._text, item[0].ETC_OTC_CODE._text, '\n');
          console.log('저장방법,유효기간', item[1].STORAGE_METHOD._text, item[1].VALID_TERM._text, '\n');
          // 효능효과 파싱해오기
          console.log('효능효과:', item[1].EE_DOC_DATA.DOC.SECTION.ARTICLE.PARAGRAPH._cdata);
          var NB_DOC_DATA = item[1].NB_DOC_DATA.DOC.SECTION.ARTICLE;
          for (i = 0; i < NB_DOC_DATA.length; i++) {
            console.log(NB_DOC_DATA[i]._attributes, '\n');
            console.log(NB_DOC_DATA[i].PARAGRAPH,'\n');
          }
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
