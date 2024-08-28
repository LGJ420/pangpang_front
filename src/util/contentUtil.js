import DOMPurify from "dompurify";

// URL format function
export const formatContent = (content) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const formattedContent = content.replace(urlPattern, (url) => 
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline hover:text-blue-700">${url}</a>`
    );
    return DOMPurify.sanitize(formattedContent, {
      ALLOWED_TAGS: ['a'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
    });
  };