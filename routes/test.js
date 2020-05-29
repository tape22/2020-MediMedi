//var express = require('express');
//var router = express.Router();

// // const { KMR, KKMA } = require('koalanlp/API');
// // const { initialize } = require('koalanlp/Util');
// // const { Tagger, Parser } = require('koalanlp/proc');

// // async function executor() {
// //   await initialize({ packages: { KMR: '2.0.4', KKMA: '2.0.4' }, verbose: true });

// //   let tagger = new Tagger(KMR);
// //   let tagged = await tagger('안녕하세요. 눈이 오는 설날 아침입니다.');
// //   for (const sent of tagged) {
// //     console.log(sent.toString());
// //   }

// //   let parser = new Parser(KKMA);
// //   let parsed = await parser('안녕하세요. 눈이 오는 설날 아침입니다.');
// //   for (const sent of parsed) {
// //     console.log(sent.toString());
// //     for (const dep of sent.dependencies) {
// //       console.log(dep.toString());
// //     }
// //   }
// // }

// // executor().then(
// //   () => console.log('finished!'),
// //   (error) => console.error('Error Occurred!', error)
// // );

// var Mecab = require('../modules/test');
// var mecab = new Mecab();

// var text = '전문의약품\n\n염증성 안질환 치르\n\n옵타론\n점안액 0.1%\n(플루오로데리\n\n5ml\n타가틴정';

// mecab.parse(text, function (items) {
//   for (var i in items) {
//     var k = items[i];
//     if (k == 'EOS') continue;
//     console.log(k[0] + ':' + k[1]);
//   }
// });

module.exports = router;
