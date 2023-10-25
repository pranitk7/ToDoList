import Todo from '../model/Todo.js';

export const addTodo = async (request, response) => {
    try {
        const newTodo = await Todo.create({
            data: request.body.data,
            createdAt: Date.now()
        })

        await newTodo.save();

        return response.status(200).json(newTodo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

// export const addTodo = async (request, response) => {
//     try {
//         // Fetch all existing todos to get the count
//         const allTodos = await Todo.find({});

//         // Calculate the position for the newTodo
//         const newPosition = allTodos.length;

//         // Create the newTodo with the calculated position
//         const newTodo = await Todo.create({
//             data: request.body.data,
//             createdAt: Date.now(),
//             position: newPosition
//         });

//         return response.status(200).json(newTodo);
//     } catch (error) {
//         return response.status(500).json(error.message);
//     }
// }




//TRY 1
// export const addTodo = async (request, response) => {
//     try {
//         // Find the latest todo based on the createdAt field
//         // const latestTodo = await Todo.find({}, { _id: 0 }, { sort: { 'createdAt': -1 } });
//         const latestTodo = await Todo.find({}).sort({ 'createdAt': -1 });


//         // Calculate the createdAt value for the newTodo
//         const newTodoCreatedAt = latestTodo ? latestTodo.createdAt : Date.now();
//         // Create the newTodo with the calculated createdAt value
//         const newTodo = await Todo.create({
//             data: request.body.data,
//             createdAt: newTodoCreatedAt
//         });
//         // Save the newTodo
//         await newTodo.save();
//         return response.status(200).json(newTodo);
//     } catch (error) {
//         return response.status(500).json(error.message);
//     }
// }

export const getAllTodos = async (request, response) => {
    try {
        const todos = await Todo.find({}).sort({ 'createdAt': 1 })

        return response.status(200).json(todos);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const toggleTodoDone = async (request, response) => {
    try {
        const todoRef = await Todo.findById(request.params.id);

        const todo = await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { done: !todoRef.done }
        )

        await todo.save();

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const updateTodo = async (request, response) => {
    try {
        await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { data: request.body.data }
        )

        const todo = await Todo.findById(request.params.id);

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const deleteTodo = async (request, response) => {
    try {
        const todo = await Todo.findByIdAndDelete(request.params.id)

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}