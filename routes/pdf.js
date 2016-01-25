exports.download = function (req, res) {

  var PDFDocument = require('pdfkit'),             
  fs = require('fs');

  var doc = new PDFDocument();
  var writeStream = (fs.createWriteStream('public/assets/pdf/zmanim.pdf'));
  doc.pipe(writeStream);
// the pdfkit unit is points and their are 72 points per inch
  var shabbos = req.body;

  // doc.moveTo(300, 75)
  //    .lineTo(373, 301)
  //    .lineTo(181, 161)
  //    .lineTo(419, 161)
  //    .lineTo(227, 301)
  //    .fill('red', 'even-odd');  
// header
  doc.fillColor('black');
  doc.fontSize(24);
  doc.font('Courier');
  doc.text(shabbos.parsha.toUpperCase(), 100, 200) //params: (text, x, y)
    .moveDown(2.0)

// column one
  doc.font('Helvetica');
  doc.y = 300;
  doc.x = 200;

  doc.fontSize(18);

  doc.text('Candle Lighting')
    .moveDown(0.1)
    .text('Mincha')
    .moveDown(0.1)
    .text('Shkia')
    .moveDown(1.2)
    .text('Shacharis')
    .moveDown(0.1)
    .text('End Time for Shma')
    .moveDown(0.1)
    .text('MA', {
      indent: 20
    })
    .moveDown(0.1)
    .text('Gra', {
      indent: 20
    })
    .moveDown(1.2)
    .text('Daf Yomi')
    .moveDown(0.1)
    .text('Mincha')
    .moveDown(0.1)
    .text('Shkia')
    .moveDown(0.1)
    .text('Maariv')
    .moveDown(0.1)
    .text('72 Minutes')
    .moveDown(1.2)

// column two
  doc.y = 300;
  doc.x = 425;

  doc.text.align = 'right';
  doc.text(shabbos.licht, {
    align: 'right'
  })
    .moveDown(0.1)
    .text(shabbos.leilMincha, {
    align: 'right'
    })
    .moveDown(0.1)
    .text(shabbos.leilShkia, {
    align: 'right'
  })
    .moveDown(1.2)
    .text(shabbos.shacharis, {
    align: 'right'
  })
    .moveDown(1.2)
    
    .text(shabbos.ma, {
    align: 'right'
    })
    .moveDown(0.1)
    .text(shabbos.gra, {
      align: 'right'
    })
    .moveDown(1.2)

    .text(shabbos.daf , {
    align: 'right'
    })
    .moveDown(0.1)
    .text(shabbos.yomMincha, {
      align: 'right'
    })
    .moveDown(0.1)
    .text(shabbos.yomShkia, {
    align: 'right'
    })
    .moveDown(0.1)
    .text(shabbos.maariv, {
      align: 'right'
    })
    .moveDown(0.1)
    .text(shabbos.end, {
    align: 'right'
    })
    .moveDown(1.2)
  // doc.y = 300;
  // doc.fillColor('black')
  // doc.text(shabbos.licht, {
  //    paragraphGap: 10,
  //    indent: 20,
  //    align: 'justify',
  //    columns: 2
  // });

  // doc.y = 320;
  // doc.fillColor('black')
  // doc.text(shabbos.leilMincha, {
  //    paragraphGap: 10,
  //    indent: 20,
  //    align: 'justify',
  //    columns: 2
  // });

  // doc.y = 340;
  // doc.fillColor('black')
  // doc.text(shabbos.leilShkia, {
  //    paragraphGap: 10,
  //    indent: 20,
  //    align: 'justify',
  //    columns: 2
  // });  

  // doc.y = 360;
  // doc.fillColor('black')
  // doc.text(shabbos.shacharis, {
  //    paragraphGap: 10,
  //    indent: 20,
  //    align: 'justify',
  //    columns: 2
  // });

  // doc.y = 380;
  // doc.fillColor('black')
  // doc.text(shabbos.shacharis, {
  //    paragraphGap: 10,
  //    indent: 20,
  //    align: 'justify',
  //    columns: 2
  // });
// doc.moveDown()
// doc.text 'This text is right aligned. ' + lorem, 
//   width: 410
//   align: 'right'

// doc.moveDown()
// doc.text 'This text is justified. ' + lorem, 
//   width: 410
//   align: 'justify'
  doc.end();

  writeStream.on('finish', function() { //this will ensure the window does not open in time-controller.js until pdf is finished
    res.send('done');
  });
  // res.download('public/assets/pdf/zmanim.pdf');
};