import * as React from 'react';
import { Button, Container, Grid, Theme, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface PageProps {
  title?: string;
  children: React.ReactNode;
  actions?: {
    label: string;
    link: string;
  }[];
}

const Page: React.FC<PageProps> = (props: PageProps) => {
  const { actions, children, title } = props;

  return (
    <Container
      sx={{
        paddingTop: (theme: Theme) => theme.spacing(12),
        paddingBottom: (theme: Theme) => theme.spacing(2),
      }}
    >
      <Grid container direction="row" justifyContent="space-between">
        {title && (
          <Grid item xs>
            <Typography
              color="primary"
              component="h1"
              sx={{ marginBottom: (theme: Theme) => theme.spacing(3) }}
              variant="h5"
            >
              {title}
            </Typography>
          </Grid>
        )}
        <Grid container item xs direction="row" justifyContent="flex-end">
          {actions?.map((action: Record<string, string>, key: number) => (
            <Button
              key={key}
              component={RouterLink}
              variant="contained"
              color="primary"
              to={action.link}
            >
              {action.label}
            </Button>
          ))}
        </Grid>
      </Grid>
      <Grid container item xs={12} direction="row" sx={{ overflowX: 'auto' }}>
        {children}
      </Grid>
    </Container>
  );
};

Page.defaultProps = {
  title: undefined,
  actions: undefined,
};

export default Page;
