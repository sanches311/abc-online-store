import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import UserLoginForm from './components/User/UserForm/UserLoginForm/UserLoginForm.tsx';
import UserSignInForm from './components/User/UserForm/UserSignIn/UserSignInForm.tsx';
import { SnackbarProvider } from 'notistack';
import BagShoppingModal from './components/BagShopping/BagShoppingModal/BagShoppingModal.tsx';
import '../styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <UserLoginForm />
        <UserSignInForm />
        <BagShoppingModal />
      </BrowserRouter>
    </Provider>
  </SnackbarProvider>
);
