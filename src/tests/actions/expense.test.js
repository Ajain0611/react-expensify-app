import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup removeExpense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        id: '123abc',
        type: 'REMOVE_EXPENSE'
    })
});

test('should setup editExpense action object', () => {
    var updates = { description: 'Rent', amount: 12.55, note: 'rent paid' };
    const action = editExpense('123abc', updates);
    expect(action).toEqual({
        id: '123abc',
        type: 'EDIT_EXPENSE',
        updates
    })
});

test('should setup addExpense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = { description: 'mouse', amount: '3000', note: 'This one is better', createdAt: 1000 };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(
            {
                type: 'ADD_EXPENSE',
                expense: {
                    id:expect.any(String),
                    ...expenseData
                }
            });
           return database.ref(`expenses/${actions[0].expense.id}`).once('value');  
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});

test('should add expense with defaults to database and store ', (done) => {
    const store = createMockStore({});
    const expenseData = { description: '', amount: 0, note: '', createdAt: 0 };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(
            {
                type: 'ADD_EXPENSE',
                expense: {
                    id:expect.any(String),
                    ...expenseData
                }
            });
           return database.ref(`expenses/${actions[0].expense.id}`).once('value');  
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});