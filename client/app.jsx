import * as React from 'react';
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';

import SupplierTable from './components/SupplierTable';
import AddSupplierForm from './components/AddSupplierForm';

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              P6 Sample App
            </Typography>
            <Button
              color="inherit"
              onClick={() => window.location.href = '/logout'}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem key="suppliers" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon>conveyor_belt</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Suppliers" />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route exact path="/" element={<SupplierTable/>}/>
            <Route exact path="/add-supplier" element={<AddSupplierForm/>}/>
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
