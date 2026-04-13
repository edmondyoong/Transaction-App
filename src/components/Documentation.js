import React from "react";
import { Link } from "react-router-dom";

function Documentation() {
  return (
    <div className="container mt-5">
      <span style={{ fontWeight: "bold" }}>Transaction App</span> - Simple, easy
      to install app. Keep track of your daily purchases.
      <ul>
        <br />
        <li>Add, edit, delete transactions with a click of a button.</li>
        <li>Search for previous transactions by description.</li>
        <li>
          Personalize your transaction list by optionally including your billing
          address.
        </li>
        <li>
          Can be all managed on the <Link to="/">Home</Link> page.
        </li>
        <br />
        <li>
          Contains 6 components - Documentation, Error, Home, Information,
          NavLinks, Transactions
        </li>
        <li>
          Can navigate between Home, Documentation, and Error using client-side
          routing.
        </li>
        <li>
          Home, Information, and Transactions contain state and passes props.
        </li>
        <li>
          Personal information and transaction data is stored in localStorage to
          persist state across sessions.
        </li>
        <li>
          Personal information is optional. However, this becomes mandatory if
          one desires to start inputting information.
        </li>
        <li>
          Fetch is used to consume 3 different public APIs. These are used to
          convert currencies, to verify validity of the address and the email
          address.
        </li>
      </ul>
    </div>
  );
}

export default Documentation;
