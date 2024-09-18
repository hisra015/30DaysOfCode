import MarkdownIt from 'markdown-it';

// Create a MarkdownIt instance
const md = new MarkdownIt();

// Get the elements from the DOM
const markdownInput = document.getElementById('markdown-input') as HTMLTextAreaElement;
const markdownPreview = document.getElementById('markdown-preview') as HTMLDivElement;

// Function to render markdown in real-time
const renderMarkdown = (): void => {
    const markdownText: string = markdownInput.value;
    markdownPreview.innerHTML = md.render(markdownText);
};

// Add event listener to the textarea
markdownInput.addEventListener('input', renderMarkdown);
