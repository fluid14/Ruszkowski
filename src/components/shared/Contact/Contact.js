import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Section from '../Section/Section';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import * as styles from './Contact.module.sass';
import Button from '../../layout/Button/Button';
import { translate } from '../../../utils/translate';

const ContactComponent = ({
  lang,
  slice,
  className,
  data: {
    allPrismicSettings: { nodes: settings },
  },
}) => {
  const {
    form_type: formType,
    form_title: { html: title },
    message_placeholder: { text: messagePlaceholder },
    product: productTitle,
    woodsType,
  } = slice;

  const basic = () => (
    <div className={cx(styles.contactWrap, styles.basic)}>
      <div className={cx(styles.formWrap, 'formWrap')}>
        <form className="contactForm">
          <div className="inputWrap">
            <div className="inputsWrap">
              <input
                type="text"
                placeholder={translate(lang, settings).translation_name.text}
              />
              <input type="email" placeholder="Email" />
            </div>
            <div className="inputsWrap">
              <input
                type="text"
                placeholder={
                  translate(lang, settings).translation_telephone.text
                }
              />
              <input
                type="text"
                placeholder={translate(lang, settings).translation_city.text}
              />
            </div>
            <div className={styles.textareaWrap}>
              <label htmlFor="message" className={styles.label}>
                {translate(lang, settings).translation_your_message.text}
              </label>
              <textarea
                name="message"
                id="message"
                className={styles.textarea}
                placeholder={messagePlaceholder}
              />
            </div>
          </div>
          <Button type="submit" send>
            {translate(lang, settings).translation_send.text}
          </Button>
        </form>
      </div>
    </div>
  );

  const withContactInfo = () => (
    <div className={cx(styles.contactWrap)}>
      <div className={styles.contactInfo}>
        <a
          href={`tel: ${translate(lang, settings).phone_number}`}
          className={styles.phone}
        >
          {translate(lang, settings).phone_number}
        </a>
        <a
          href={`mailto: ${translate(lang, settings).email}`}
          className={styles.email}
        >
          {translate(lang, settings).email}
        </a>
        <p>
          PL. {translate(lang, settings).zip_code}&nbsp;
          {translate(lang, settings).city},
        </p>
        <p>{translate(lang, settings).street},</p>
      </div>

      <div className="formWrap">
        <form className="contactForm">
          <div className="inputWrap">
            <div className="inputsWrap">
              <input
                type="text"
                placeholder={translate(lang, settings).translation_name.text}
              />
              <input type="email" placeholder="Email" />
            </div>
            <div className="inputsWrap">
              <input
                type="text"
                placeholder={
                  translate(lang, settings).translation_telephone.text
                }
              />
              <input
                type="text"
                placeholder={translate(lang, settings).translation_city.text}
              />
            </div>
            <div className={styles.textareaWrap}>
              <label htmlFor="message" className={styles.label}>
                {translate(lang, settings).translation_your_message.text}
              </label>
              <textarea
                name="message"
                id="message"
                className={styles.textarea}
                placeholder={messagePlaceholder}
              />
            </div>
          </div>
          <Button type="submit" send>
            {translate(lang, settings).translation_send.text}
          </Button>
        </form>
      </div>
    </div>
  );

  const product = () => (
    <div className={cx(styles.contactWrap, styles.product)}>
      <div className={cx(styles.formWrap, 'formWrap')}>
        <form className="contactForm">
          <div className={cx(styles.inputWrap, 'inputWrap')}>
            <div className={cx(styles.inputsWrap, 'inputsWrap')}>
              <input type="text" value={productTitle} />
              <select name="woodType" id="woodType">
                <option value="">Rodzaj drewna</option>
                {woodsType.map(({ material_name: materialName }, i) => (
                  <option key={i} value={materialName}>
                    {materialName}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx(styles.inputsWrap, 'inputsWrap')}>
              <input
                type="text"
                placeholder={translate(lang, settings).translation_name.text}
              />
              <input type="email" placeholder="Email" />
            </div>
            <div className={cx(styles.inputsWrap, 'inputsWrap')}>
              <input
                type="text"
                placeholder={
                  translate(lang, settings).translation_telephone.text
                }
              />
              <input
                type="text"
                placeholder={translate(lang, settings).translation_city.text}
              />
            </div>
            <div className={styles.textareaWrap}>
              <label htmlFor="message" className={styles.label}>
                placeholder=
                {translate(lang, settings).translation_your_message.text}
              </label>
              <textarea
                name="message"
                id="message"
                className={styles.textarea}
                placeholder={messagePlaceholder}
              />
            </div>
          </div>
          <Button type="submit" send>
            placeholder={translate(lang, settings).translation_send.text}
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <Section className={className}>
      <SectionTitle center shadowText="kontakt">
        {title}
      </SectionTitle>
      {(() => {
        switch (formType) {
          case 'Z informacjami kontakowymi':
            return withContactInfo();

          case 'Podstawowy':
            return basic();

          case 'product':
            return product();

          default:
            return withContactInfo();
        }
      })()}
    </Section>
  );
};

const Contact = (props) => (
  <StaticQuery
    query={graphql`
      query ContactQuery {
        allPrismicSettings {
          nodes {
            lang
            data {
              translation_send {
                text
              }
              translation_city {
                text
              }
              translation_name {
                text
              }
              translation_surname {
                text
              }
              translation_telephone {
                text
              }
              translation_your_message {
                text
              }
              city
              email
              phone_number
              street
              zip_code
            }
          }
        }
      }
    `}
    render={(data) => <ContactComponent data={data} {...props} />}
  />
);

ContactComponent.propTypes = {
  lang: PropTypes.string.isRequired,
  className: PropTypes.string,
  data: PropTypes.shape({
    allPrismicSettings: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          translation_send: PropTypes.shape({ text: PropTypes.string }),
          translation_city: PropTypes.shape({ text: PropTypes.string }),
          translation_name: PropTypes.shape({ text: PropTypes.string }),
          translation_surname: PropTypes.shape({ text: PropTypes.string }),
          translation_telephone: PropTypes.shape({ text: PropTypes.string }),
          translation_your_message: PropTypes.shape({ text: PropTypes.string }),
          city: PropTypes.string,
          email: PropTypes.string,
          phone_number: PropTypes.string,
          street: PropTypes.string,
          zip_code: PropTypes.string,
        })
      ),
    }),
  }),
  slice: PropTypes.shape({
    woodsType: PropTypes.arrayOf(
      PropTypes.shape({
        material_name: PropTypes.string,
        material_image: PropTypes.shape({
          alt: PropTypes.string,
          fluid: PropTypes.shape,
        }),
      })
    ),
    product: PropTypes.string,
    form_type: PropTypes.string,
    form_title: PropTypes.shape({
      html: PropTypes.string,
    }).isRequired,
    message_placeholder: PropTypes.shape({
      text: PropTypes.string,
    }).isRequired,
  }),
};

ContactComponent.defaultProps = {
  className: '',
  slice: {
    product: null,
    form_type: null,
    form_title: { html: null },
    message_placeholder: { text: null },
  },
};

export default Contact;
