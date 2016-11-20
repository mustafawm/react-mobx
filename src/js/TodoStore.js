import { computed, observable } from 'mobx';

class Todo {
    @observable value;
    @observable id;
    @observable complete;

    constructor(val) {
        this.value    = val;
        this.id       = Date.now();
        this.complete = false;
    }
}

class TodoStore {
    @observable todos = [];
    @observable filter = "";
    @computed get filteredTodos() {
        let matchesFilter = new RegExp(this.filter, 'i');
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
    };

    createTodo(val) {
        this.todos.push(new Todo(val));
    }

    cleareComplete = () => {
        const incompleteTodos = this.todos.filter(todo => !todo.complete);
        this.todos.replace(incompleteTodos);
    }
}

export default new TodoStore;
