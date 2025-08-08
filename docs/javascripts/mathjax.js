// MathJax configuration for MkDocs Material theme
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

// Initialize MathJax when DOM is ready
document$.subscribe(() => {
  MathJax.typesetPromise()
});
