import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from 'layouts/admin';
import UserLayout from 'layouts/user';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import "./index.css"
import { Auth0Provider } from '@auth0/auth0-react';
import Home from "./views/auth/home"
import SignIn from "./views/auth/signIn/index"

// Centralized function to validate and retrieve user
function getUser() {
  
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user || null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
}

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);

    // Redirect if no valid user is found
    if (!storedUser) {
      navigate('/auth/sign-in'); // Redirect to authentication layout
    }
  }, [navigate]);

  console.log('Validated User:', user);

  return (
    <>
      <ToastContainer />
      <Routes>
      {user && user.role ? (
  user.role === 'user' ? (
    <Route path="/*" element={<UserLayout />} />
  ) : user.role === 'superAdmin' ? (
    <Route path="/*" element={<AdminLayout />} />
  ) : user.role === 'admin' ? (
    <Route path="/*" element={<AdminLayout />} />
  ) : null
) : (
  <Route path="/*" element={<AuthLayout />} />
)}
{/* <Route path="/signin" element={<SignIn />} /> */}
      </Routes>
    </>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
          <Auth0Provider
     domain="exportseese.us.auth0.com"
    clientId="EwSmeLfMzt7l0sYcNWlCyMfkKy5ziuOC"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
            <Router>
              <App />
            </Router>
  </Auth0Provider>,
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
