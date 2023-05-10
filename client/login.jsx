import React, { useState } from 'react';
import ReactDOM from "react-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function Login() {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);

    const data = new FormData(evt.currentTarget);

    fetch('/validateUser', {
      method: 'post',
      body: JSON.stringify({
        _csrf: appConfig['X-CSRF-Token'],
        username: data.get('username'),
        password: data.get('password'),
      }),
      credentials: 'same-origin',
      headers: {
        "Content-Type": 'application/json',
      },
    })
    .then((response) => response.json())
    .then(function(data) {
      if (!data.success) {
        setShowError(true);
        setLoading(false);
      } else {
        window.location.href = '/';
      }
    })
    .catch(err => {
      console.log(err)
    });
  };

  const renderError = () => {
    return showError ? 
    <Typography variant="subtitle2" color="error">
      Sorry the username and password does not match any of our records.
    </Typography> : '';
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">
            Welcome to P6 Sample App
          </Typography>

          <br/>

          {renderError()}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={loading}
            />
            <LoadingButton
              fullWidth
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
              size="large"
              type="submit"
              variant="contained"
            >
              <span>Sign In</span>
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

ReactDOM.render(<Login />, document.getElementById("root"));