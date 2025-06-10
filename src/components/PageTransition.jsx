// components/PageTransition.jsx
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import '../styles/componentStyles/PageTransition.css'; // подключи стили анимации

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <div className="page-wrapper">{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
