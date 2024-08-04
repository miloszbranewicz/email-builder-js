import { Save } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';
import React, { useState } from 'react';
import { useDocument } from '../../documents/editor/EditorContext';
type Props = {};

function SaveTemplateButton({}: Props) {
  const document = useDocument();
  const html = renderToStaticMarkup(document, { rootBlockId: 'root' });
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(window.saveTemplateURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': window.csrfToken || '',
        },
        body: JSON.stringify({
          template_id: window.template_id || '',
          template_html: html,
          template_json: document,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Tooltip title="Zapisz template">
      <IconButton color="primary" onClick={handleClick} disabled={isLoading}>
        {isLoading && <CircularProgress size={24} />}
        {!isLoading && <Save />}
      </IconButton>
    </Tooltip>
  );
}

export default SaveTemplateButton;
