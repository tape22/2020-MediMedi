// var express = require('express');
// var router = express.Router();

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

// var mecab = require('mecab-ya');
// //var mecab = new Mecab();

// router.get('/', function (req, res) {
//   var text = '아버지가방에들어가신다';

//   mecab.pos(text, function (err, result) {
//     console.log(result);
//   });
// });
// module.exports = router;
