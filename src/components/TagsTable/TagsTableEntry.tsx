import React from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
// eslint-disable-next-line max-len
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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
      <>
        <TableRow key={tag.id}>
          <TableCell>
            <Typography variant="body1">{tag.id}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">
              {depth > 0 && (
                <>
                  <Box
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
            <Typography variant="body1">
              <IconButton aria-label="delete" onClick={() => onDelete(tag.id)}>
                <DeleteIcon />
              </IconButton>
            </Typography>
          </TableCell>
        </TableRow>
        {tag.children && (
          <TagsTableEntry
            tags={tag.children}
            depth={depth + 1}
            onDelete={onDelete}
          />
        )}
      </>
    ))}
  </>
);

TagsTableEntry.defaultProps = {
  depth: undefined,
};

export default TagsTableEntry;
