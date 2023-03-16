import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import ScreenIdentification from "../screen/Identification";
import ScreenDashBoard from "../screen/DashBoard";
import ScreenTables from "../screen/Tables";
import SearchBar from "../Components/SearchBar"

import ScreenUsers from "../screen/Users";
import ScreenSubscriptions from "../screen/Subscriptions";
import ScreenReviews from "../screen/Reviews";
import ScreenLocations from "../screen/Locations";
import ScreenBookings from "../screen/Bookings";
import ScreenAds from "../screen/Ads";

import UserModal from '../Components/modal/UserModal';
import ReviewModal from '../Components/modal/ReviewModal';
import LocationModal from '../Components/modal/LocationModal';
import BookingModal from '../Components/modal/BookingModal';
import AdModal from '../Components/modal/AdModal';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ScreenIdentification/>}/>
                <Route path="/DashBoard" element={<ScreenDashBoard/>}/>
                <Route path="/Tables" element={<ScreenTables/>}/>
                <Route path="/SearchForm" element={<SearchBar/>}/>
                {/* screen */}
                <Route path="/Tables/Users" element={<ScreenUsers/>}/>
                <Route path="/Tables/Subscriptions" element={<ScreenSubscriptions/>}/>
                <Route path="/Tables/Reviews" element={<ScreenReviews/>}/>
                <Route path="/Tables/Locations" element={<ScreenLocations/>}/>
                <Route path="/Tables/Bookings" element={<ScreenBookings/>}/>
                <Route path="/Tables/Ads" element={<ScreenAds/>}/>
                {/* Modals */}
                <Route path="/UserModal" element={<UserModal/>}/>
                <Route path="/ReviewModal" element={<ReviewModal/>}/>
                <Route path="/LocationModal" element={<LocationModal/>}/>
                <Route path="/BookingModal" element={<BookingModal/>}/>
                <Route path="/AdModal" element={<AdModal/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default Router;