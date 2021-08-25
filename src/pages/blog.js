import React from 'react';
import Theme from '../theme/Theme';
import Header from '../components/shared/Header/Header';
import headerImg from '../../static/images/blog/header.png';

const Blog = () => (
  <>
    <Theme>
      {/* <Header */}
      {/*  title={['Realizacje', <br />, <span>Indywidualne</span>]} */}
      {/*  bgc={headerImg} */}
      {/* /> */}
      <Header title="Blog" bgc={headerImg} />
    </Theme>
  </>
);

export default Blog;
