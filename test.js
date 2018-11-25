import { T, now } from "./build/modules/timeline-monad.js";

const consoleTL = ((console) => T(
    (self) => self.sync((a) => {
        console.log(a);
        return a;
    })
))(console);
const log = (a) => (consoleTL[now] = a);

const mjAPI = require("mathjax-node");
mjAPI.config({
    MathJax: {
        messageStyle: "none",
        tex2jax: {
            inlineMath: [["\\(", "\\)"]],
            displayMath: [["\\[", "\\]"]],
            ignoreClass: "nostem|nolatexmath"
        },
        asciimath2jax: {
            delimiters: [["\\$", "\\$"]],
            ignoreClass: "nostem|noasciimath"
        },
        TeX: { equationNumbers: { autoNumber: "none" } }
    }
});
mjAPI.start();

mjAPI.typeset({
    math: "\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.",
    format: "TeX", // or "inline-TeX", "MathML"
    html: true,      // or svg:true, or html:true
}, (data) =>
        (data.errors)
            ? consoleTL[now] = (data.errors)
            : consoleTL[now] = (data.html)
);
