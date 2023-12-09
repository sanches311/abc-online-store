import * as React from 'react';
import classes from './Footer.module.scss';
import Logo from '../Logo/Logo';
import FacebookSVG from '../../assets/icons/social_media/facebook.svg';
import LinkedinSVG from '../../assets/icons/social_media/linkedin.svg';
import YoutubeSVG from '../../assets/icons/social_media/youtube.svg';
import InstagramSVG from '../../assets/icons/social_media/instagram.svg';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={classes.layer_3_column}>
        <div>
          <Logo />
          <div>© 2001—2023 by sanches</div>
        </div>
        <ul className={classes.contact}>
          <li>
            <a href="https://www.facebook.com/">
              <FacebookSVG />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/">
              <LinkedinSVG />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/">
              <YoutubeSVG />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <InstagramSVG />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
