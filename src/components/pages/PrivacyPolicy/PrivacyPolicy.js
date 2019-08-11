import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <section className="home">
      <h4 className="grey darken-4 grey-text text-lighten-4 z-depth-4">Privacy Policy</h4>
      <div className="container">
        <div className="row">
          <div className="col s12 m8 offset-m2 left-align">
            <p>
              This Privacy Policy describes how your personal information is collected, used, and
              shared when you visit or make a purchase from www.insapient.band (the “Site”).
            </p>
            <h5>PERSONAL INFORMATION WE COLLECT</h5>
            <p>
              When you visit the Site, we automatically collect certain information about your
              device, including information about your web browser, IP address, time zone, and some
              of the cookies that are installed on your device. Additionally, as you browse the
              Site, we collect information about the individual web pages or products that you view,
              what websites or search terms referred you to the Site, and information about how you
              interact with the Site. We refer to this automatically-collected information as
              “Device Information.”
            </p>
            <p>We collect Device Information using the following technologies:</p>
            <ul>
              <li>
                “LocalStorage” is used to create a better shopping experience by saving the selected
                items into a “cart”, using Your browser’s storage capabilities. After the purchase
                is complete the items saved in LocalStorage are deleted. Additionaly, by removing
                items from the “cart” you also remove them from your browsers LocalStorage. For more
                information about LocalStorage, visit{' '}
                <a className="external-link" href="https://en.wikipedia.org/wiki/Web_storage">
                  here
                </a>
                .
              </li>
            </ul>
            <p>
              Additionally when you make a purchase or attempt to make a purchase through the Site,
              we collect certain information from you, including your name, email address, phone
              number, shipping address and payment confirmation information received from PayPal
              after the purchase is complete (we do not save or see your payment information like
              credit card numbers etc). We refer to this information as “Order Information.”
            </p>
            <p>
              When we talk about “Personal Information” in this Privacy Policy, we are talking both
              about Device Information and Order Information.
            </p>
            <h5>HOW DO WE USE YOUR PERSONAL INFORMATION?</h5>
            <p>
              We use the Order Information that we collect generally to fulfill any orders placed
              through the Site (including processing your payment information, arranging for
              shipping, and providing you with invoices and/or order confirmations). Additionally,
              we use this Order Information to communicate with you and screen our orders for
              potential risk or fraud. We use the Device Information that we collect to help us
              screen for potential risk and fraud (in particular, your IP address), and more
              generally to improve and optimize our Site (for example, by generating analytics about
              how our customers browse and interact with the Site, and to assess the success of our
              marketing and advertising campaigns).
            </p>
            <h5>SHARING YOUR PERSONAL INFORMATION</h5>
            <p>
              We share your Personal Information with third parties to help us use your Personal
              Information, as described above. For example, we use PayPal to make transactions in
              our online store--you can read more about how PayPal uses your Personal Information{' '}
              <a
                className="external-link"
                href="https://www.paypal.com/il/webapps/mpp/ua/privacy-full"
              >
                here
              </a>
              . We also use Google Analytics to help us understand how our customers use the
              Site--you can read more about how Google uses your Personal Information{' '}
              <a className="external-link" href="https://www.google.com/intl/en/policies/privacy">
                here
              </a>
              . You can also opt-out of Google Analytics{' '}
              <a className="external-link" href="https://tools.google.com/dlpage/gaoptout">
                here
              </a>
              .
            </p>
            <p>
              Finally, we may also share your Personal Information to comply with applicable laws
              and regulations, to respond to a subpoena, search warrant or other lawful request for
              information we receive, or to otherwise protect our rights.
            </p>
            <h5>DO NOT TRACK</h5>
            <p>
              Please note that we do not alter our Site’s data collection and use practices when we
              see a Do Not Track signal from your browser.
            </p>
            <h5>YOUR RIGHTS</h5>
            <p>
              If you are a European resident, you have the right to access personal information we
              hold about you and to ask that your personal information be corrected, updated, or
              deleted. If you would like to exercise this right, please contact us through the
              contact information below.
            </p>
            <p>
              Additionally, if you are a European resident we note that we are processing your
              information in order to fulfill contracts we might have with you (for example if you
              make an order through the Site), or otherwise to pursue our legitimate business
              interests listed above. Additionally, please note that your information will be
              transferred outside of Europe, including to Canada and the United States.
            </p>
            <h5>DATA RETENTION</h5>
            <p>
              When you place an order through the Site, we will maintain your Order Information for
              our records unless and until you ask us to delete this information.
            </p>
            <h5>CHANGES</h5>
            <p>
              We may update this privacy policy from time to time in order to reflect, for example,
              changes to our practices or for other operational, legal or regulatory reasons.
            </p>
            <h5>CONTACT US</h5>
            <p>
              For more information about our privacy practices, if you have questions, or if you
              would like to make a complaint, please contact us by e-mail at
              insapient.band@gmail.com or by mail using the details provided below:
            </p>
            <p>Eliezer Ben Yehuda 24, Rehovot, M, 7630111, Israel</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
