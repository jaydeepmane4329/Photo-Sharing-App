import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import Input from './Input';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {AUTH} from '../../constants/actionTypes';
import { useHistory } from 'react-router-dom';
import {signin, signup} from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: ''
}
const Auth = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowpassword = () => setShowPassword(!showPassword);
    const [isSignup, setIsSignup] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const googleSuccess = (res) => {
        console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type: AUTH, data: { result, token}});
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleError = () => console.log('Google Sign In was unsuccesful. Try again Later');
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                            <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                            </>
                        )}
                    <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowpassword={handleShowpassword} />
                    {isSignup && <Input name='confirmpassword' label='Confirm Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId = '290460004902-gb85b6ah8mledu02j2iu7nfdeho0vt2t.apps.googleusercontent.com' //https://console.developers.google.com
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                Google Sign In
                            </Button>
                        ) }
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account ? Sign In' : 'Create an account - Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;