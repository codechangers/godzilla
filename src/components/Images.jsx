import React from 'react';
import logoImage from '../assets/images/logo.svg';
import logo from '../assets/images/logoText.svg';
import template2 from '../assets/images/template2.jpeg';

export const Logo = props => <img src={logoImage} alt="logo" {...props} />;
export const LogoText = props => <img src={logo} alt="logoText" {...props} />;
export const Template2 = props => <img src={template2} alt="template2" {...props} />;
