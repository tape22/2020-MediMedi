var ps = require('python-shell');
var { sc, au, rm } = require('../modules/utils');

module.exports = async (req, res, next) => {
  let { medInfo } = req.body;
  console.log('medInfo:', medInfo);

  medInfo = medInfo.replace(/\n/g, ''); // 개행문자 제거 
  medInfo = medInfo.replace(/\t/g, '');
	var regExp = /[\{\}\[\]\/?.•·,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

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
    ps.PythonShell.run('/home/ubuntu/2020-MediMedi/routes/kkMedi.py', options, function (err, message) {
      if (err) {
        throw err;
      }
      if (message == '') {
        console.log(' 결과값이 없음.');

	      res.status(sc.BAD_REQUEST).send(au.successFalse(rm.NULL_VALUE));

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
