import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { routes } from '../Routes/routes';
import classes from './Breadcrumbs.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { upperFirstLetter } from '../../utils/utils';

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
              {match.route?.breadcrumb === 'Home' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  height="20px"
                  width="20px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              ) : (
                breadcrumb
              )}
            </NavLink>
            {breadcrumbs.length != index + 1 ? <span className={classes.divider}> / </span> : ''}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
