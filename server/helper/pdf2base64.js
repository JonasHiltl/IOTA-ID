const pdf2base64 = require('pdf-to-base64');

function convertPdfToBase64(pdf){
    pdf2base64(pdf)
    .then(
      (response) => {
          return response;
      }
    )
    .catch(
      (error) => {
        return error;
      }
    )
}

module.exports = { convertPdfToBase64 }