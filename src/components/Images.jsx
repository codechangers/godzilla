import React from 'react';
import logoImage from '../assets/images/logo.svg';
import background1 from '../assets/images/background1.png';
import template1 from '../assets/images/template1.png';
import template2 from '../assets/images/template2.jpeg';
import students from '../assets/images/students.jpg';
import logoText from '../assets/images/logoText.svg';

export const Logo = props => <img src={logoImage} alt="logo" {...props} />;
export const LogoText = props => <img src={logoText} alt="logoText" {...props} />;
export const Background1 = props => <img src={background1} alt="background1" {...props} />;
export const Template1 = props => <img src={template1} alt="template1" {...props} />;
export const Template2 = props => <img src={template2} alt="template2" {...props} />;
export const StudentsImage = props => <img src={students} alt="students" {...props} />;
