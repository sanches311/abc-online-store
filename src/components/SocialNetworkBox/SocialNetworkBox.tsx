import * as React from 'react';
import classes from './SocialNetworkBox.module.scss';

import { FaInstagram } from 'react-icons/fa';
import { CiYoutube } from 'react-icons/ci';
import { CiFacebook } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import { CiLinkedin } from 'react-icons/ci';

const SocialNetworkBox: React.FC = () => {
  return (
    <>
      <li className={classes.social_network}>
        <a href="https://www.facebook.com/">
          <CiFacebook />
        </a>
      </li>
      <li className={classes.social_network}>
        <a href="https://www.linkedin.com/">
          <CiLinkedin />
        </a>
      </li>
      <li className={classes.social_network}>
        <a href="https://www.youtube.com/">
          <CiYoutube />
        </a>
      </li>
      <li className={classes.social_network}>
        <a href="https://www.instagram.com/">
          <FaInstagram />
        </a>
      </li>
      <li className={classes.social_network}>
        <a href="https://www.github.com/">
          <FaGithub />
        </a>
      </li>
    </>
  );
};

export default SocialNetworkBox;
