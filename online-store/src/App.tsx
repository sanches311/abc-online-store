import { useRoutes } from 'react-router-dom';
import { routes } from './components/Routes/routes';

const App = () => {
  const element = useRoutes(routes);
  return element;
};

export default App;
