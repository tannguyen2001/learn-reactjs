import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CodeIcon from '@material-ui/icons/Code'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Login from 'features/Auth/components/Login'
import Register from 'features/Auth/components/Register'
import { logout } from 'features/Auth/userSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
}))

const MODE = {
  login: 'login',
  register: 'register',
}

export default function Header() {
  const classes = useStyles()

  const loggedInUser = useSelector((state) => state.user.current)
  const isLoggedIn = !!loggedInUser.id
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(MODE.login)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
    setMode(MODE.login)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleLogoutClick = () => {
    const action = logout()
    dispatch(action)
  }

  return (
    <div className={classes.root}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <CodeIcon className={classes.menuButton} />
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">
                EZ shop
              </Link>
            </Typography>
            <NavLink className={classes.link} to="/todos">
              <Button color="inherit">Todos</Button>
            </NavLink>
            <NavLink className={classes.link} to="/albums">
              <Button color="inherit">Albums</Button>
            </NavLink>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            )}
            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircleIcon></AccountCircleIcon>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>{loggedInUser.fullName}</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogActions>
            {mode === MODE.register && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Register closeDialog={handleClose} />
                <Box textAlign={'center'} marginTop={'10px'}>
                  <Button color="primary" onClick={() => setMode(MODE.login)}>
                    Bạn đã có tài khoản? Chuyển sang đăng nhập
                  </Button>
                </Box>
              </div>
            )}

            {mode === MODE.login && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Login closeDialog={handleClose} />
                <Box textAlign={'center'} marginTop={'10px'}>
                  <Button
                    color="primary"
                    onClick={() => setMode(MODE.register)}
                  >
                    Bạn chưa có tài khoản? Chuyển sang đăng ký
                  </Button>
                </Box>
              </div>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
