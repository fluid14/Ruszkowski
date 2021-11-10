import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik } from 'formik';
import axios from 'axios';
import Section from '../Section/Section';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import * as styles from './Contact.module.sass';
import Button from '../../layout/Button/Button';
import { translate } from '../../../utils/translate';

const ContactComponent = ({
  lang,
  slice,
  className,
  shadowText,
  sectionTitle,
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

  const sendMessage = (values) => {
    axios({
      method: 'post',
      url: '../../api/contact/index.php',
      headers: { 'content-type': 'application/json' },
      data: { ...values },
    })
      .then((res) => {
        if (res.err) {
          console.log(
            'Przepraszamy. Wystąpił błąd podczas próby wysłania wiadomości.'
          );
        } else {
          console.log(
            'Dziękujemy za wiadomość. Odpowiemy najszybciej jak to będzie możliwe :)'
          );
        }
      })
      .catch(() => {
        console.log(
          'Przepraszamy. Nie udało się wysłać wiadomości. Spróbuj ponownie później.'
        );
      });
  };

  const basic = () => (
    <div className={cx(styles.contactWrap, styles.basic)}>
      <div className={cx(styles.formWrap, 'formWrap')}>
        <Formik
          initialValues={{
            email: '',
            name: '',
            phone: '',
            city: '',
            message: '',
          }}
          onSubmit={(values) => {
            sendMessage(values);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form className="contactForm" onSubmit={handleSubmit}>
              <div className="inputWrap">
                <div className="inputsWrap">
                  <input
                    type="text"
                    placeholder={
                      translate(lang, settings).translation_name.text
                    }
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                  />
                </div>
                <div className="inputsWrap">
                  <input
                    type="text"
                    placeholder={
                      translate(lang, settings).translation_telephone.text
                    }
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    required
                  />
                  <input
                    type="text"
                    placeholder={
                      translate(lang, settings).translation_city.text
                    }
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    required
                  />
                </div>
                <div className={styles.textareaWrap}>
                  <label htmlFor="message" className={styles.label}>
                    {translate(lang, settings).translation_your_message.text}
                  </label>
                  <textarea
                    id="message"
                    className={styles.textarea}
                    placeholder={messagePlaceholder}
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    required
                  />
                </div>
              </div>
              <Button type="submit" send>
                {translate(lang, settings).translation_send.text}
              </Button>
            </form>
          )}
        </Formik>
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
        <Formik
          initialValues={{
            email: '',
            name: '',
            phone: '',
            city: '',
            message: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              className="contactForm"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="inputWrap">
                <div className="inputsWrap">
                  <input
                    type="text"
                    placeholder={
                      translate(lang, settings).translation_name.text
                    }
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                  />
                </div>
                <div className="inputsWrap">
                  <input
                    type="text"
                    name="phone"
                    placeholder={
                      translate(lang, settings).translation_telephone.text
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder={
                      translate(lang, settings).translation_city.text
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    required
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    required
                  />
                </div>
              </div>
              <Button type="submit" send disabled={isSubmitting}>
                {translate(lang, settings).translation_send.text}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );

  const product = () => (
    <div className={cx(styles.contactWrap, styles.product)}>
      <div className={cx(styles.formWrap, 'formWrap')}>
        <Formik
          initialValues={{
            email: '',
            name: '',
            phone: '',
            city: '',
            message: '',
            value: productTitle,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form className="contactForm" onSubmit={handleSubmit}>
              <div className={cx(styles.inputWrap, 'inputWrap')}>
                <div className={cx(styles.inputsWrap, 'inputsWrap')}>
                  <input
                    type="text"
                    name="value"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.value}
                    disabled
                  />
                  <select
                    name="woodType"
                    id="woodType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.woodType}
                    required
                  >
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
                    placeholder={
                      translate(lang, settings).translation_name.text
                    }
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                  />
                </div>
                <div className={cx(styles.inputsWrap, 'inputsWrap')}>
                  <input
                    type="text"
                    placeholder={
                      translate(lang, settings).translation_telephone.text
                    }
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    required
                  />
                  <input
                    type="text"
                    placeholder={
                      translate(lang, settings).translation_city.text
                    }
                    name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    required
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    required
                  />
                </div>
              </div>
              <Button type="submit" send>
                {translate(lang, settings).translation_send.text}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );

  return (
    <Section className={className}>
      <SectionTitle
        className={styles.sectionTitle}
        center
        shadowText={shadowText || slice.shadow_title?.text}
      >
        {sectionTitle ? `<h4>${sectionTitle}</h4>` : title}
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
  shadowText: PropTypes.string,
  sectionTitle: PropTypes.string,
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
  }).isRequired,
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
    }),
    message_placeholder: PropTypes.shape({
      text: PropTypes.string,
    }),
    shadow_title: PropTypes.shape({
      text: PropTypes.string,
    }),
  }),
};

ContactComponent.defaultProps = {
  className: '',
  shadowText: null,
  sectionTitle: null,
  slice: {
    product: null,
    form_type: null,
    form_title: { html: null },
    message_placeholder: { text: null },
  },
};

export default Contact;
