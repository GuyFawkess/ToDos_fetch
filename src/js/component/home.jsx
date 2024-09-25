import React, { useState, useEffect } from "react";
import List from "./List";

// IMPORTANTE

//debido a que la api se borra todo cada ciertas horas es importante crear un usuario llamado: Jason
//para que funcione correctamente. Esta es la direccion de la api:
// https://playground.4geeks.com/todo/docs#/

const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useState([]); // creamos un array para las tareas
	const apiUrlGet = "https://playground.4geeks.com/todo/users/Jason";
	const apiUrlPost = "https://playground.4geeks.com/todo/todos/Jason"

	const contador = () => {
		if (todos.length == 0) {
			return "No hay tareas";
		} else if (todos.length == 1) {
			return "Te queda la última tarea";
		} else {
			return `Te quedan ${todos.length} tareas`;
		}
	}

	useEffect(() => {
		fetch(apiUrlGet)
			.then(res => res.json())
			.then(data => {
				//console.log(data)
				setTodos(data.todos || []); // aqui tuvimos que poner que devolviera una array vacia o sino me daba error cuando no tenia ningun todo
			}
			)
			.catch(error => console.log("Error fetching: ", error));

	}, []);



	const handleKeyPress = (e) => {
		if (e.key === "Enter" && inputValue !== '') {
			// chequeamos que el input no este vacio

			const newTodo = { label: inputValue, is_done: false }

			fetch(apiUrlPost, {
				method: 'POST',
				body: JSON.stringify(newTodo),
				headers: {
					"Content-type": "application/json"
				}
			})
				.then(() => {
					setTodos([...todos, newTodo]);
					setInputValue('');
				})

				.catch(error => console.log("Error adding to: ", error));
		}
	}
	const deletePost = (id) => {
		const apiUrlDelete = `https://playground.4geeks.com/todo/todos/${id}`

		fetch(apiUrlDelete, {
			method: 'DELETE',
		})
			.then(() => {
				setTodos(todos.filter(todo => todo.id !== id));
			})
			.catch(error => console.log("Error deleting: ", error));
	};

	return (
		<div className="container mt-5">
			<h1 className="text-center">My To Do's</h1>
			<input
				className="m-auto mb-3"
				type="text"
				placeholder="Add To Do"
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onKeyPress={handleKeyPress}
			/>
			{/* el values es el nombre del prop, puede tener el nombre que quieras */}
			<List values={todos}>  
					{(todo) => {
						return (
							<li key={todo.id}>
								{todo.label}
								<i
									className="fas fa-times text-danger todo-icon"
									onClick={() =>
										deletePost(todo.id)}
								></i>
							</li>
						)
					}}
			</List>
			<div className="m-auto contador mt-2">{contador()}</div>
		</div>
	);
};

export default Home;


// {todos.map((todo) => (
// 	<li key={todo.id}>
// 		{todo.label}
// <i
// 	className="fas fa-times text-danger todo-icon"
// 	onClick={() =>
// 		deletePost(todo.id)
// 	}

// ></i>
// 	</li>
// ))}