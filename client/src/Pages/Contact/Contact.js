/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import axios from 'axios';
import "./Contact.scss";
import { IoLocationSharp } from "react-icons/io5"
import { CgPhone } from "react-icons/cg"
import { MdEmail } from "react-icons/md"
import HeroImage from "../../Components/Header/HeroImage"
import toastr from "toastr";

const Contact = () => {
  const submitRequest = (e) => {
    e.preventDefault();

    const { contactName, email, message } = e.target.elements

    axios({
      method: "POST",
      url: "http://localhost:5000/api/contact",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        contactName: contactName.value,
        email: email.value,
        message: message.value
      }
    }).then(response => {
      if (response) {
        toastr["success"]("We have received your message and will get back to you as soon as possible!", "Thank you!");
        console.log("Email has been sent");
        e.target.reset();
      } else if (!response) {
        toastr["error"]("There was an issue sending your message to us, please try again later!", "Message not sent!")
        console.log("FAILURE");
      }
    });

    toastr.options = {
      "closeButton": true,
      "debug": true,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-center",
      "preventDuplicates": true,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  };


  return (
    <section className="contactContainer">
      <HeroImage height="15" minHeight="15" maxHeight="25" />
      <div className="contactAllContainer">
        <div className="contactFormContainer">
          <div className="contactUs">
            <div className="contactSideHeader">
              <h1>⎯⎯⎯⎯&nbsp;&nbsp;CONTACT US</h1>
            </div>
          </div>
          <div className="contactHeader">
            <h1>Get in Touch</h1>
            <h2>Any Questions or remarks? Just write us a message!</h2>
          </div>
          <div className="contactAddress">
            <IoLocationSharp className="icon" />
            <h3>10785 Mitte</h3>
            <h3>Berlin, DE</h3>
          </div>
          <div className="contactPhone">
            <CgPhone className="icon" />
            <h3>01575 141 615 </h3>
          </div>
          <div className="contactEmail">
            <MdEmail className="icon" />
            <h3>lorem@ipsum.com</h3>
          </div>
          <div className="contactForm">
            <form onSubmit={submitRequest}>
              <input required id="contactName" placeholder="Name" type="text" />
              <input required id="email" placeholder="Email" type="email" />
              <textarea
                required
                id="message"
                placeholder="Write your message..."
                maxLength="1000"
                rows={4}
                defaultValue={""}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      {/* <iframe
        className="map"
        src="https://www.mapquest.com/embed/germany/berlin-282238303?center=52.51716101425811,13.388900756835938&zoom=12&maptype=map"
      ></iframe> */}
    </section>
  );
};

export default Contact;
