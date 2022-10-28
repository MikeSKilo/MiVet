import React, { useEffect, useState} from "react";
import { useParams, useLocation } from 'react-router-dom';
import ProfileLayout from "./ProfileLayout";
import sabioDebug from "sabio-debug";
import PropTypes from "prop-types";
import VetDashboardMain from "./VetDashboardMain";
import VetAppointments from "./VetAppointments";
import VetInvoices from "./VetInvoices";
import VetClients from "./VetClients";
import vetProfilesService from '../../vetProfiles/vetProfilesService'
import { toast } from "react-toastify";


function VetDashboard(props) {
	const location = useLocation();	
	const _logger = sabioDebug.extend("VetDashboard");
	_logger("location", location);
    const [userInfo, setUserInfo] = useState();
	_logger("VetDashboard props", props)
    const { id } = useParams();
    const [componentType, setComponentType] = useState();
    const [vetProfile, setVetProfile] = useState(); 

    useEffect(() => {
        
        setUserInfo(props.currentUser)
        _logger("LoggedinUser", userInfo)
        _logger("vetID", id)
        setComponentType('main')
        vetProfilesService
                .getByUserId(props.currentUser.id)
                .then(vetProfileSuccess)
                .catch(vetProfileError)
		
    }, []);

    const vetProfileSuccess = resp => {
        _logger("vetProfileSuccess", resp);
        const item = resp.item.pagedItems[0];
        setVetProfile(prevState => {
            return {
                ...prevState,
                avatar: item.createdBy.userImage,
                name: `${item.createdBy.firstName} ${item.createdBy.lastName}`,
                email: item.businessEmail,
                id: item.createdBy.id,
                verified: 1,
				
            }
        })
		
    };
    const vetProfileError = err => {
        _logger("vetProfileError", err);
        toast.warn("Error on getting the profile")
    };

    const setType = (type) => {
        _logger("setType",type)
        setComponentType(type)
    }
    
    const renderer = (selector) => {
        switch (selector) {
            case 'appointments':
                return <VetAppointments vetId = {id}></VetAppointments>
                
            case 'invoices':
                return <VetInvoices></VetInvoices>
            
            case 'clients':
                return <VetClients></VetClients>
            
            default:
                return <VetDashboardMain />
            
                
        }
    }

    return (<React.Fragment>

        <ProfileLayout vetProfile={vetProfile} setType={setType}>
            {renderer(componentType)}
           

        </ProfileLayout>
    </React.Fragment>)

};

export default VetDashboard;


VetDashboard.propTypes = {
    currentUser: PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        roles: PropTypes.arrayOf(PropTypes.string.isRequired)
    })
}