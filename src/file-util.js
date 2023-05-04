import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";

async function loadTemplate(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

function createDocWithTables(templateArrayBuffer, objectsList) {
  const zip = new PizZip(templateArrayBuffer);
  const doc = new Docxtemplater().loadZip(zip);

  // Access the XML content of the Word document
  const content = doc.getZip().file("word/document.xml").asText();

  // Use a regular expression to find the first table with the placeholders
  const tableRegex = /<w:tbl>[\s\S]*?<\/w:tbl>/;
  const tableXML = content.match(tableRegex)[0];

  const tableSeparator = "<w:p><w:r><w:br/></w:r></w:p>";
  const tablesXML = objectsList
    .map((_, index) => (index !== 0 ? tableSeparator : "") + tableXML)
    .join("");

  const contentWithTables = content.replace(tableRegex, tablesXML);
  doc.getZip().remove("word/document.xml");
  doc.getZip().file("word/document.xml", contentWithTables);

  return doc;
}

function replacePlaceholders(doc, objectsList) {
  const content = doc.getZip().file("word/document.xml").asText();
  const tableRegex = /<w:tbl>[\s\S]*?<\/w:tbl>/g;

  let updatedContent = content;
  let match;
  let i = 0;

  while ((match = tableRegex.exec(content)) !== null) {
    const currentTable = match[0];
    const obj = objectsList[i];
    let updatedTable = currentTable;

    for (const [key, value] of Object.entries(obj)) {
      const placeholder = `{${key}}`;
      const regex = new RegExp(placeholder, "g");
      updatedTable = updatedTable.replace(regex, value);
    }
    updatedContent = updatedContent.replace(currentTable, updatedTable);
    i++;
  }

  doc.getZip().remove("word/document.xml");
  doc.getZip().file("word/document.xml", updatedContent);
}

export const createAndDownloadDocx = async (objectsList, templateName) => {
  try {
    const templateArrayBuffer = await loadTemplate(
      `assets/doc-templates/${templateName}.docx`
    );
    const doc = createDocWithTables(templateArrayBuffer, objectsList);
    replacePlaceholders(doc, objectsList);
    const output = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });
    saveAs(output, "output.docx");
  } catch (error) {
    console.error("Error generating document:", error);
  }
};
