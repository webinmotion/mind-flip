const express = require('express');
const router = express.Router();

function* idGen(){
    let id = 0;
    while(id < 100){
        yield ++id;
    }
}

const todos = []

router.get('/', function (req, res) {
    res.json(todos);
});

router.post('/:title', function (req, res) {
    const { title } = req.params;
    todos.push({ id: idGen(), task: title, done: false })
    res.json(todos);
});

router.put('/:id', function (req, res) {
    const { id } = req.params;
    todos.forEach(todo => {
        if (todo.id === id) {
            todo.done = !todo.done
        }
    })
    res.json(todos);
});

router.delete('/:id', function (req, res) {
    const { id } = req.params;
    const idx = todos.findIndex(todo => todo.id === id);
    if (idx > -1) {
        todos.splice(idx, 1);
    }
    res.json(todos);
});

module.exports = router;