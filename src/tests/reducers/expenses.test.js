import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@init' });
    expect(state).toEqual([]);
});

test('should remove expenses by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if no id found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id:'4',
        description:'laptop',
        note:'',
        createdAt:20000,
        amount:29500
    };

    const action = {
        type:'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([...expenses,expense]);
});

test('should edit expenses by id and updates', () => {
    const amount = 122000;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    };

    const state = expensesReducer(expenses, action);

    expect(state[1].amount).toEqual(amount);
});

test('should not edit expenses with invalid id', () => {
    const amount = 122000;
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            amount
        }
    };

    const state = expensesReducer(expenses, action);

    expect(state[1]).toEqual(expenses[1]);
});

