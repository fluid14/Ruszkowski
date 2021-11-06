import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BackgroundImage from 'gatsby-background-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { graphql, Link, useStaticQuery } from 'gatsby';
import * as styles from './Header.module.sass';
import 'swiper/css/bundle';
import PageOrnament from '../../layout/PageOrnament/PageOrnament';
import Button from '../../layout/Button/Button';
import Article from '../../layout/Text/Article/Article';
import { translate } from '../../../utils/translate';

const Header = ({ lang, className, title, bgc, bgcAlt, slides, slider }) => {
  const [currCount, setCurrCount] = useState(1);

  const settings = useStaticQuery(graphql`
    query HeaderQuery {
      allPrismicSettings {
        nodes {
          lang
          data {
            translation_read_more {
              text
            }
          }
        }
      }
    }
  `).allPrismicSettings.nodes;

  return (
    (!slider && (
      <header className={cx(className, styles.header)}>
        <div className={styles.socials}>
          <a className={styles.socialIcon} href="instagram.com" target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a className={styles.socialIcon} href="facebook.com" target="_blank">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </div>
        <div
          className={cx(styles.headerWrap, 'wrap')}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <BackgroundImage
          Tag="section"
          className={styles.bgcImg}
          fluid={bgc}
          alt={bgcAlt}
        />
        <PageOrnament zindex="3" />
      </header>
    )) ||
    (slider && (
      <header className={cx(className, styles.header)}>
        <div className={cx(styles.socials)} />
        <div className={styles.counterWrap}>
          <p className={styles.currCount}>{currCount}</p>
          <p className={styles.allCount}>
            /{' '}
            {slides.length.toString.length < 2
              ? `0${slides.length}`
              : slides.length}
          </p>
        </div>
        <p className={styles.ghostTitle}>Ruszkowski</p>
        <div className={styles.swiperNavigation}>
          <button type="button" className={cx(styles.prev, 'prev')}>
            PREV
          </button>
          <button type="button" className={cx(styles.next, 'next')}>
            NEXT
          </button>
        </div>
        <div className={cx(styles.socials, styles.small)}>
          <p className={styles.socialsTitle}>Meble industrialne</p>
          <a className={styles.socialIcon} href="instagram.com" target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a className={styles.socialIcon} href="facebook.com" target="_blank">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </div>
        <div className={cx(styles.sliderWrap, 'swiperNav', 'headerSwiper')}>
          <Swiper
            direction="horizontal"
            slidesPerView="auto"
            modules={[Navigation]}
            navigation={{
              prevEl: '.prev',
              nextEl: '.next',
            }}
            onTransitionEnd={(swiper) =>
              setCurrCount(
                swiper.realIndex.toString().length < 2
                  ? `0${swiper.realIndex + 1}`
                  : swiper.realIndex + 1
              )
            }
            loop
          >
            {slides.map(
              (
                {
                  image: { alt, fluid },
                  title: { html: slideTitle },
                  description: { html: slideDescription },
                  link: { url: link },
                },
                i
              ) => (
                <SwiperSlide key={i}>
                  <div className={cx(styles.sliderContent, 'wrap')}>
                    <div
                      className={cx(styles.sliderTitle)}
                      dangerouslySetInnerHTML={{ __html: slideTitle }}
                    />
                    <Article className={styles.sliderDescription}>
                      {slideDescription}
                    </Article>
                    <Link to={link}>
                      <Button className={styles.button} onClick={() => {}} send>
                        {translate(lang, settings).translation_read_more.text}
                      </Button>
                    </Link>
                  </div>
                  <BackgroundImage
                    Tag="section"
                    className={styles.img}
                    fluid={fluid}
                    alt={alt}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </header>
    ))
  );
};

Header.propTypes = {
  lang: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  bgc: PropTypes.any,
  bgcAlt: PropTypes.string,
  slider: PropTypes.bool,
  slides: PropTypes.shape,
};

Header.defaultProps = {
  className: '',
  slider: false,
  title: '',
  bgc: null,
  bgcAlt: '',
  slides: null,
};

export default Header;
