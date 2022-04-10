import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import DetailPage from '../pages/DetailPage'
import MoviesPage from '../pages/MoviesPage'
import NotFoundPage from '../pages/NotFoundPage'
import SearchPage from '../pages/SearchPage'

function Router() {
  return (
    <Routes>
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/movie" element={<MoviesPage/>}/>
            <Route path="/movie/:id" element={<DetailPage/>}/> 
            <Route path="/search" element={<SearchPage/>}/>           
        </Route>
        <Route path="/*" element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default Router