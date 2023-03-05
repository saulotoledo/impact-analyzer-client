import React, { ReactElement, useEffect, useState } from 'react';
import { Alert, CircularProgress, Grid, Paper, Theme } from '@mui/material';
import { AxiosError } from 'axios';

import Message from '../../interfaces/Message';
import Tag from '../../interfaces/Tag';
import TagsService from '../../services/tags.service';
import TagForm from './TagForm';

interface TagEditProps {
  id?: string;
}

const TagEdit: React.FC<TagEditProps> = ({ id }: TagEditProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>();
  const [errors, setErrors] = useState<Record<string, unknown>>();
  const [tagData, setTagData] = useState<Tag>();
  const [tagsTree, setTagsTree] = useState<Tag[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setMessage(undefined);
    if (id) {
      const errorCallback = (error: Error): void => {
        setIsLoading(false);
        setMessage({
          type: 'error',
          body: error.message,
        });
      };
      const currentTagPromise = TagsService.getTag(id).then(
        setTagData,
        errorCallback
      );
      const allTagsPromise = TagsService.getTags().then(
        setTagsTree,
        errorCallback
      );

      Promise.all([currentTagPromise, allTagsPromise]).then(
        () => setIsLoading(false),
        errorCallback
      );
    }
  }, [id]);

  const onSubmit = async (data: Tag): Promise<void> => {
    setMessage(undefined);
    return TagsService.updateTag(data).then(
      (result): void => {
        setMessage({
          type: 'success',
          body: 'Tag updated successfully!',
        });
        setTagData(result);
      },
      (error: AxiosError & { errors?: Record<string, unknown> }) => {
        if (error.errors) {
          setErrors(error.errors);
        } else {
          setMessage({
            type: 'error',
            body: error.message,
          });
        }
      }
    );
  };

  const getMessageAlert = (): ReactElement => (
    <Alert
      sx={{
        marginTop: (theme: Theme) => theme.spacing(2),
        width: '100%',
      }}
      severity={message?.type}
    >
      {message?.body}
    </Alert>
  );

  const getLoader = (): ReactElement => (
    <Grid container item direction="row" justifyContent="space-between">
      <CircularProgress
        sx={{ margin: (theme: Theme) => theme.spacing(5, 'auto') }}
      />
    </Grid>
  );

  return (
    <Paper
      sx={{
        marginTop: (theme: Theme) => theme.spacing(4),
        marginBottom: (theme: Theme) => theme.spacing(4),
        padding: (theme: Theme) => theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {message && getMessageAlert()}
      {isLoading && getLoader()}
      {tagData && !id && <span>Invalid tag</span>}
      {tagData && id && (
        <TagForm
          tagData={tagData}
          tagsTree={tagsTree}
          initialErrors={errors}
          onSubmit={onSubmit}
          onTouch={() => setMessage(undefined)}
        />
      )}
    </Paper>
  );
};

TagEdit.defaultProps = {
  id: undefined,
};

export default TagEdit;
