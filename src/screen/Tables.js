import React from "react";
import NavBar from "../Components/NavBar.js";

function Tables() {
  return (
    <>
      <NavBar tableActive="Tables" />
      <div className="position">
        <h2>Toutes les tables</h2>
        <hr></hr>

        <div className="positionTables">
          <div className="overflow-x-auto">
            <table className="table mr-3" data-theme="light">
              <thead data-theme="night">
                <tr>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Pseudo</th>
                </tr>

                <tr>
                  <th>Name</th>
                </tr>

                <tr>
                  <th>FirstName</th>
                </tr>

                <tr>
                  <th>StreetName</th>
                </tr>

                <tr>
                  <th>StreetNumber</th>
                </tr>

                <tr>
                  <th>Email</th>
                </tr>

                <tr>
                  <th>Password</th>
                </tr>

                <tr>
                  <th>Phone</th>
                </tr>

                <tr>
                  <th>Picture</th>
                </tr>

                <tr>
                  <th>NbPearls</th>
                </tr>

                <tr>
                  <th>HelpCounter</th>
                </tr>

                <tr>
                  <th>Description</th>
                </tr>

                <tr>
                  <th>IsAdmin</th>
                </tr>

                <tr>
                  <th>ZipCodeLocation</th>
                </tr>

                <tr>
                  <th>CityLocation</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="table mr-3" data-theme="light">
              <thead data-theme="night">
                <tr>
                  <th>Bookings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Id</th>
                </tr>

                <tr>
                  <th>Date</th>
                </tr>

                <tr>
                  <th>State</th>
                </tr>

                <tr>
                  <th>User</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="table mr-3" data-theme="light">
              <thead data-theme="night">
                <tr>
                  <th>Ads</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Id</th>
                </tr>

                <tr>
                  <th>Title</th>
                </tr>

                <tr>
                  <th>Content</th>
                </tr>

                <tr>
                  <th>Date</th>
                </tr>

                <tr>
                  <th>StreetName</th>
                </tr>

                <tr>
                  <th>StreetNumber</th>
                </tr>

                <tr>
                  <th>Picture</th>
                </tr>

                <tr>
                  <th>Author</th>
                </tr>
                <tr>
                  <th>ZipCodeLocation</th>
                </tr>

                <tr>
                  <th>CityLocation</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="table mr-3" data-theme="light">
              <thead data-theme="night">
                <tr>
                  <th>Reviews</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Id</th>
                </tr>

                <tr>
                  <th>Score</th>
                </tr>

                <tr>
                  <th>Comment</th>
                </tr>

                <tr>
                  <th>Date</th>
                </tr>

                <tr>
                  <th>Booking</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="table mr-3" data-theme="light">
              <thead data-theme="night">
                <tr>
                  <th>Locations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>ZipCode</th>
                </tr>

                <tr>
                  <th>City</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="table mr-3" data-theme="light">
              <thead data-theme="night">
                <tr>
                  <th>Subscriptions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>PseudoSubscriber</th>
                </tr>

                <tr>
                  <th>PseudoSubscription</th>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="table mr-3" data-theme="light">
              <thead data-theme="night">
                <tr>
                  <th>Dates</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Id</th>
                </tr>

                <tr>
                  <th>Date</th>
                </tr>

                <tr>
                  <th>Availibility</th>
                </tr>

                <tr>
                  <th>Ad</th>
                </tr>

                <tr>
                  <th>Booking</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tables;
