export function srcToFile(src, fileName, mimeType, arr) {
  return fetch(src)
    .then(res => {
      return res.arrayBuffer();
    })
    .then(buf => {
      arr.push(new File([buf], fileName, { type: mimeType }));
      return arr;
    });
}
