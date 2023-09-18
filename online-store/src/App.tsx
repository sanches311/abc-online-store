import React from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import HomePage from "./components/Pages/HomePage/HomePage"

const  App: React.FC = () => {
  return (
    <>
<Routes>
  <Route path='/' element={<Layout/>}>
    <Route index element={<HomePage />} />
  </Route>
</Routes>
    </>
  )
}

export default App
