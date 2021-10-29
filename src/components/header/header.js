/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-indent */
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState, useEffect } from 'react';
import { Link as RouterLink, BrowserRouter } from 'react-router-dom';

const headersData = [
 
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#F2F2F2',
    paddingRight: '79px',
    paddingLeft: '118px',
    textTransform: 'capitalize',
    fontWeight: '500',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#000',
    textAlign: 'left',
  },
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    textTransform: 'capitalize',
    fontWeight: '500',
    size: '15px',
    marginLeft: '38px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  drawerContainer: {
    padding: '20px 30px',
  },
}));

export default function Header() {
  // eslint-disable-next-line object-curly-newline
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => (window.innerWidth < 900
      ? setState((prevState) => ({ ...prevState, mobileView: true }))
      : setState((prevState) => ({ ...prevState, mobileView: false })));

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => (
    <Toolbar className={toolbar}>
      {incentroLogo}
      <div>{getMenuButtons()}</div>
    </Toolbar>
  );

  const displayMobile = () => {
    // eslint-disable-next-line max-len
    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    // eslint-disable-next-line max-len
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar role="navigation">
        <IconButton
          {...{
            edge: 'start',
            color: 'primary',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{incentroLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => (
      <Link
        {...{
          component: RouterLink,
          to: href,
          color: 'primary',
          style: { textDecoration: 'none' },
          key: label,
        }}
      >
        <MenuItem>{label}</MenuItem>
      </Link>
    ));
  };

  const incentroLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Weather App
    </Typography>
  );

  const getMenuButtons = () => headersData.map(({ label, href }) => (
      <Button
        // eslint-disable-next-line react/jsx-indent-props
        {...{
          key: label,
          color: 'primary',
          to: href,
          component: RouterLink,
          className: menuButton,
        }}
      >
        {label}
      </Button>
  ));

  return (
    <BrowserRouter>
      <header>
        <AppBar className={header}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
    </BrowserRouter>
  );
}
