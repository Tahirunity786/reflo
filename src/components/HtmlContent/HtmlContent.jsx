'use client';

import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

const HtmlContent = ({ content, charLimit }) => {
  /**
   * Process the provided HTML content.
   * If a numeric character limit is provided, extract the <p> tags,
   * concatenate them, and truncate to the limit.
   * When charLimit is "full" (default), return the full sanitized HTML.
   *
   * @param {string} htmlContent - The raw HTML content from the DB.
   * @param {number|string} limit - The character limit or 'full'.
   * @returns {string} - Sanitized HTML content.
   */
  const processContent = (htmlContent, limit) => {
    if (!htmlContent) return '';

    // If 'full' is desired, skip any extraction/truncation.
    if (limit === 'full') {
      return DOMPurify.sanitize(htmlContent);
    }

    // Otherwise, extract paragraphs.
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(htmlContent, 'text/html');
    const paragraphs = parsedDoc.querySelectorAll('p');

    let fullText = '';
    if (paragraphs.length > 0) {
      fullText = Array.from(paragraphs)
        .map(p => `<div>${p.innerHTML.trim()}</div>`)
        .join('');
    } else {
      fullText = htmlContent;
    }

    // Apply truncation if necessary.
    if (typeof limit === 'number' && fullText.length > limit) {
      const truncatedText = fullText.slice(0, limit);
      const lastSpaceIndex = truncatedText.lastIndexOf(' ');
      fullText =
        truncatedText.slice(0, lastSpaceIndex > 0 ? lastSpaceIndex : limit) +
        '...';
    }

    return DOMPurify.sanitize(fullText);
  };

  const processedContent = processContent(content, charLimit);

  return (
    <div
      className="post-content"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

HtmlContent.propTypes = {
  content: PropTypes.string.isRequired,
  charLimit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

HtmlContent.defaultProps = {
  charLimit: 'full',
};

export default HtmlContent;
