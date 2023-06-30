import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
    try {
    //Login the user
    const {data} = await api.SignIn(formData);
    dispatch({type: AUTH, data});
    history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
    //Signup the user
    const {data} = await api.SignUp(formData);
    dispatch({type: AUTH, data});
    history.push('/');
    } catch (error) {
        console.log(error);
    }
}
