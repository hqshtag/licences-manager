import React from 'react';
import { Provider } from 'react-redux';
import store from './Store';

function App() {
	return (
		<Provider store={store}>
			<h1>This is my react app</h1>
		</Provider>
	);
}

export default App;
