import React from 'react';
import { Box, IconButton, Popover, Theme, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

import TableEntry from '../../interfaces/TableEntry';
import Tag from '../../interfaces/Tag';
import TagsManager from './TagsManager';

interface FloatingWindowProps {
  allTags: Tag[];
  onClose?: () => void;
  onTagsChange: (_tags: Tag[]) => void;
  tableEntry: TableEntry;
}

const FloatingTags: React.FC<FloatingWindowProps> = ({
  allTags,
  onClose,
  onTagsChange,
  tableEntry,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    if (onClose) {
      onClose();
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick}>
        <InfoIcon color={tableEntry.tags?.length > 0 ? 'warning' : 'info'} />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            p: (theme: Theme) => theme.spacing(2),
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: (theme: Theme) => theme.spacing(3),
          }}
        >
          <Typography color="primary" component="h1" variant="h5">
            Manage tags
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TagsManager
          allTags={allTags}
          tableEntry={tableEntry}
          onTagsChange={onTagsChange}
        />
      </Popover>
    </>
  );
};

FloatingTags.defaultProps = {
  onClose: undefined,
};

export default FloatingTags;
