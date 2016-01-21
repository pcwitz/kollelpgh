exports.download = function (req, res) {

  var PDFDocument = require('pdfkit'),             
  fs = require('fs');

  doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('public/assets/pdf/zmanim.pdf'));
  doc.moveTo(300, 75)
     .lineTo(373, 301)
     .lineTo(181, 161)
     .lineTo(419, 161)
     .lineTo(227, 301)
     .fill('red', 'even-odd');  

  var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in...';  

  doc.y = 320;
  doc.fillColor('black')
  doc.text(loremIpsum, {
     paragraphGap: 10,
     indent: 20,
     align: 'justify',
     columns: 2
  });
// doc.moveDown()
// doc.text 'This text is right aligned. ' + lorem, 
//   width: 410
//   align: 'right'

// doc.moveDown()
// doc.text 'This text is justified. ' + lorem, 
//   width: 410
//   align: 'justify'
  doc.end();
  // res.download('public/assets/pdf/zmanim.pdf');
};