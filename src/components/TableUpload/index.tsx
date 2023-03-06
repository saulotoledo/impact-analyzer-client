/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Alert,
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Grid,
  Theme,
  Typography,
} from '@mui/material';

import TablesService from '../../services/tables.service';

type TableUploadProps = {
  onSuccess?: () => void;
};

const TableUpload: React.FC<TableUploadProps> = ({ onSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>();
  const [messageType, setMessageType] = useState<AlertColor>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploading(true);
    TablesService.uploadTable(acceptedFiles)
      .then(() => {
        setUploading(false);
        if (onSuccess) {
          onSuccess();
        }
        setMessage('File uploaded successfully!');
        setMessageType('success');
      })
      .catch((error) => {
        setUploading(false);
        setMessage(error.message);
        setMessageType('error');
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
    onDrop,
  });

  return (
    <>
      {message && (
        <Grid container spacing={2}>
          <Grid item xs={12} pb={2}>
            <Alert severity={messageType}>{message}</Alert>
          </Grid>
        </Grid>
      )}
      <Box
        {...getRootProps()}
        sx={{
          p: 2,
          mb: 4,
          width: '100%',
          border: (theme: Theme): string =>
            `1px dashed ${theme.palette.grey[400]}`,
          borderRadius: 1,
        }}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <>
            {isDragActive ? (
              <Typography variant="body1">Drop the files here</Typography>
            ) : (
              <Typography variant="body1">
                Drag and drop files here or click to select files
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

TableUpload.defaultProps = {
  onSuccess: undefined,
};

export default TableUpload;
