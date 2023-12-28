import React from 'react';
import classes from './Footer.module.scss';
import Logo from '../Logo/Logo';
import SocialNetworkBox from '../SocialNetworkBox/SocialNetworkBox';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={classes.layer_3_column}>
        <div>
          <Logo />
          <div>© 2001—2023 by sanches</div>
        </div>
        <ul className={classes.contact}>
          <SocialNetworkBox />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
