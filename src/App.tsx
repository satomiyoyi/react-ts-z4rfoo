import React from 'react';
import { Routes, Route } from "react-router-dom";
import List from './list';
import Todo from './todoapp';
export default function App() {
  return (
    <Routes>
        <Route index path='/' element={<List />} />
        <Route path="todo" element={<Todo />} />
    </Routes>
  )
}
