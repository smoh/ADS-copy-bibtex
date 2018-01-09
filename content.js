// content.js

function createButton() {
    return $('<button/>', {
        text: 'Copy BibTeX to clipboard',
        id: 'btn-bibtex-copy',
    });
}

function alertCopied() {
  return $('<div/>', {
    text: 'BibTeX copied to clipboard',
  });
}

// find bibcode
var bibCode = $("td").filter(function() {
  return $(this).text() == "Bibliographic Code:";
}).closest("tr").find("td:eq(2)").text();

if (bibCode) {
  // Get bibtex from url and put into hidden textarea
  var url = "http://adsabs.harvard.edu/cgi-bin/nph-bib_query?bibcode="+bibCode+"&data_type=BIBTEX&db_key=AST&nocookieset=1"
  var bibtext;
  $.ajax({
    url: url,
    async: true,
    cache: false,
    success: function(data) {
      // Chop off first few lines of constant annoyance
      bibtext = data.split("\n").slice(4).join("\n");
    }
  });

  $('body').prepend(createButton());

  var clipboard = new Clipboard('#btn-bibtex-copy', {
    text: function(trigger) {
      return bibtext } });
  // TODO: Add gentle feedback when copied to clipboard
  clipboard.on("success", function (e) {
    // console.log('Copied');
  });

}
