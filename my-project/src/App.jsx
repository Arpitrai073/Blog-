import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';



import Home from './pages/home';
import DataProvider from './context/DataProvider';
import Landing from './pages/landing/landing';
import Header from './pages/header/header';
import CreatePost from './pages/create/CreatePost';
import DetailView from './pages/details/DeatilView';


import Update from './pages/create/Update';

// PrivateRoute to protect authenticated routes
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ?<> <Header /> <Outlet /></>    : <Navigate replace to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
     
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Home isUserAuthenticated={setIsAuthenticated} />} />

          {/* Private route wrapper */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Landing />} />
          </Route>
          <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/create" element={<CreatePost />} />
          </Route>
          <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/details/:id" element={<DetailView />} />
          </Route>

          <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/update/:id" element={<Update />} />
          </Route>


          {/* Fallback route (optional) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
