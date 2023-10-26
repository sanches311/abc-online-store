import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../Routes/routes';
import classes from './Breadcrumbs.module.scss';
const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className={classes.wrapper_breadcrumbs}>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <span key={match.pathname}>
          <NavLink to={match.pathname}>{breadcrumb}</NavLink> <span> / </span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
