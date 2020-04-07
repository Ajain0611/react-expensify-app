import {
    startAddExpense,
    startEditExpense,
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense
} from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
const uid = 'mytestuid'
const createMockStore = configureMockStore([thunk]);
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
    const expensesData = {};

    expenses.forEach(({ id, description, amount, note, createdAt }) => {
        expensesData[id] = { description, amount, note, createdAt };
    });

    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup removeExpense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        id: '123abc',
        type: 'REMOVE_EXPENSE'
    })
});

test('should remove the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value')

    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
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

test('should edit Expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id
    const updates = { amount: 210.45 };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value')
            .then((snapshot) => {
                expect(snapshot.val().amount).toEqual(updates.amount);
                done();
            });
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
    const store = createMockStore(defaultAuthState);
    const expenseData = { description: 'mouse', amount: '3000', note: 'This one is better', createdAt: 1000 };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(
            {
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});

test('should add expense with defaults to database and store ', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = { description: '', amount: 0, note: '', createdAt: 0 };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(
            {
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});

test('should setup set expenses action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    })
});