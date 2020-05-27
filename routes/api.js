const express = require('express');
const router = express.Router();
var ps = require('python-shell');
var request = require('request');

router.post('/', async (req, res) => {
  let { medInfo } = req.body;

  medInfo = medInfo.replace(/\n/g, ''); // 개행문자 제거
  var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

  if (regExp.test(medInfo)) {
    var t = medInfo.replace(regExp, '');
    medInfo = t;
  }
  medInfo = medInfo.replace(/ /gi, '');

  var options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: medInfo,
  };

  try {
    ps.PythonShell.run('/Users/jungmin/Desktop/졸업 프로젝트/medi/-2020-MediMedi/routes/kkMedi.py', options, function (err, results) {
      if (err) throw err;
      medName = results.toString();
      console.log('result:', results);
      console.log('medName:', medName);
      return medName;
    });

    console.log('바깥:', medName);
    /* API 호출 코드 */

    var url = 'http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=VD6O56pfN7UxrkSMBnnUS0stE6c3vvZiClYmIUGuO0LS37jUVukST9GU3cva9Ens5cx5eldbQ8qWqp7EbN7Ing%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('item_name') + '=' + encodeURIComponent(medName); /* 제품명 */
    queryParams += '&' + encodeURIComponent('entp_name') + '=' + encodeURIComponent(''); /* 업체명 */
    queryParams += '&' + encodeURIComponent('induty') + '=' + encodeURIComponent(''); /* 업종 */
    queryParams += '&' + encodeURIComponent('prdlst_Stdr_code') + '=' + encodeURIComponent(''); /* 품목일련번호 */
    queryParams += '&' + encodeURIComponent('spclty_pblc') + '=' + encodeURIComponent(''); /* 전문/일반구분코드_M58 */
    queryParams += '&' + encodeURIComponent('prduct_prmisn_no') + '=' + encodeURIComponent(''); /* 품목허가번호 */
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
  } catch (err) {
    res.status(500).send('error');
    console.log(err);
    return;
  }
});

/*router.get('/', async (req, res) => {
  try {
    res.send(result);
  } catch (err) {
    console.log('err');
  }
});*/

module.exports = router;
