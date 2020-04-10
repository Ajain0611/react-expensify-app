// Stateless functional component
import { startSetExpenses } from './actions/expenses';
import AppRouter, { browserHistory } from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';
import { LoginPage } from './components/LoginPage';
import LoadingPage  from './components/LoadingPage';

const store = configureStore();
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

const jsx = (
    <Provider store={store}><AppRouter /></Provider>
)
ReactDOM.render(<LoadingPage/>, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (browserHistory.location.pathname === '/'){
                browserHistory.push('/dashboard');
            } 
        });
    }
    else {
        store.dispatch(logout());
        renderApp();
        browserHistory.push('/');
    }
})
