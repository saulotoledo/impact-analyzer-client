import React from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
// eslint-disable-next-line max-len
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

import Tag from '../../interfaces/Tag';

interface TagsTableEntryProps {
  tags: Tag[];
  depth?: number;
  onDelete: (_id: number) => void;
}

const TagsTableEntry: React.FC<TagsTableEntryProps> = ({
  tags,
  depth = 0,
  onDelete,
}) => (
  <>
    {tags.map((tag) => (
      <React.Fragment key={tag.id}>
        <TableRow>
          <TableCell>
            <Typography variant="body1">
              <Link to={`/tag/${tag.id}`}>{tag.id}</Link>
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">
              {depth > 0 && (
                <>
                  <Box
                    component="span"
                    sx={{
                      width: `${32 * depth}px`,
                      height: '10px',
                      float: 'left',
                    }}
                  />
                  <SubdirectoryArrowRightIcon />
                </>
              )}
              {tag.name}
            </Typography>
          </TableCell>
          <TableCell>
            <Box display="flex" flexDirection="row" component="span">
              <IconButton
                aria-label="edit"
                component={Link}
                to={`/tag/${tag.id}`}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => onDelete(tag.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
        {tag.children && (
          <TagsTableEntry
            tags={tag.children}
            depth={depth + 1}
            onDelete={onDelete}
          />
        )}
      </React.Fragment>
    ))}
  </>
);

TagsTableEntry.defaultProps = {
  depth: undefined,
};

export default TagsTableEntry;
