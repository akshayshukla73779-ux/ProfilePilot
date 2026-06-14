import PDFParser from "pdf2json";

export async function extractResumeText(buffer: Buffer) {

  return new Promise((resolve, reject) => {

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {

      let text = "";

      pdfData.Pages.forEach((page: any) => {

        page.Texts.forEach((textItem: any) => {

          textItem.R.forEach((run: any) => {

            text += decodeURIComponent(run.T) + " ";

          });

        });

        text += "\n";

      });

      resolve(text);

    });

    pdfParser.parseBuffer(buffer);

  });

}