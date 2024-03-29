import './src/styles/main.sass';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css';

export function wrapPageElement({ element }) {
  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>;
}

export function shouldUpdateScroll() {
  setTimeout(() => window.scrollTo(0, 0), 1400);
  return false;
}
