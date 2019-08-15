import React from 'react';
import logoImage from '../assets/images/logo.svg';
import background1 from '../assets/images/background1.png';
import template1 from '../assets/images/template1.png';
import template2 from '../assets/images/template2.jpeg';
import parentIcon from '../assets/images/parent-icon.png';
import teacherIcon from '../assets/images/teacher-icon.png';
import organizationIcon from '../assets/images/organization-icon.png';

export const Logo = props => <img src={logoImage} alt="logo" {...props} />;
export const Background1 = props => <img src={background1} alt="background1" {...props} />;
export const Template1 = props => <img src={template1} alt="template1" {...props} />;
export const Template2 = props => <img src={template2} alt="template2" {...props} />;
export const ParentIcon = props => <img src={parentIcon} alt="parentIcon" {...props} />;
export const TeacherIcon = props => <img src={teacherIcon} alt="teacherIcon" {...props} />;
export const OrganizationIcon = props => (
  <img src={organizationIcon} alt="organizationIcon" {...props} />
);
