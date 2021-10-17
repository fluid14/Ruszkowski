import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../shared/Section/Section';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import * as styles from './RealizationsList.module.sass';
import ArticleList from '../../Article/ArticleList/ArticleList';

const RealizationsList = ({
  lang,
  data,
  realizations: { totalCount, nodes: realizations },
}) => {
  const {
    primary: {
      realizations_list_title: { html: title },
      investor_title: { text: investor },
      place_title: { text: place },
      scope_title: { text: scope },
    },
  } = data;

  return (
    <Section className={styles.realizationListWrap}>
      <SectionTitle center>{title}</SectionTitle>
      <ArticleList
        lang={lang}
        realizations={realizations}
        titles={{ investor, place, scope }}
        totalCount={totalCount}
      />
    </Section>
  );
};

RealizationsList.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.shape({
    primary: PropTypes.shape({
      realizations_list_title: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }).isRequired,
      investor_title: PropTypes.shape({
        text: PropTypes.string.isRequired,
      }).isRequired,
      place_title: PropTypes.shape({
        text: PropTypes.string.isRequired,
      }).isRequired,
      scope_title: PropTypes.shape({
        text: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  realizations: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
    nodes: PropTypes.shape.isRequired,
  }).isRequired,
};

export default RealizationsList;
