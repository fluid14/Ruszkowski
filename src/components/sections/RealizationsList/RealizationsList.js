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
      shadow_title: { text: shadowTitle },
      realizations_list_title: { html: title },
    },
  } = data;

  return (
    <Section className={styles.realizationListWrap}>
      <SectionTitle shadowText={shadowTitle} center>
        {title}
      </SectionTitle>
      <ArticleList
        lang={lang}
        realizations={realizations}
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
        html: PropTypes.string,
      }),
      shadow_title: PropTypes.shape({
        text: PropTypes.string,
      }),
    }),
  }).isRequired,
  realizations: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
    nodes: PropTypes.shape.isRequired,
  }).isRequired,
};

export default RealizationsList;
