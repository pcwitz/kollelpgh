exports.download = function (req, res) {

  var PDFDocument = require('pdfkit'),             
  fs = require('fs'),
  randomColor = require('randomcolor');
  var color = randomColor({luminosity: 'dark'});

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
  doc.text(shabbos.parsha.toUpperCase(), 100, 175) //params: (text, x, y)

  doc.fontSize(18);
  doc.font('Helvetica')
    .text(shabbos.yomDate, 400, 178);

// column one
  doc.y = 250;
  doc.x = 200;
//shabbos time headers
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
    .moveDown(1.85)

//daily time headers
    .text('Shacharis Sunday')
    .moveDown(0.1)
    .text('Shacharis Mon.& Thurs.')
    .moveDown(0.1)
    .text('Shacharis Tue. Wed.& Fri.')
    .moveDown(0.1)
    .text('Mincha This Week')
    .moveDown(0.1)
    .text('Maariv this Week');

// column two
  doc.y = 250;
  doc.x = 425;
//shabbos times
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
    .moveDown(1.85)
//daily times
    .text('7:30 AM' , {
    align: 'right'
    })
    .moveDown(0.1)
    .text('7:50 AM', {
      align: 'right'
    })
    .moveDown(0.1)
    .text('8:00 AM', {
    align: 'right'
    })
    .moveDown(0.1)
    .text('3:25 PM', {
      align: 'right'
    })
    .moveDown(0.1)
    .text('9:40 PM', {
    align: 'right'
    })

    .rect(100,220,92,345) //rect(x, y, width, height)
    .rect(100,580,92,150)
    .fillAndStroke(color, color);

  doc.fillColor('white')
    .fontSize(16)
    .text('SHABBOS', 106, 230) //params: (text, x, y)
    .text('THIS WEEK', 102, 590)

    .fontSize(14)
    .text('Night', 130, 275)
    .text('Daytime', 120, 375) //75pt increment
    .text('Evening', 120, 500)
    .text('Daily', 130, 640);



    // .stroke('red');
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