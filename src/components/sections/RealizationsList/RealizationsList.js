import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../shared/Section/Section';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import * as styles from './RealizationsList.module.sass';
import ArticleList from '../../Article/ArticleList/ArticleList';

const RealizationsList = ({
  data,
  realizations: { totalCount, nodes: realizations },
}) => {
  const {
    primary: {
      realizations_list_title: { html: title },
    },
  } = data;

  return (
    <Section className={styles.realizationListWrap}>
      <SectionTitle center>{title}</SectionTitle>
      <ArticleList realizations={realizations} totalCount={totalCount} />
    </Section>
  );
};

RealizationsList.propTypes = {
  data: PropTypes.shape({
    primary: PropTypes.shape({
      realizations_list_title: PropTypes.shape({
        html: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  realizations: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
    nodes: PropTypes.shape.isRequired,
  }).isRequired,
};

export default RealizationsList;
