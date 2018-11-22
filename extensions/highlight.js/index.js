const hls = require('highlight.js');
const cheerio = require('cheerio')

function sourceHighlightingProcessor() {
  console.log("extension-source-highlighting");
  this.process((doc, output) => {
    /*
        const $ = cheerio.load(output)
        const elements = $('.highlight').find('code')
        elements.each(function (i, block) {
          const $block = $(block)
          const code = $block.text()
          const language = $block.data('lang')
          const result = hls.highlight(language, code)
          $block.html(result.value)
        })
    */
    console.log("post");
    const elements = output
      .getElementsByClassName("target");

    console.log(elements.length);

    return output;
  })
}

const register = (registry) =>
  registry
    .postprocessor(sourceHighlightingProcessor);

export { register };