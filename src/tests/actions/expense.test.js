import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    const expenseData = {
        description: 'rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    }

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id:expect.any(String)
        }
    })
});

test('should setup addExpense action object with default values', () => {
    const expenseData = {
        note: '',
        description: '',
        amount: 0,
        createdAt: 0,
    }

    const action = addExpense();
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense:{
            ...expenseData,
            id:expect.any(String)
        }
    })
})