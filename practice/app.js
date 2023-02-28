const express = require("express")
const PdfPrinter = require("pdfmake")
const fs = require("fs")
const app = express()

app.get("/", (req, res) => {

    const fonts = {
        Roboto: {
          normal: `${__dirname}/fonts/Roboto-Regular.ttf`,
          bold: `${__dirname}/fonts/Roboto-Bold.ttf`,
          italics: `${__dirname}/fonts/Roboto-Italic.ttf`,
          bolditalics: `${__dirname}/fonts/Roboto-BoldItalic.ttf`
        }
      };
    const printer = new PdfPrinter(fonts)

    const docDef = {
        content: [
            "This is the first paragraph",
            "and this is the second paragraph"
        ]
    }

    const pdfDoc = printer.createPdfKitDocument(docDef)
    res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline"
    })
    pdfDoc.pipe(fs.createWriteStream(`${__dirname}/pdfs/sample.pdf`))
    pdfDoc.pipe(res)
    pdfDoc.end()
})

app.listen(3000, () => {
    console.log("Listening on port 3000...")
})