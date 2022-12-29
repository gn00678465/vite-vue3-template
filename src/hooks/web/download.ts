export function useDownloadFile() {
  function downloadBase64File(
    base64Data: string,
    contentType: string,
    fileName: string
  ) {
    if (!base64Data || !contentType || !fileName) return;
    const link = `data:${contentType};base64,${base64Data}`;
    const download = document.createElement('a');
    download.href = link;
    download.download = fileName;
    download.click();
  }

  return {
    downloadBase64File
  };
}
