const express = require('express');
const router = express.Router();
var ps = require('python-shell');
var request = require('request');
var url = 'http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=VD6O56pfN7UxrkSMBnnUS0stE6c3vvZiClYmIUGuO0LS37jUVukST9GU3cva9Ens5cx5eldbQ8qWqp7EbN7Ing%3D%3D';

// API에 검색하기
router.post('/', async (req, res) => {
  let { medInfo } = req.body;

  medInfo = medInfo.replace(/\n/g, ''); // 개행문자 제거
  var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

  if (regExp.test(medInfo)) {
    var t = medInfo.replace(regExp, '');
    medInfo = t;
  }
  medInfo = medInfo.replace(/ /gi, '');

  let options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: medInfo,
  };

  try {
    // ps.PythonShell.run('/Users/jungmin/Desktop/졸업 프로젝트/medi/-2020-MediMedi/routes/kkMedi.py', options, function (err, results) {
    //   if (err) throw err;
    //   // results is an array consisting of messages collected during execution
    //   console.log('results: %j', results);
    // });
    let shell = await new ps.PythonShell('/Users/jungmin/Desktop/졸업 프로젝트/medi/-2020-MediMedi/routes/kkMedi.py', options, { mode: 'json' });
    shell.on(
      'message',
      await function (message) {
        // handle message (a line of text from stdout)
        console.log('messagetest:', message);
      }
    );

    queryParams += '&' + encodeURIComponent('item_name') + '=' + encodeURIComponent(''); /* 제품명 */
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
