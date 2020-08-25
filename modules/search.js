var { sc, au, rm } = require('../modules/utils');
var url = 'http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem';

module.exports = async (req, res, next) => {
  let { medInfo } = req.body;

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
        /* 어떤 게 맞는 것인지 묻기 */
        // result.push(NAME);
        ENTP = $(this).children('ENTP_NAME').text();
        // result.push(ENTP);
        ETC = $(this).children('ETC_OTC_CODE').text();
        // result.push(ETC);
        STORAGE = $(this).children('STORAGE_METHOD').text();
        // result.push(STORAGE);
        VALID = $(this).children('VALID_TERM').text();
        // result.push(VALID);
        EE = $(this).children('EE_DOC_DATA').text();
        UD = $(this).children('UD_DOC_DATA').text();
        NB = $(this).children('NB_DOC_DATA').text();

        result.push(NAME, ENTP, ETC, STORAGE, VALID, EE, UD, NB);

        for (var i in result) {
          result[i] = result[i].replace(/\r/g, '');
          result[i] = result[i].replace(/\n/g, '');
          aJson[namelist[i]] = result[i];
        }
      });

      var sJson = JSON.stringify(aJson);
      //console.log(sJson);
      req.body = sJson;
      //res.status(sc.OK).send(au.successTrue(sJson));
      next();
    });
  } catch (err) {
    res.status(500).send('error');
    console.log(err);
    return;
  }
};
