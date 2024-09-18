import MarkdownIt from 'markdown-it';
// Create a MarkdownIt instance
const md = new MarkdownIt();
// Get elements from the DOM
const markdownInput = document.getElementById('markdown-input');
const markdownPreview = document.getElementById('markdown-preview');
// Function to render markdown in real-time
const renderMarkdown = () => {
    const markdownText = markdownInput.value;
    markdownPreview.innerHTML = md.render(markdownText);
};
// Add event listener to textarea
markdownInput.addEventListener('input', renderMarkdown);
