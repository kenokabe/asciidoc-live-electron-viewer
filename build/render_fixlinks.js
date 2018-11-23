const path = require("path");
const fileUrl = (str) => {
    const pathName = path
        .resolve(str)
        .replace(/\\/g, '/');
    const pathName1 = (pathName[0] !== '/')
        ? `/${pathName}`
        : pathName;
    return encodeURI(`file://${pathName1}`)
        .replace(/[?#]/g, encodeURIComponent);
};
const fixLinks = (data) => (html) => html.replace(new RegExp("((?:src|href)=[\'\"])(?!(?:http:|https:|ftp:|#))(.*?)([\'\"])", "gmi"), (subString, p1, p2, p3) => {
    return [
        p1,
        fileUrl(path.join(data.dir_name.dir, p2)),
        p3
    ].join("");
});
export { fixLinks };
