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
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

import TableEntity from '../../interfaces/Table';
import TablesService from '../../services/tables.service';

const TablesTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<TableEntity[]>([]);
  const [message, setMessage] = useState<string>();

  const loadTables = (): void => {
    setIsLoading(true);
    setMessage('');
    TablesService.getTables().then(
      (result: TableEntity[]) => {
        setItems(result);
        setIsLoading(false);
      },
      (error: Error) => {
        setIsLoading(false);
        setMessage(error.message);
      }
    );
  };

  useEffect(loadTables, []);

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
                  {message || 'No tables registered'}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            items.map((table) => (
              <TableRow key={table.id}>
                <TableCell>
                  <Typography variant="body1">
                    <Link to={`/table/${table.id}`}>{table.id}</Link>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{table.name}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    component={Link}
                    to={`/table/${table.id}`}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablesTable;
