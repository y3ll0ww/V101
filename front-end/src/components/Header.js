import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { ThemeProvider } from '@material-ui/core/styles';
import { headFont } from '../Theme';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import SchoolOutlined from '@mui/icons-material/SchoolOutlined';
import TrendingUp from '@mui/icons-material/TrendingUp';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';

import logo from '../static/img/asset-1.png';
import history from '../static/global/History';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: '1px solid ${theme.palette.divider}',
    },
    navBtn: {
        color: 'white',
        textTransform: 'capitalize',
    },

}));


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Header() {
    const classes = useStyles();

    function handleClick(url) {
        history.push(url)
        window.location.reload()
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="static"
                color="primary"
                elevation={0}
                className={classes.appBar}
            >
            <ThemeProvider theme={headFont}>
                <Toolbar>
                    <img
                        id="navbar-logo"
                        src={logo}
                        alt="Value101"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleClick('/')}
                    />
                    <Box
                          sx={{
                            display: 'flex',
                            position: 'relative',
                            left: '2%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                              m: 1,
                            },
                          }}
                        >
                          <ButtonGroup
                            variant="outlined"
                            aria-label="text button group"
                            size='large'
                            >
                                <Button
                                    className={classes.navBtn}
                                    startIcon={<ArticleOutlined/>}
                                    onClick={() => handleClick('/news')}>
                                        News
                                </Button>
                                <Button
                                    className={classes.navBtn}
                                    startIcon={<SchoolOutlined/>}
                                    onClick={() => handleClick('/training')}>
                                        Training
                                </Button>
                                <Button
                                    className={classes.navBtn}
                                    startIcon={<TrendingUp/>}
                                    onClick={() => handleClick('/companies')}>
                                        Companies
                                </Button>
                                <Search>
                                  <SearchIconWrapper>
                                    <SearchIcon />
                                  </SearchIconWrapper>
                                  <StyledInputBase
                                    placeholder="Lookup…"
                                    inputProps={{ 'aria-label': 'search' }}
                                  />
                                </Search>
                          </ButtonGroup>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            position: 'absolute',
                            right: '5%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                              m: 1,
                            },
                          }}
                        >
                          <ButtonGroup
                            variant="outlined"
                            aria-label="text button group"
                            size='large'
                            >
                                <Tooltip title="Account">
                                    <IconButton
                                        sx={{ ml: 0 }}
                                        >
                                            <AccountCircleOutlined sx={{ color: "white" }} />
                                    </IconButton>
                                </Tooltip>
                          </ButtonGroup>
                        </Box>
                </Toolbar>
            </ThemeProvider>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;