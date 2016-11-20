import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class TodoList extends React.Component {
    createNew(e) {
        if (e.which === 13) {
            this.props.store.createTodo(e.target.value);
            e.target.value = '';
        }
    }

    filter(e) {
        this.props.store.filter = e.target.value;
    }

    toggleComplete(todo) {
        todo.complete = !todo.complete
    }

    render() {
        const { filter, todos, filteredTodos, cleareComplete } = this.props.store;
        const todoList = filteredTodos.map(todo => (
            <li key = {todo.id} >
                <input type='checkbox'
                    value={todo.complete} checked={todo.complete}
                    onChange={this.toggleComplete.bind(this, todo)}
                />
                {todo.value}
            </li>
        ));

        return <div>
            <h2>Todos</h2>
    
            <input className='create'
                onKeyPress={this.createNew.bind(this)}
            />

            <input className='filter'
                value={filter}
                onChange={this.filter.bind(this)}
            />
            <ul>{todoList}</ul>
            <a href="#"
                onClick={cleareComplete}
            >
                Clear Completed
            </a>
        </div>
    }
}
