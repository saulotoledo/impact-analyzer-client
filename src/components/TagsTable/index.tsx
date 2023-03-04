import React, { useState, useEffect } from 'react';
import {
  CircularProgress,
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
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import Tag from '../../interfaces/Tag';
import TagsService from '../../services/tags.service';

const TagsTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Tag[]>([]);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setIsLoading(true);
    TagsService.getTags().then(
      (result: Tag[]) => {
        setItems(result);
        setIsLoading(false);
      },
      (error: Error) => {
        setIsLoading(false);
        setMessage(error.message);
      }
    );
  }, []);

  return (
    <TableContainer className="TagsTable" component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 60 }}>
              <Typography variant="body1">ID</Typography>
            </TableCell>
            <TableCell style={{ width: 500 }}>
              <Typography variant="body1">Name</Typography>
            </TableCell>
            <TableCell style={{ width: 60 }}>
              <Typography variant="body1">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
                  {message || 'No tags registered'}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            items.map(({ id, name }) => (
              <TableRow key={id}>
                <TableCell>
                  <Typography variant="body1">{id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TagsTable;
