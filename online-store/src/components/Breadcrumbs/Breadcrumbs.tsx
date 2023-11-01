import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../Routes/routes';
import classes from './Breadcrumbs.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { upperFirstLetter } from '../../utils/utils';
import HomeSvg from '../../assets/icons/home.svg';

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);
  const category = useAppSelector((state) => {
    if (state.app.currentProduct.length > 0) return state.app.currentProduct[0].category;
  });
  return (
    <div className={classes.wrapper_breadcrumbs}>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <span key={match.pathname}>
          {category && match.pattern.path == '/products/:id' ? (
            <span>
              <NavLink to={category}>{upperFirstLetter(category)}</NavLink>
              <span className={classes.divider}> / </span>
            </span>
          ) : (
            ''
          )}
          <span>
            <NavLink to={match.pathname}>
              {match.route?.breadcrumb === 'Home' ? <HomeSvg /> : breadcrumb}
            </NavLink>
            {breadcrumbs.length != index + 1 ? <span className={classes.divider}> / </span> : ''}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
