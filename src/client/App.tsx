import * as React from 'react';
import {Quiz} from './Quiz'
import "./App.css"
export const App = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>10 questions Quiz</h1>        
        <Quiz/>
    </div>
);
