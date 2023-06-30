import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import mern from '../../images/mern_logo.png';
import useStyles from './styles';
import {Link, useLocation, useHistory} from 'react-router-dom';
import {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            console.log(decodedToken);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    const logout = () => {
        dispatch({type: LOGOUT});
        history.push('/auth');
        setUser(null);
    }
    return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>MERN</Typography>
            <img className={classes.image} src={mern} alt='mern-logo' height='60' />
        </div>
        <Toolbar className={classes.toolbar}>
            {user?.result ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                        {user?.result.name.charAt(0)}
                    </Avatar>
                    <Typography className={classes.userName} variant='h6'>
                        {user?.result.name}
                    </Typography>
                    <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>
                        Logout
                    </Button>
                </div>
            ) : (
                <Button component={Link} to='/auth' variant='contained' color='primary'>
                    Sign In
                </Button>
            )}
        </Toolbar>
    </AppBar>
    )
}

export default Navbar;