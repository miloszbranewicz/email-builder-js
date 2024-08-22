import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { CircularProgress } from '@mui/material';

import AttachmentsListPropsSchema, {
  AttachmentsListProps,
} from '../../../../documents/blocks/CRM/AttachmentsList/AttachmentsListPropsSchema';

import AttachmentsSearch from './helpers/AttachmentsListSidebar/AttachmentsSearch';
import AttachmentsSearchResult from './helpers/AttachmentsListSidebar/AttachmentsSearchResult';
import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type AttachmentsListSidebarPanelProps = {
  data: AttachmentsListProps;
  setData: (v: AttachmentsListProps) => void;
};

export type Attachment = {
  id: number;
  parent_id: number;
  user_id: number;
  type: number;
  _lft: number;
  _rgt: number;
  name: string;
  description?: string;
  file: string;
  extension?: string;
  mime?: string;
  size: string;
  download: number;
  created_at: string;
  updated_at: string;
  url?: string;
};

export default function AttachmentsListSidebarPanel({ data, setData }: AttachmentsListSidebarPanelProps) {
  const [fileList, setFileList] = useState<Attachment[]>([]);
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  const updateData = (d: unknown) => {
    const res = AttachmentsListPropsSchema.safeParse(d);

    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      console.log('validation error:', res.error);
      setErrors(res.error);
    }
  };

  const setAttachment = (file: { name: string; url: string }) => {
    updateData({ ...data, props: { ...data.props, attachment: file } });
  };

  async function fetchFiles() {
    setErrorInfo(null);
    setFileList([]);
    setLoading(true);
    try {
      const response = await fetch(window?.email?.generator.allFilesURL ?? 'http://127.0.0.1:8000/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        setErrorInfo('Błąd sieci!');
      }

      const data = await response.json();
      setFileList(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const searchHandler = async (value: string) => {
    if (value === '') {
      fetchFiles();
      return;
    }
    if (value.length < 3) return;

    try {
      setLoading(true);
      const response = await fetch(
        window?.email?.generator.searchFileURL ?? 'http://127.0.0.1:8000/api/files/search?query=test',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: value }),
        }
      );

      if (!response.ok) {
        setErrorInfo('Błąd sieci!');
      }

      const data = await response.json();
      setFileList(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    if (errorInfo) {
      toast.error('Wystąpił nieoczekiwany błąd');
    }
  }, [errorInfo]);
  return (
    <BaseSidebarPanel title="Blok załącznika">
      <AttachmentsSearch onChange={searchHandler} />
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
      {!loading && <AttachmentsSearchResult data={fileList} setAttachment={setAttachment} />}

      <MultiStylePropertyPanel
        names={['color', 'backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
