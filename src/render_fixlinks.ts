

const path = require("path");

const fileUrl = (str: string) => {
  const pathName = path
    .resolve(str)
    .replace(/\\/g, '/');
  const pathName1 =
    (pathName[0] !== '/')
      ? `/${pathName}`
      : pathName;
  return encodeURI(`file://${pathName1}`)
    .replace(/[?#]/g, encodeURIComponent);
};
interface dir_name {
  dir: string;
  name: string;
}
interface data {
  text: string;
  dir_name: dir_name;
  line: number;
}
const fixLinks = (data: data) => (html: string) => html.replace(
  new RegExp("((?:src|href)=[\'\"])(?!(?:http:|https:|ftp:|#))(.*?)([\'\"])", "gmi"),
  (subString, p1, p2, p3) => {
    return [
      p1,
      fileUrl(path.join(
        data.dir_name.dir,
        p2
      )),
      p3
    ].join("");
  }
);

export { fixLinks }



