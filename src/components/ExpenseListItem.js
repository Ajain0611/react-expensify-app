// Export a stateless functional component
// description, amount, createdAt
import React from 'react';
import {Link} from 'react-router-dom';

export const ExpenseListItem = ({dispatch, id,description,amount,createdAt}) => (
    <div>
       <Link to = {`/edit/${id}`}><h3>{description}</h3></Link> 
        <p>{amount} - {createdAt}</p>
        <button onClick = {(e) => {
            dispatch(removeExpense({id}));
        }}>Remove</button>
    </div>
);

export default ExpenseListItem;