import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import UserLoginForm from './components/User/UserForm/UserLoginForm/UserLoginForm.tsx';
import UserSignInForm from './components/User/UserForm/UserSignIn/UserSignInForm.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <UserLoginForm />
      <UserSignInForm />
    </BrowserRouter>
  </Provider>
);
