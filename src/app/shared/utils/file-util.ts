/**
 * File Util
 */
const MIME_XLXS = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const MIME_TXT = 'data:attachment/text';

const downloadFile = (response, fileName: string, type: string) => {
  const blob = new Blob([response], { type: type });
  const blobURL = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.download = fileName;
  anchor.href = blobURL;
  window.document.body.appendChild(anchor);
  anchor.click();
  window.document.body.removeChild(anchor);
  URL.revokeObjectURL(blobURL);
};

/* Exports functions */
export const downloadXlsxFile = (response, fileName?: string) => {
  if (!fileName) fileName = 'excel-file';
  fileName = `${fileName}.xlsx`;
  downloadFile(response, fileName, MIME_XLXS);
};

export const downloadTxtFile = (response, fileName?: string) => {
  if (!fileName) fileName = 'file-txt';
  fileName = `${fileName}.txt`;
  downloadFile(response, fileName, MIME_TXT);
};
