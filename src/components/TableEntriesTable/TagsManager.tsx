/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

import Tag from '../../interfaces/Tag';
import TableEntry from '../../interfaces/TableEntry';

interface TagsManagerProps {
  allTags: Tag[];
  tableEntry: TableEntry;
  onTagsChange: (_tags: Tag[]) => void;
}

const TagsManager: React.FC<TagsManagerProps> = ({
  allTags,
  onTagsChange,
  tableEntry,
}) => {
  const currentTags = allTags?.filter((tag) =>
    tableEntry.tags.includes(tag.id)
  );

  const [selectedTags, setSelectedTags] = useState(currentTags ?? []);

  /*
  const onDelete = (tagToDelete: Tag) => () => {
    onTagsChange(currentTags?.filter((tag) => tag !== tagToDelete) ?? []);
  };
  const handleAddition = (tagToAdd: Tag | undefined): void => {
    if (tagToAdd) {
      onTagsChange([...(currentTags ?? []), tagToAdd]);
    }
  };


filterSelectedOptions
onChange={(_event, newValue) => console.log(newValue)}
onChange={(_event, newValue) => handleAddition(newValue)}
  typeof newValue === 'string'
    ? currentTags?.find((tag) => tag.name === newValue)
    : newValue
inputValue={selectedTags}

onInputChange={(event, newInputValue) => {
  setSelectedTags(newInputValue);
}}

renderOption={(props, option) => <li {...props}>{option.name}</li>}
freeSolo
disableClearable
selectOnFocus
clearOnBlur
handleHomeEndKeys
  */
  return (
    <Autocomplete
      getOptionLabel={(option) => option.name}
      multiple
      onChange={(_event, newValue) => {
        setSelectedTags(newValue);
        onTagsChange(newValue);
      }}
      options={allTags}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Tags"
          placeholder="Add tag"
        />
      )}
      renderTags={(value: Tag[], getTagProps) =>
        value.map((tag: Tag, index: number) => (
          <Chip
            //
            label={tag.name}
            {...getTagProps({ index })}
            key={tag.id}
          />
        ))
      }
      style={{ width: 300 }}
      value={selectedTags}
    />
  );
};

export default TagsManager;
