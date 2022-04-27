export const fileReader = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      resolve(arrayBuffer);
    };

    reader.onerror = () => {
      reject(null);
    };
  });
