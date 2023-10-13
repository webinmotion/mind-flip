import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ExtensionIcon from '@mui/icons-material/Extension';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Divider} from '@mui/material';
import {useAppContext} from '../../context/appContext';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Akilisha
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#b53f3f',
            light: '#CE6D6D',
            dark: '#7E2C2C',
            contrastText: '#fff',
        },
        secondary: {
            main: '#5a61de',
            light: '#7B80E4',
            dark: '#3E439B',
            contrastText: '#fff',
        },
    },
  });

function Layout({ children }) {

    const {visitor, setCurrentRoute, accountSignOut} = useAppContext();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleSignOut = () => {
        accountSignOut(visitor?.authentication?.authUser?.username);
        setCurrentRoute('')
        handleClose();
    };

    const handleOrganize = () => {
        setCurrentRoute('organize');
        handleClose();
    }

    const handleProfile = () => {
        setCurrentRoute('profile')
        handleClose();
    }

    const handleMenu = (event) => {
        if(visitor?.authentication?.authUser?.is_active) {
            setAnchorEl(event.currentTarget);
        }
        else{
            setCurrentRoute('registration');
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGameEngine = () => {
        setCurrentRoute('engine');
        handleClose();
    };

    const handleGameLayout = () => {
        setCurrentRoute('layout');
        handleClose();
    };

    const handleGameClock = () => {
        setCurrentRoute('clock');
        handleClose();
    }

    const handleGameMessage = () => {
        setCurrentRoute('message');
        handleClose();
    }

    const handleGameQuestion = () => {
        setCurrentRoute('question');
        handleClose();
    }

    const handleQuickVote = () => {
        setCurrentRoute('quickvote');
        handleClose();
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <CssBaseline />
                <AppBar
                    position="absolute"
                    color="primary"
                    elevation={0}
                    sx={{
                        position: 'relative',
                    }}
                >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setCurrentRoute('')}
                        >
                            <ExtensionIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Mind Flip
                        </Typography>

                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                <MenuItem onClick={handleQuickVote}>Run Quick Vote</MenuItem>
                                <MenuItem onClick={handleOrganize}>Organize Game</MenuItem>
                                <Divider />
                                <MenuItem onClick={handleGameEngine}>Game Engine</MenuItem>
                                <MenuItem onClick={handleGameLayout}>Game Layout</MenuItem>
                                <MenuItem onClick={handleGameClock}>Game Clock</MenuItem>
                                <Divider />
                                <MenuItem onClick={handleGameMessage}>Game Message</MenuItem>
                                <MenuItem onClick={handleGameQuestion}>Game Question</MenuItem>
                                <Divider />
                                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>

                <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
                    {children}
                </Container>
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="body1">
                            Mind Flip Trivia.
                        </Typography>
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Layout