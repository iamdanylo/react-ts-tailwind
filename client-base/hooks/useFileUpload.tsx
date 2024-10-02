import { useState, useCallback } from 'react';

type AcceptedFileType = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/svg+xml' | 'application/pdf';

const ACCEPTED_FILE_TYPES: AcceptedFileType[] = ['image/png', 'image/jpeg', 'image/webp'];

const MAX_FILE_SIZE = 10485760; // 10MB

type UseFileUploadProps = {
  onFileChange?: (file: File | null) => void;
  maxFileSize?: number;
  fileTypes?: AcceptedFileType[];
};

export const useFileUpload = ({
  onFileChange,
  maxFileSize = MAX_FILE_SIZE,
  fileTypes = ACCEPTED_FILE_TYPES,
}: UseFileUploadProps) => {
  const [error, setError] = useState<string | null>(null);
  const [imgUri, setImgUri] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const selectedFile = event.target.files?.[0];

      if (!selectedFile) {
        return;
      }

      if (selectedFile.size > maxFileSize) {
        setError('File size exceeds 10MB');
        return;
      }

      if (!fileTypes.includes(selectedFile.type as AcceptedFileType)) {
        setError('Unsupported file type');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUri(reader.result as string);
        setFile(selectedFile); // Save the file for upload
        if (onFileChange) {
          onFileChange(selectedFile);
        }
      };
      reader.readAsDataURL(selectedFile);
    },
    [onFileChange],
  );

  return { imgUri, error, handleFileChange, file };
};
