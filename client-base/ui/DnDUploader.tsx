import { useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Text, FlatButton } from 'src/client-base/ui';
import { twm } from 'src/client-base/utils/twm';
import { ErrorText } from 'src/client-base/ui/ErrorText';
import FileIcon from 'src/assets/images/svg/file-icon.svg?react';

type Props = {
  className?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
  disabled?: boolean;
  value?: File | undefined;
};

export const DnDUploader = ({ className, onUpload, onRemove, disabled = false, value }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [internalFiles, setInternalFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (disabled) return;
      if (fileRejections.length > 0) {
        const errorMessage = fileRejections[0].errors.map((error) => error.message).join('; ');
        setError(errorMessage);
        return;
      }
      const file = acceptedFiles[0];
      setInternalFiles([file]);
      onUpload(file);
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    multiple: false,
    disabled: disabled,
    accept: {
      'application/pdf': [],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    maxFiles: 1,
  });

  useEffect(() => {
    if (value === undefined) {
      setInternalFiles([]);
    }
  }, [value]);

  return (
    <div
      {...getRootProps()}
      className={twm(
        'flex flex-col items-center border border-transparent justify-center w-full h-auto min-h-[225px] bg-form-input-primary/50 rounded-lg-2 relative',
        className,
        isDragActive && 'border-brand-primary/50',
        disabled && 'opacity-80',
      )}
    >
      <input {...getInputProps()} id="file-upload" disabled={disabled} type="file" style={{ display: 'none' }} />
      <div className="flex flex-col items-center">
        <Text className="font-medium mb-3.5" size="xl">
          {disabled
            ? "You're using editor for article content. Uploader disabled"
            : isDragActive
              ? 'Put your file here'
              : 'Select a file or drag & drop it here'}
        </Text>
        {!disabled && <Text className="font-medium text-general-light/60 mb-4.5">PDF format only, up to 50MB</Text>}
        {internalFiles?.length > 0 || value ? (
          <div className="flex flex-col items-center">
            <FileIcon className="mb-2 h-8 2-8" color="hsla(var(--brand-primary), 0.6)" />
            <Text size="xxs" className="text-general-light/70">
              {internalFiles[0]?.name || value?.name}
            </Text>
          </div>
        ) : null}
        <div className="flex flex-row gap-3">
          <FlatButton
            className="form-button-bg border border-general-light/10 shadow-btnDrop mt-2"
            onClick={open}
            disabled={disabled}
            title={internalFiles?.length > 0 || value ? 'update file' : 'select file'}
          />
          {internalFiles?.length > 0 || value ? (
            <FlatButton
              className="form-button-bg border border-general-light/10 shadow-btnDrop mt-2"
              onClick={onRemove}
              disabled={disabled}
              title={'remove file'}
            />
          ) : null}
        </div>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
