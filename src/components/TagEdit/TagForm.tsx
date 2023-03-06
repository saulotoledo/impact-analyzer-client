import * as Yup from 'yup';
import React from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Theme,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';

import Tag from '../../interfaces/Tag';
import TagsService from '../../services/tags.service';

interface TagFormProps {
  tagData: Tag;
  tagsTree: Tag[];
  initialErrors?: Record<string, unknown>;
  onSubmit: (_data: Tag) => Promise<void>;
  onTouch: () => void;
}

const TagForm: React.FC<TagFormProps> = ({
  tagData,
  tagsTree,
  initialErrors,
  onSubmit,
  onTouch,
}: TagFormProps) => {
  const onFormSubmit = (
    data: Tag,
    { setSubmitting }: FormikHelpers<Tag>
  ): void => {
    setSubmitting(true);
    onSubmit(data).then(
      () => setSubmitting(false),
      () => setSubmitting(false)
    );
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please inform a value'),
    parent_id: Yup.number().nullable(),
  });

  const tagsList = TagsService.flattenTags(tagsTree, tagData.id);

  return (
    <Formik
      initialValues={tagData}
      initialErrors={initialErrors}
      onSubmit={onFormSubmit}
      validationSchema={validationSchema}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
              sx={{ marginTop: (theme: Theme) => theme.spacing(4) }}
            >
              <Grid item xs={12} sm={2}>
                <TextField
                  id="id"
                  name="id"
                  autoComplete="id"
                  disabled
                  fullWidth
                  label="Tag ID"
                  onFocus={() => onTouch()}
                  variant="outlined"
                  value={values.id}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  id="name"
                  name="name"
                  autoComplete="name"
                  disabled={isSubmitting}
                  fullWidth
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={() => onTouch()}
                  required
                  value={values.name}
                  variant="outlined"
                  error={!!errors.name && touched.name}
                  helperText={errors.name && touched.name ? errors.name : ''}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                {/* TODO: Enable field below */}
                {/*
                  There is a bug related to the library used in the
                  backend when moving nodes in the tree. As this application
                  is just for demonstration purposes, I disabled the field
                  below.
                */}
                {tagsList && tagsList.length && (
                  <TextField
                    id="parent_id"
                    name="parent_id"
                    autoComplete="parent_id"
                    disabled
                    fullWidth
                    label="Parent tag"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={() => onTouch()}
                    required={false}
                    select
                    value={values.parent_id ?? ''}
                    variant="outlined"
                    error={!!errors.parent_id && touched.parent_id}
                    helperText={
                      errors.parent_id && touched.parent_id
                        ? errors.parent_id
                        : ''
                    }
                  >
                    <MenuItem key="-1" value="">
                      (None)
                    </MenuItem>
                    {tagsList.map((tag) => (
                      <MenuItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              sx={{ margin: (theme: Theme) => theme.spacing(3, 0, 2) }}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <CircularProgress
                  sx={{ marginRight: (theme: Theme) => theme.spacing(2) }}
                  size={20}
                  color="secondary"
                />
              )}
              {isSubmitting ? 'Updating tag' : 'Update tag'}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

TagForm.defaultProps = {
  initialErrors: undefined,
};

export default TagForm;
