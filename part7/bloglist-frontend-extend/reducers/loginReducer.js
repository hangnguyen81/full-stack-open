import loginService from '../services/login';
import blogsService from '../services/blogs';

const loginReducer = (state=null, action) => {
  switch (action.type){
  case 'LOGIN':
    return action.data;
  case 'CHECK_LOGGED_USER':
    return action.data;
  case 'LOGOUT':
    window.localStorage.removeItem('LoggedBloglistApp');
    window.location.reload();
    return state = null;
  default:
    return state;
  }
};

export const loggedUser = (user) => {
  return async dispatch => {
    blogsService.setToken(user.token);
    dispatch({
      type:'CHECK_LOGGED_USER',
      data: user
    });
  };
};

export const handleLogin = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('LoggedBloglistApp', JSON.stringify(user));
    blogsService.setToken(user.token);
    dispatch({
      type:'LOGIN',
      data: user
    });
  };
};

export const handleLogout = () => {
  return async dispatch => {
    dispatch({
      type:'LOGOUT'
    });
  };
};

export default loginReducer;