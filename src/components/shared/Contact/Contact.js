import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import Section from '../Section/Section';
import SectionTitle from '../../layout/Text/SectionTitle/SectionTitle';
import * as styles from './Contact.module.sass';
import Button from '../../layout/Button/Button';

const ContactComponent = ({
  data: {
    prismicPage: { data },
  },
}) => {
  const {
    city,
    zip_code: zipCode,
    phone_number: phoneNumber,
    street,
    email,
  } = data;
  return (
    <Section>
      <SectionTitle center shadowText="kontakt">
        {'<h3>BĄDŹMY w <strong>kontakcie</strong></h3>'}
      </SectionTitle>
      <div className={styles.contactWrap}>
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
            <Button type="submit">Wyślij</Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

const Contact = (props) => (
  <StaticQuery
    query={graphql`
      query ContactQuery {
        prismicPage {
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
  data: PropTypes.shape({
    prismicPage: PropTypes.shape({
      data: PropTypes.shape({
        city: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone_number: PropTypes.string.isRequired,
        street: PropTypes.string.isRequired,
        zip_code: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }).isRequired,
};

export default Contact;
