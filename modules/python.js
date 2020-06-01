var ps = require('python-shell');
var { sc, au, rm } = require('../modules/utils');

module.exports = async (req, res, next) => {
  let { medInfo } = req.body;

  medInfo = medInfo.replace(/\n/g, ''); // 개행문자 제거
  var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

  if (regExp.test(medInfo)) {
    var t = medInfo.replace(regExp, '');
    medInfo = t;
  }
  medInfo = medInfo.replace(/ /gi, '');
  console.log('미들웨어:', medInfo);

  let options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: medInfo,
  };
  try {
    ps.PythonShell.run('/Users/jungmin/Desktop/졸업 프로젝트/medi/-2020-MediMedi/routes/kkMedi.py', options, function (err, message) {
      if (err) {
        throw err;
      }
      if (message == '') {
        console.log('잘못 읽어옴');
        res.send(sc.BAD_REQUEST);
      } else {
        console.log('message:', message);
        req.body = message;
        next();
      }
    });
  } catch (err) {
    console.log('미들웨어 에러 발생');
    throw err;
  }
};
