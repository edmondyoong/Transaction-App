import React, { useState, useEffect } from "react";
import Transactions from "./Transactions";
import { Form, Button } from "react-bootstrap";
import { nanoid } from "nanoid";
import Information from "./Information";

function Home() {
  const [txns, setTxns] = useState([]);
  const [search, setSearch] = useState();
  const [editPersonalInformation, setEditPersonalInformation] = useState();
  const [personalInformation, setPersonalInformation] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    province: "",
  });

  useEffect(() => {
    let txnList = localStorage.getItem("txns");
    if (txnList) {
      setTxns(JSON.parse(txnList));
    }
    let pInfo = localStorage.getItem("personalInformation");
    if (pInfo) {
      setPersonalInformation(JSON.parse(pInfo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("txns", JSON.stringify(txns));
    localStorage.setItem(
      "personalInformation",
      JSON.stringify(personalInformation)
    );
  });

  function filterList(txn) {
    if ((search === "") | (search === undefined)) {
      return true;
    } else if (txn.isNew) {
      return false;
    } else {
      if (txn.description.includes(search)) {
        return true;
      }
    }
    return false;
  }

  const txnList = txns
    .filter((txn) => filterList(txn))
    .map((txn) => (
      <Transactions
        id={txn.id}
        date={txn.date}
        description={txn.description}
        price={txn.price}
        isNew={txn.isNew}
        updateTxn={(date, description, price) =>
          editTxn(txn.id, date, description, price)
        }
        deleteTxn={(id) => {
          setTxns(txns.filter((txn) => id !== txn.id));
        }}
      />
    ));

  function addTxn() {
    let newTxn = {
      id: nanoid(),
      date: undefined,
      description: undefined,
      price: undefined,
      isNew: true,
    };
    setTxns([...txns, newTxn]);
  }

  function editTxn(id, date, description, price) {
    let editedTxnList = txns.map((txn) => {
      if (id === txn.id) {
        return {
          id: id,
          date: date,
          description: description,
          price: price,
          isNew: false,
        };
      }
      return txn;
    });
    setTxns(editedTxnList);
  }

  const transactionView = (
    <div>
      <div
        className="container mt-3"
        hidden={
          (personalInformation.email === undefined) |
          (personalInformation.email === "")
            ? true
            : false
        }
      >
        <span style={{ fontWeight: "bold" }}>
          {personalInformation.first_name} {personalInformation.last_name}
        </span>
        <br />
        {personalInformation.address}, {personalInformation.city},{" "}
        {personalInformation.province} <br />
        {personalInformation.email} <br />
        {personalInformation.phone_number} <br />
      </div>
      <div className="container mt-3">
        <Form>
          <Form.Group onChange={(e) => setSearch(e.target.value)}>
            <Form.Label>Search: </Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Form>
        <div className="container mt-3">{txnList}</div>
        <Button
          className="mt-3"
          variant="primary"
          onClick={() => {
            addTxn();
          }}
        >
          Add
        </Button>
        <Button
          className="mt-3 ml-1"
          variant="secondary"
          onClick={() => {
            setEditPersonalInformation(true);
          }}
        >
          Change Personal Information
        </Button>
      </div>
    </div>
  );

  const informationView = (
    <Information
      personalInformation={personalInformation}
      setInformation={(data) => setPersonalInformation(data)}
      setEditPersonalInformation={(data) => setEditPersonalInformation(data)}
    />
  );

  return editPersonalInformation ? informationView : transactionView;
}

export default Home;
