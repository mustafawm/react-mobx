import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class TodoList extends React.Component {

    createNew(e) {
        if (e.which === 13) {
            this.props.store.createTodo(e.target.value);
            this.props.store.filter = e.target.value = '';
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
                <label>
                    <input type='checkbox'
                        value={todo.complete} checked={todo.complete}
                        onChange={this.toggleComplete.bind(this, todo)}
                    />
                    &nbsp;&nbsp;
                    { todo.value }
                </label>
            </li>
        ));

        return <div>
            <h1>Todos</h1>

            <input className='input is-primary is-medium'
                placeholder="search or add new todo"
                value={filter}
                onChange={this.filter.bind(this)}
                onKeyPress={this.createNew.bind(this)}
            />
            <br/>

            <ul> { todoList } </ul>

            <br/>
            <button className='button is-small is-inverted is-danger'
                onClick={cleareComplete}
            >
                Clear Completed
            </button>
        </div>
    }
}
