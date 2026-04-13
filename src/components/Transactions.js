import React, { useState } from "react";
import { ListGroupItem, Form, Button } from "react-bootstrap";

function Transactions(props) {
  const [isModifying, setModifying] = useState(props.isNew);

  const [txnDateField, setTxnDateField] = useState();
  const [txnDescriptionField, setTxnDescriptionField] = useState();
  const [txnPriceField, setTxnPriceField] = useState();

  const [currencyField, setCurrencyField] = useState("cad");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (txnDateField === undefined) |
      (txnDescriptionField === undefined) |
      (txnPriceField === undefined)
    ) {
      window.alert("Cannot leave fields empty!");
    } else if (new Date() < Date.parse(txnDateField)) {
        window.alert("Date cannot be set in the future!");
    } else {
      if (currencyField !== "cad") {
        fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${txnDateField}/currencies/${currencyField}/cad.json`
        )
          .then((response) => response.json())
          .then((data) => {
            props.updateTxn(
              txnDateField,
              txnDescriptionField,
              (txnPriceField * data.cad).toFixed(2)
            );
            setCurrencyField("cad");
          });
      } else {
        props.updateTxn(txnDateField, txnDescriptionField, txnPriceField);
      }

      setTxnDateField();
      setTxnDescriptionField();
      setTxnPriceField();

      setModifying(false);
    }
  };

  const modifyDetails = (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mt-3 col-auto"
          onChange={(e) => setTxnDateField(e.target.value)}
        >
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter transaction date"
            id={`${props.id}-date-modify`}
          />
        </Form.Group>
        <Form.Group
          className="mt-3 col-auto"
          onChange={(e) => setTxnDescriptionField(e.target.value)}
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter transaction description"
            id={`${props.id}-description-modify`}
          />
        </Form.Group>
        <Form.Group
          className="mt-3 col-audo"
          onChange={(e) => setTxnPriceField(e.target.value)}
        >
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter transaction price"
            step="0.01"
            id={`${props.id}-price-modify`}
          />
        </Form.Group>
        <Form.Group className="mt-1">
          <Form.Check
            inline
            defaultChecked
            type="radio"
            id={`${props.id}-radio-cad`}
            label="CAD"
            name="currency"
            onClick={() => {
              setCurrencyField("cad");
            }}
          />
          <Form.Check
            inline
            type="radio"
            id={`${props.id}-radio-usd`}
            label="USD"
            name="currency"
            onClick={() => {
              setCurrencyField("usd");
            }}
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );

  const viewDetails = (
    <div className="container mt-4">
      <ListGroupItem>
        <div
          className="text-dark"
          style={{ fontWeight: "bold" }}
          id={`${props.id}-date`}
        >
          {props.date}
        </div>
        <div className="text-muted" id={`${props.id}-description`}>
          {props.description}
        </div>
        <div className="text-danger" id={`${props.id}-price`}>
          C$ {props.price}
        </div>
        <Button
          className="mt-2"
          variant="primary"
          onClick={() => {
            setModifying(true);
          }}
        >
          Edit
        </Button>
        <Button
          className="mt-2"
          variant="danger"
          onClick={() => {
            props.deleteTxn(props.id);
          }}
        >
          Delete
        </Button>
      </ListGroupItem>
    </div>
  );

  return isModifying ? modifyDetails : viewDetails;
}

export default Transactions;
