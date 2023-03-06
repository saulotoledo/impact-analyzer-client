import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
  lighten,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@mui/material';

import Message from '../../interfaces/Message';
import Tag from '../../interfaces/Tag';
import TagsService from '../../services/tags.service';
import TagsTableEntry from './TagsTableEntry';

const TagsTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Tag[]>([]);
  const [message, setMessage] = useState<Message>();

  const loadTags = (): void => {
    setIsLoading(true);
    setMessage(undefined);
    TagsService.getTags().then(
      (result: Tag[]) => {
        setItems(result);
        setIsLoading(false);
      },
      (error: Error) => {
        setIsLoading(false);
        setMessage({
          type: 'error',
          body: error.message,
        });
      }
    );
  };

  const onDelete = (id: number): void => {
    setIsLoading(true);
    setMessage(undefined);

    // TODO: Remove the additional call to the API with the load below:
    TagsService.deleteTag(id).then(loadTags, (error: Error) => {
      setIsLoading(false);
      setMessage({
        type: 'error',
        body: error.message,
      });
    });
  };

  useEffect(loadTags, []);

  return (
    <TableContainer sx={{ overflowX: 'auto' }} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: (theme: Theme) =>
                lighten(theme.palette.common.black, 0.3),
              fontWeight: (theme: Theme) => theme.typography.fontWeightBold,
            }}
          >
            {[
              { name: 'ID', width: 40 },
              { name: 'Name', width: 'auto' },
              { name: 'Actions', width: 60 },
            ].map((col, index) => (
              <TableCell
                key={index}
                sx={{
                  width: col.width,
                  color: (theme: Theme) => theme.palette.common.white,
                }}
              >
                <Typography variant="body1">{col.name}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            '& tr:nth-of-type(even)': {
              backgroundColor: (theme: Theme) => theme.palette.action.hover,
            },
          }}
        >
          {isLoading && (
            <TableRow>
              <TableCell align="center" colSpan={3}>
                <CircularProgress
                  sx={{ margin: (theme: Theme) => theme.spacing(5, 'auto') }}
                />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && (message || items.length === 0) && (
            <TableRow>
              <TableCell align="center" colSpan={3}>
                <Typography variant="body1" color="error" component="p">
                  {message?.body ?? 'No tags registered'}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {!isLoading && <TagsTableEntry tags={items} onDelete={onDelete} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TagsTable;
