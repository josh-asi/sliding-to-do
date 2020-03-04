import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

import Classnames from 'classnames';

import './styles.css';

function TodoList() {
  const [items, setItems] = useState([
    { id: uuid(), text: 'Buy eggs' },
    { id: uuid(), text: 'Pay bills' },
    { id: uuid(), text: 'Invite friends over' },
    { id: uuid(), text: 'Fix the TV' }
  ]);

  const [addingRow, setRowAdding] = React.useState(false);
  const [deletingRow, setRowDeleting] = React.useState(false);

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Button
        style={{ marginBottom: '1rem' }}
        onClick={() => {
          const id = uuid();
          const text = `New item: ${id}`;
          const newItem = { id, text };

          if (!items) {
            setItems(items => [newItem, ...items]);
            return;
          }

          setRowAdding(true);

          setTimeout(() => {
            setRowAdding(false);
            setItems(items => [newItem, ...items]);
          }, 400);
        }}
      >
        Add Item
      </Button>
      <ListGroup style={{ marginBottom: '1rem' }}>
        <TransitionGroup
          className={Classnames(
            'todo-list',
            addingRow & !deletingRow ? 'todo-list--adding' : null,
            !addingRow & deletingRow ? 'todo-list--deleting' : null
          )}
        >
          {items.map(({ id, text }) => (
            <CSSTransition key={id} timeout={500} classNames='item'>
              <ListGroup.Item>
                <Button
                  className='remove-btn'
                  variant='danger'
                  size='sm'
                  onClick={() => {
                    setItems(items => items.filter(item => item.id !== id));
                    // setRowDeleting(true);

                    // setTimeout(() => {
                    //   setRowDeleting(false);
                    // }, 200);
                  }}
                >
                  &times;
                </Button>
                {text}
              </ListGroup.Item>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
