const storage = window.localStorage;

export default {
    setItem(value: TodoType.Todo[]) {
        storage.setItem('todos', JSON.stringify(value));
    },
    getItem() {
        return JSON.parse(storage.getItem('todos') || '[]');
    },
    removeItem() {
        storage.removeItem('todos');
    }
};