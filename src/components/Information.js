import React from "react";
import { useState } from "react";
import { Form, InputGroup, Row } from "react-bootstrap";

function Information(props) {
  const [form, setForm] = useState({
    first_name: props.personalInformation.first_name,
    last_name: props.personalInformation.last_name,
    phone_number: props.personalInformation.phone_number,
    email: props.personalInformation.email,
    address: props.personalInformation.address,
    city: props.personalInformation.city,
    province: props.personalInformation.province,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitButton = (e) => {
    e.preventDefault();

    if (
      (form.first_name === undefined) |
      (form.last_name === undefined) |
      (form.address === undefined) |
      (form.city === undefined) |
      (form.province === undefined) |
      (form.phone_number === undefined) |
      (form.email === undefined) |
      (form.first_name === "") |
      (form.last_name === "") |
      (form.address === "") |
      (form.city === "") |
      (form.province === "") |
      (form.email === "") |
      (form.phone_number === "")
    ) {
      window.alert("Cannot leave fields empty!");
    } else {
      fetch(`https://scraper.run/email?addr=${form.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.mxvalid) {
            window.alert("Email address is not valid.");
          } else {
            fetch(
              `http://phone-number-api.com/json/?number=${form.phone_number}&fields=numberValid`
            )
              .then((response) => response.json())
              .then((data) => {
                if (!data.numberValid) {
                  window.alert("Phone number is not valid.");
                } else {
                  props.setInformation({
                    first_name: form.first_name,
                    last_name: form.last_name,
                    phone_number: form.phone_number,
                    email: form.email,
                    address: form.address,
                    city: form.city,
                    province: form.province
                  });

                  props.setEditPersonalInformation(false);
                }
              });
          }
        });
    }
  };

  return (
    <div className="container mt-3">
      <h5>Update Personal Information</h5>
      <form className="mt-3 mb-3">
        <Row className="mb-3">
          <Form.Group className="col-auto col-sm-6">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="col-auto col-sm-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="col-auto col-sm-6">
            <Form.Label>Phone Number</Form.Label>
            <InputGroup>
              <Form.Control
                type="tel"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="col-auto col-sm-6">
            <Form.Label>Email Address</Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="col-auto col-sm-6">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="col-auto col-sm-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="col-auto col-sm-3">
            <Form.Label>Province</Form.Label>
            <Form.Control
              type="text"
              name="province"
              value={form.province}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="col-auto col-sm-6">
            <button
              type="submit"
              onClick={submitButton}
              className="me-4 btn btn-success btn-lg btn-block"
            >
              Submit
            </button>
          </Form.Group>
        </Row>
      </form>
    </div>
  );
}

export default Information;
