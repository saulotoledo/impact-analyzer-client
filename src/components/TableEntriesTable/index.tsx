import React, { useState, useEffect } from 'react';
import {
  Box,
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
import { Link } from 'react-router-dom';

import Message from '../../interfaces/Message';
import TableEntity from '../../interfaces/Table';
import TablesService from '../../services/tables.service';
import TagsService from '../../services/tags.service';
import Tag from '../../interfaces/Tag';
import TableField from '../../interfaces/TableField';

interface TableEntriesTableProps {
  tableId?: number;
}

const TableEntriesTable: React.FC<TableEntriesTableProps> = ({ tableId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [table, setTable] = useState<TableEntity>();
  const [tableEntries, setTableEntries] = useState<TableField[][]>();
  const [tagsList, setTagsList] = useState<Tag[]>();
  const [message, setMessage] = useState<Message>();

  // eslint-disable-next-line no-console
  console.log(tagsList);

  const errorCallback = (error: Error): void => {
    setIsLoading(false);
    setMessage({
      type: 'error',
      body: error.message,
    });
  };

  useEffect(() => {
    if (tableId) {
      const loadTablePromise = TablesService.getTable(tableId).then(
        setTable,
        errorCallback
      );

      const loadTableEntriesPromise = TablesService.getTableEntries(
        tableId
      ).then(setTableEntries, errorCallback);

      const loadTagsPromise = TagsService.getTags().then(
        (tagsTree: Tag[]) => setTagsList(TagsService.flattenTags(tagsTree)),
        errorCallback
      );
      setIsLoading(true);
      setMessage(undefined);
      Promise.all([
        loadTablePromise,
        loadTableEntriesPromise,
        loadTagsPromise,
      ]).then(() => setIsLoading(false), errorCallback);
    }
  }, [tableId]);

  return (
    <TableContainer
      sx={{
        marginTop: (theme: Theme) => theme.spacing(4),
        marginBottom: (theme: Theme) => theme.spacing(4),
        padding: (theme: Theme) => theme.spacing(4),
        overflowX: 'auto',
      }}
      component={Paper}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: (theme: Theme) =>
                lighten(theme.palette.common.black, 0.3),
              fontWeight: (theme: Theme) => theme.typography.fontWeightBold,
            }}
          >
            {table?.columns.map((colName, index) => (
              <TableCell
                key={index}
                sx={{
                  color: (theme: Theme) => theme.palette.common.white,
                }}
              >
                <Typography variant="body1">{colName}</Typography>
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
          {!isLoading && (message || tableEntries?.length === 0) && (
            <TableRow>
              <TableCell align="center" colSpan={table?.columns.length ?? 1}>
                <Typography variant="body1" color="error" component="p">
                  {message?.body ?? 'No tables registered'}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            tableEntries?.map((tableRow, rowIndex) => (
              <TableRow key={rowIndex}>
                {tableRow
                  ?.sort((a, b) => a.column - b.column)
                  .map((tableField, colIndex) => (
                    <TableCell>
                      <Typography variant="body1">
                        {colIndex === 0 && (
                          <Link to={`/table/${colIndex}`}>
                            {tableField.value}
                          </Link>
                        )}
                        {colIndex !== 0 && (
                          <Box component="span">{tableField.value}</Box>
                        )}
                      </Typography>
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableEntriesTable.defaultProps = {
  tableId: undefined,
};

export default TableEntriesTable;
