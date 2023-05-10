import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export const validateForm = function(formData) {
  const errors = {};
  const keys = Object.keys(formData);
  keys.forEach(key => {
    if (key !== 'isActive') {
      if (!formData[key].trim().length) {
        errors[key] = 'This is required'
      }
    }
  });
  return errors;
}

const AddSupplierForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({})

  const handleSubmit = () => {
    const formData = {
      name: document.querySelector('input[name="name"]').value,
      category: document.querySelector('input[name="category"]').value,
      description: document.querySelector('input[name="description"]').value,
      address1: document.querySelector('input[name="address1"]').value,
      address2: document.querySelector('input[name="address2"]').value,
      city: document.querySelector('input[name="city"]').value,
      postalCode: document.querySelector('input[name="postalCode"]').value,
      country: document.querySelector('input[name="country"]').value,
      phone: document.querySelector('input[name="phone"]').value,
      email: document.querySelector('input[name="email"]').value,
      isActive:  document.querySelector('input[name="isActive"]').checked,
    }

    const errors = validateForm(formData);

    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      setLoading(true);
      fetch('/addSupplier', {
        method: 'post',
        body: JSON.stringify(Object.assign({
          _csrf: appConfig['X-CSRF-Token'],
        }, formData)),
        credentials: 'same-origin',
        headers: {
          "Content-Type": 'application/json',
        },
      })
      .then((response) => response.json())
      .then(function(rsp) {
        console.log(rsp);
        if (rsp.success) window.location.href = '/';
      })
      .catch(err => {
        console.log(err)
      });
    }
  };

  return (
    <>
      <div style={{display: loading ? 'block' : 'none'}}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" noWrap component="div" sx={{ flexGrow: 1 }}>
          Adding new supplier...
        </Typography>
        <LinearProgress />
      </Box>
      </div>
      <div style={{display: loading ? 'none' : 'block'}}>
        <Box sx={{ width: '100%' }}>
          <Toolbar>
            <Typography variant="h6" gutterBottom>
              New Supplier
            </Typography>
          </Toolbar>
          <form id="new-supplier-form" style={{padding: '0 24px'}}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={!!errors.name}
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  autoComplete="supplier-name"
                  variant="standard"
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={!!errors.category}
                  id="category"
                  name="category"
                  label="Category"
                  fullWidth
                  autoComplete="supplier-category"
                  variant="standard"
                  helperText={errors.category}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={!!errors.description}
                  id="description"
                  name="description"
                  label="Description"
                  fullWidth
                  autoComplete="supplier-description"
                  variant="standard"
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={!!errors.address1}
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="address-line1"
                  variant="standard"
                  helperText={errors.address1}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="address-line2"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  error={!!errors.city}
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="city"
                  variant="standard"
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  error={!!errors.postalCode}
                  id="postalCode"
                  name="postalCode"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="postal-code"
                  variant="standard"
                  helperText={errors.postalCode}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  error={!!errors.country}
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="country"
                  variant="standard"
                  helperText={errors.country}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={!!errors.phone}
                  id="phone"
                  name="phone"
                  label="Phone"
                  fullWidth
                  autoComplete="phone"
                  variant="standard"
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={!!errors.email}
                  id="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                  autoComplete="email"
                  variant="standard"
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="isActive" value="yes" />}
                  label="Supplier Is Active"
                />
              </Grid>
            </Grid>
            <br/><br/>
            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={() => window.location.href = '/'}>Cancel</Button>
              <Button variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>
            </Stack>
          </form>
        </Box>
      </div>
    </>
  );
}

export default AddSupplierForm;