import React from 'react';
import { createRoot } from 'react-dom/client';
import All from './All';
import './App.css';
import './Race.css';
import './Config.css';


const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<All />
	</React.StrictMode>
);