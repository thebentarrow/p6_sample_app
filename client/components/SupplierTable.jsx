import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  Link,
} from "react-router-dom";

const SupplierTable = () => {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [initalized, setInitialized] = useState(false);

  useEffect(() => {
    if(!initalized) {
      fetch('/getSuppliers', {
        method: 'get',
        credentials: 'same-origin',
        headers: {
          "Content-Type": 'application/json',
        },
      })
      .then((response) => response.json())
      .then(function(rsp) {
        console.log(rsp)
        rsp.data.forEach(supplier => {
          const date = new Date(supplier.CreatedDateTime);
          supplier.MMDDYYYY = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        })
        setSuppliers(rsp.data);
        setLoading(false);
        setInitialized(true);
      })
      .catch(err => {
        console.log(err)
      });
    }
  }, [initalized]);

  const renderLoader = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" noWrap component="div" sx={{ flexGrow: 1 }}>
          Fetching your supplier data...
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  const renderLocation = (supplier) => {
    return (
      <div class="supplier-location">
        <div>{supplier.address1}</div>
        <div>{supplier.address2}</div>
        <div>{supplier.city} {supplier.country} {supplier.postalCode}</div>
      </div>
    );
  }

  const renderTable = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Suppliers
          </Typography>
          <Link to="/add-supplier">
            <Button>
              Add Supplier
            </Button>
          </Link>
        </Toolbar>
        <div style={{padding: '0 24px'}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Supplier Name</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Added On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow
                    key={supplier.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {supplier.name}
                    </TableCell>
                    <TableCell>{supplier.isActive ? 'yes' : 'no'}</TableCell>
                    <TableCell align="right">{renderLocation(supplier)}</TableCell>
                    <TableCell align="right">{supplier.phone}</TableCell>
                    <TableCell align="right">{supplier.email}</TableCell>
                    <TableCell align="right">{supplier.MMDDYYYY}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    );
  }

  if (loading) {
    return renderLoader();
  } else {
    return renderTable();
  }
}

export default SupplierTable;
