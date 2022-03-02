import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Signin from './components/pages/Signin'
import Signup from './components/pages/Signup'


import Confirm from './components/pages/Confirm'
import ForgetPassword from './components/pages/ForgetPassword'
import ResetPassword from './components/pages/ResetPassword'
import AdminDashboard from './components/pages/AdminDashboard'
import AddCategory from './components/admin/category/AddCategory'
import UserDashboard from './components/pages/UserDashboard'
import AdminRoute from './components/auth/AdminRoute'
import PrivateRoute from './components/auth/PrivateRoute'
import AddProperty from './components/admin/Property/AddProperty'
import Allproperty from './components/admin/Property/AllProperty'
import Allcategory from './components/admin/category/AllCategory'
import Allusers from './components/admin/AllUsers'
import EditCategory from './components/admin/category/EditCategory'
import AllcategorySuccess from './components/admin/category/AllCategorySuccess'
import AllcategoryDeleteSuccess from './components/admin/category/AllCategoryDeleteSuccess'
import DeleteCategory from './components/admin/category/DeleteCategory'
import AddSuccess from './components/admin/Property/AddSuccess'
import AllPropertyUpdateSuccess from './components/admin/Property/AllPropertyUpdateSuccess'
import AllPropertyDeleteSuccess from './components/admin/Property/AllPropertyDeleteSuccess'
import DeleteProperty from './components/admin/Property/DeleteProperty'
import EditProperty from './components/admin/Property/EditProperty'
import Recent from './components/pages/Recent'
import Buy from './components/pages/Buy'
import Rent from './components/pages/Rent'
import Blogs from './components/pages/Blogs'
import Contact from './components/pages/Contact'
import About from './components/pages/About'
import House from './components/pages/House'
import Land from './components/pages/Land'
import PropertyDetails from './components/pages/PropertyDetails'
import UAddProperty from './components/user/UAddProperty'
import BookNow from './components/pages/BookNow'
import SeekConsultation from './components/pages/SeekConsultation'
import Homesuccess from './components/pages/Homesuccess'
import MessageSentSuccess from './components/pages/MessageSentSuccess'

import UserDashboardAddSuccess from './components/user/UserDashboardAddSuccess'
import UserDashboardUpdateSuccess from './components/user/UserDashboardUpdateSuccess'
import UserDashboardDeleteSuccess from './components/user/UserDashboardDeleteSuccess'

import MyListings from './components/user/MyListings'
import MyBookings from './components/user/MyBookings'

import UEditProperty from './components/user/UEditProperty'
import UDeleteProperty from './components/user/UDeleteProperty'

import BookingSuccess from './components/pages/BookingSuccess'
import DeleteBooking from './components/user/DeleteBooking'
import UserBookingDeleteSuccess from './components/user/UserBookingDeleteSuccess'
import ViewBooking from './components/user/ViewBooking'
import MyConsultations from './components/user/MyConsultations'
import ViewConsultations from './components/user/ViewConsultation'
import DeleteConsultation from './components/user/DeleteConsultation'
import ConsultationDeleteSuccess from './components/user/DeleteConsultationSuccess'
import ContractsUpdateSuccess from './components/admin/ContractsUpdateSuccess'
import Contracts from './components/admin/Contracts'
import Contract from './components/admin/Contract'
import ContractTerminate from './components/admin/ContractTerminate'
import ContractsTerminatedSuccess from './components/admin/ContractsTerminatedSuccess'
import Consult from './components/pages/Consult'
import Consultations from './components/admin/Consultations'
import Consultation from './components/admin/Consultation'
import ConsultationTerminate from './components/admin/ConsultationsTerminate'
import ConsultationsTerminatedSuccess from './components/admin/ConsultationsTerminatedSuccess'
import ConsultationsUpdateSuccess from './components/admin/ConsultationsUpdateSuccess'
import Allmessage from './components/admin/category/Allmessage'
import MessageDetail from './components/admin/category/MessageDetail'
import UserDetails from './components/admin/UserDetails'


const Routes = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/homesuccess" component={Homesuccess} />


                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/email/confirmation/:token" component={Confirm} />
                    <Route exact path="/forgotpassword" component={ForgetPassword} />
                    <Route exact path="/user/resetpassword/:token" component={ResetPassword} />
                    <Route exact path="/recent" component={Recent}/>
                    <Route exact path="/buy" component={Buy}/>
                    <Route exact path="/lease" component={Rent}/>
                    <Route exact path="/BUILDINGS" component={House}/>

                    <Route exact path="/contractcomplete" component={BookingSuccess}/>
                    <Route exact path="/LANDS" component={Land}/>

                    <Route exact path="/propertydetails/:id" component={PropertyDetails}/>

                    <Route exact path="/blogs" component={Blogs}/>
                    <Route exact path="/contact" component={Contact}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/messageSent" component={MessageSentSuccess}/>

                    
                    
                    
                    

                  
                    {/* admin  */}
                    <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                    <AdminRoute exact path="/admin/dashboard/addSuccess" component={AddSuccess} />
                    
                    <AdminRoute exact path="/admin/addcategory" component={AddCategory} />
                    <AdminRoute exact path="/admin/addproperty" component={AddProperty} />
                    <AdminRoute exact path="/admin/allproperty" component={Allproperty} />
                    <AdminRoute exact path="/admin/allcategory" component={Allcategory} />
                    <AdminRoute exact path="/admin/allcategory/updateSuccess" component={AllcategorySuccess} />
                    <AdminRoute exact path="/admin/allcategory/deleteSuccess" component={AllcategoryDeleteSuccess} />
                    <AdminRoute exact path="/category/delete/:token" component={DeleteCategory}/>
                    <AdminRoute exact path="/admin/allusers" component={Allusers}/>
                    <AdminRoute exact path="/category/edit/:token" component={EditCategory}/>

                    <AdminRoute exact path="/admin/inbox" component={Allmessage}/>

                    <AdminRoute exact path="/admin/property/updateSuccess" component={AllPropertyUpdateSuccess}/>
                    <AdminRoute exact path="/admin/property/deleteSuccess" component={AllPropertyDeleteSuccess}/>
                    <AdminRoute exact path="/admin/property/update/:token" component={EditProperty}/>
                    <AdminRoute exact path="/admin/property/delete/:token" component={DeleteProperty}/>

                    <AdminRoute exact path="/admin/contracts" component={Contracts}/>
                    <AdminRoute exact path="/admin/contract/view/:id" component={Contract}/>
                    <AdminRoute exact path="/admin/contract/delete/:id" component={ContractTerminate}/>
                    <AdminRoute exact path="/admin/contract/terminated" component={ContractsTerminatedSuccess}/>
                    <AdminRoute exact path="/admin/contract/updated" component={ContractsUpdateSuccess}/>

                    <AdminRoute exact path="/admin/consultations" component={Consultations}/>
                    <AdminRoute exact path="/admin/consultation/view/:id" component={Consultation}/>
                    <AdminRoute exact path="/admin/consultation/delete/:id" component={ConsultationTerminate}/>
                    <AdminRoute exact path="/admin/consultation/terminated" component={ConsultationsTerminatedSuccess}/>
                    <AdminRoute exact path="/admin/consultation/updated" component={ConsultationsUpdateSuccess}/>

                    <AdminRoute exact path="/admin/message/detail/:id" component={MessageDetail}/>
                    <AdminRoute exact path="/admin/user/:id" component={UserDetails}/>
                    {/* user  */}
                    <PrivateRoute exact path="/user/profile" component={UserDashboard} />
                    <PrivateRoute exact path="/user/profile/addsuccess" component={UserDashboardAddSuccess} />
                    <PrivateRoute exact path="/user/property/add" component={UAddProperty}/>
                    <PrivateRoute exact path="/contract/:id" component={BookNow}/>
                    <PrivateRoute exact path="/seekconsultation/:id" component={SeekConsultation}/>
                    <PrivateRoute exact path="/user/mylistings" component={MyListings}/>
                    <PrivateRoute exact path="/user/contracts" component={MyBookings}/>
                    <PrivateRoute exact path="/consultationRequested" component={Consult}/>

                    <PrivateRoute exact path="/user/property/update/:token" component={UEditProperty}/>
                    <PrivateRoute exact path="/user/property/updateSuccess" component={UserDashboardUpdateSuccess}/>
                    <PrivateRoute exact path="/user/property/delete/:token" component={UDeleteProperty}/>
                    <PrivateRoute exact path="/user/property/deleteSuccess" component={UserDashboardDeleteSuccess}/>
                    <PrivateRoute exact path="/user/contract/delete/:id" component={DeleteBooking}/>
                    <PrivateRoute exact path="/user/contract/deleteSuccess" component={UserBookingDeleteSuccess}/>
                    <PrivateRoute exact path="/user/contract/details/:id" component={ViewBooking}/>
                    <PrivateRoute exact path="/user/consultations" component={MyConsultations}/>
                    <PrivateRoute exact path="/user/consultation/details/:id" component={ViewConsultations}/>
                    <PrivateRoute exact path="/user/consultation/delete/:id" component={DeleteConsultation}/>
                    <PrivateRoute exact path="/user/consultation/deleteSuccess" component={ConsultationDeleteSuccess}/>
                    

                </Switch>
            </Router>
        </>
    )
}

export default Routes
