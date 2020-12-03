export const fileReader = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = function() {
      const arrayBuffer = reader.result;
      resolve(arrayBuffer);
    };

    reader.onerror = () => {
      reject(null);
    };
  });
};
