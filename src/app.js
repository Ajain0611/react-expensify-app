// Stateless functional component
import { addExpense } from './actions/expenses';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import { setTextFilter } from './actions/filters';

const store = configureStore();

const jsx = (
    <Provider store={store}><AppRouter /></Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));