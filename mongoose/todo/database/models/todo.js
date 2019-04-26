const mongoose = require('mongoose');
const schema = mongoose.Schema;


let todoSchema = new schema({
    name: {
        type: String,
        required: true
    }
});


const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;