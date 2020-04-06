import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage
        editExpense={editExpense}
        startRemoveExpense={startRemoveExpense}
        history={history}
        expense={expenses[2]}
    />
    );
});

test('should render edit expense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
    let expense = expenses[2];
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
});

test('should handle startRemoveExpense', () => {
    let expense = expenses[2];
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expense.id});
});