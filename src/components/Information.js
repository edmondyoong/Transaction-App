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
    } else { // Replaced email validation API. However, there is no longer a viable phone number validation API not requiring an API key that I could find so it was removed unfortunately. To maintain the same number of APIs used, as previously documented, I switched from validating phone number to address. Address validation uses a global CORS-friendly ArcGIS geocoding endpoint.
      const validateArcGIS = (responseData) => {
        if (!responseData || !Array.isArray(responseData.candidates) || responseData.candidates.length === 0) {
          return false;
        }

        const candidate = responseData.candidates[0];
        return candidate.score >= 80;
      };

      fetch(`https://disify.com/api/email/${form.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.signals) {
            window.alert("Email address is not valid.");
          } else {
            const addressQuery = encodeURIComponent(`${form.address}, ${form.city}, ${form.province}`);
            fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${addressQuery}&f=pjson&maxLocations=1`)
              .then((response) => response.json())
              .then((data) => {
                if (!validateArcGIS(data)) {
                  window.alert("Address is not valid or could not be matched. Please verify the street, city, and province.");
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
