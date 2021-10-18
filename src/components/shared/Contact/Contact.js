import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Section from '../Section/Section';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import * as styles from './Contact.module.sass';
import Button from '../../layout/Button/Button';

const ContactComponent = ({
  slice,
  className,
  data: {
    prismicSettings: { data },
  },
}) => {
  const {
    city,
    zip_code: zipCode,
    phone_number: phoneNumber,
    street,
    email,
  } = data;

  const {
    form_type: formType,
    form_title: { html: title },
    message_placeholder: { text: messagePlaceholder },
  } = slice;

  const basic = () => (
    <div className={cx(styles.contactWrap, styles.basic)}>
      <div className={cx(styles.formWrap, 'formWrap')}>
        <form className="contactForm">
          <div className="inputWrap">
            <div className="inputsWrap">
              <input type="text" placeholder="Imię" />
              <input type="email" placeholder="Email" />
            </div>
            <div className="inputsWrap">
              <input type="text" placeholder="Telefon" />
              <input type="text" placeholder="Miasto" />
            </div>
            <div className={styles.textareaWrap}>
              <label htmlFor="message" className={styles.label}>
                Twoja wiadomość
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
            Wyślij
          </Button>
        </form>
      </div>
    </div>
  );

  const withContactInfo = () => (
    <div className={cx(styles.contactWrap)}>
      <div className={styles.contactInfo}>
        <a href={`tel: ${phoneNumber}`} className={styles.phone}>
          {phoneNumber}
        </a>
        <a href={`mailto: ${email}`} className={styles.email}>
          {email}
        </a>
        <p>
          PL. {zipCode} {city},
        </p>
        <p>{street},</p>
      </div>

      <div className="formWrap">
        <form className="contactForm">
          <div className="inputWrap">
            <div className="inputsWrap">
              <input type="text" placeholder="Imię" />
              <input type="email" placeholder="Email" />
            </div>
            <div className="inputsWrap">
              <input type="text" placeholder="Telefon" />
              <input type="text" placeholder="Miasto" />
            </div>
            <textarea placeholder="Twoja wiadomość" />
          </div>
          <Button type="submit" send>
            Wyślij
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <Section className={className}>
      <SectionTitle center shadowText="kontakt">
        {title || `<h4>BĄDŹMY <strong>W KONTAKCIE</strong></h4>`}
      </SectionTitle>
      {(() => {
        switch (formType) {
          case 'Z informacjami kontakowymi':
            return withContactInfo();

          case 'Podstawowy':
            return basic();

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
        prismicSettings {
          data {
            city
            email
            phone_number
            street
            zip_code
          }
        }
      }
    `}
    render={(data) => <ContactComponent data={data} {...props} />}
  />
);

ContactComponent.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    prismicSettings: PropTypes.shape({
      data: PropTypes.shape({
        city: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone_number: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        zip_code: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }).isRequired,
  slice: PropTypes.shape({
    form_type: PropTypes.string.isRequired,
    form_title: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
    message_placeholder: PropTypes.shape({
      text: PropTypes.string,
    }).isRequired,
  }),
};

ContactComponent.defaultProps = {
  className: '',
  slice: {
    form_type: null,
    form_title: { html: null },
    message_placeholder: { text: null },
  },
};

export default Contact;
