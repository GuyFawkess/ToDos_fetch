import React, { useState, useEffect } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState('');
	const [todos, setTodos] = useState([]); // creamos un array para las tareas
	const apiUrlGet = "https://playground.4geeks.com/todo/users/Jason";
	const apiUrlPost = "https://playground.4geeks.com/todo/todos/Jason"

	useEffect(() => {
		fetch(apiUrlGet)
			.then(res => res.json())
			.then(data =>{
				console.log(data)
				setTodos(data.todos || []);
			}
			)
			.catch(error => console.log("Error fetching: ", error));
			
	}, [todos]);

	const contador = () => {
		if (todos.length == 0) {
			return "No hay tareas";
		} else if (todos.length == 1) {
			return "Te queda la última tarea";
		} else {
			return `Te quedan ${todos.length} tareas`;
		}
	}

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && inputValue !== '') {
			// chequeamos que el input no este vacio

			const newTodo = { label: inputValue, is_done: false}
			
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
	// Crear un usefect para actualizar las tareas, en el momento que se modifique el estado de la variable todos, se actualiza el renderizado de la interfaz de usuario.
	// en el handlekeyPress metemos el fetch con el POst y le pasamos el valor de la variable input, que es un string.
	
	const deletePost = (id) => {
	const apiUrlDelete = `https://playground.4geeks.com/todo/todos/${id}`

		fetch(apiUrlDelete, {
			method: 'DELETE',
		})
		.then(() => {
			setTodos(todos.filter(todo => todo.id !==id));
		})
		.catch(error => console.log("Error deleting: ", error));
	};

	return (
		<div className="container mt-5">
			<h1 className="text-center">My To Do's</h1>
			<ul className="m-auto">
				<li>
					<input
						type="text"
						placeholder="Add To Do"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={handleKeyPress}
					/>
				</li>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.label}
						<i
							className="fas fa-times text-danger todo-icon"
							onClick={() =>
								deletePost(todo.id)
							}

						></i>
					</li>
				))}
				<div>{contador()}</div>
			</ul>
		</div>
	);
};

export default Home;


