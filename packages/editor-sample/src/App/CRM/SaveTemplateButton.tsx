import { Save } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDocument } from '../../documents/editor/EditorContext';
type Props = {};

function SaveTemplateButton({}: Props) {
  const document = useDocument();
  const html = renderToStaticMarkup(document, { rootBlockId: 'root' });
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(window.email.generator.updateTemplate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': window.email.generator.csrf || '',
        },

        body: JSON.stringify({
          template_id: window.email.generator.templateID || '',
          template_html: html,
          template_json: document,
        }),
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success('Szablon został zapisany');
      } else {
        toast.error('Wystąpił błąd podczas zapisywania szablonu');
      }
    } catch (error) {
      console.error(error);
      toast.error('Wystąpił błąd podczas zapisywania szablonu');
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
