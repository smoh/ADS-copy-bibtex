// content.js
// TODO: There is a mix of javascript and jquery -- use one.
// TODO: Add gentle feedback when copied to clipboard

function createButton() {
    return $('<button/>', {
        text: 'Copy BibTeX to clipboard',
        id: 'btn-bibtex-copy',
        click: CopyToClipboard
    });
}

// find bibcode
var bibCode = $("td").filter(function() {
  return $(this).text() == "Bibliographic Code:";
}).closest("tr").find("td:eq(2)").text();

if (bibCode) {

  // Get bibtex from url and put into hidden textarea
  var url = "http://adsabs.harvard.edu/cgi-bin/nph-bib_query?bibcode="+bibCode+"&data_type=BIBTEX&db_key=AST&nocookieset=1"
  var textArea = document.createElement("textarea");
  textArea.setAttribute("id", "bibtex-result");
  textArea.style.display = "none";

  $.ajax({
    url: url,
    async: true,
    cache: false,
    success: function(data) {
      // Chop off first few lines of constant annoyance
      textArea.value = data.split("\n").slice(4).join("\n");
      document.body.appendChild(textArea);
      // Add the button only after ajax query is done.
      $('body').prepend(createButton());
    }
  });

  // Copying should be triggered by direct user input
  // otherwise it does not work.
  // c.f. https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  function CopyToClipboard () {
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      // console.log('Copying text command was ' + msg);
    } catch (err) {
      // console.log('Oops, unable to copy');
    }
    // this is a problem if button clicked more than once.
    // document.getElementById("bibtex-result").remove();

  }
}
