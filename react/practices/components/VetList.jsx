import React ,{ useEffect ,useState  }from "react";
import debug from "sabio-debug";
import {  Image } from "react-bootstrap";
import vetProfilesService from "components/vetProfiles/vetProfilesService";
import { useParams } from "react-router-dom";

function VetList(props) {
  const _logger = debug.extend("VetProfileCard");
    const id = useParams();
    const [vets, setVets] = useState({
        list: [],
        components: [],
    });
    useEffect(() => {
        vetProfilesService
            .getByPracticeId(id.id)
            .then(getVetsSuccess)
            .catch(getVetsError)
    }, [props]);
    const getVetsSuccess = resp => {
        _logger("getVetsSuccess", resp);
        setVets({
            list: resp.item.pagedItems,
           
            components: vets.list.map(mapper)
        }
        )
    };
    const getVetsError = err => {
        _logger("getVetsError", err);
    };
    const renderServices = aService => {
        return <p key={aService.serviceId}>{aService.serviceName}</p>
    };
    const mapper = aProfile => {
        const serviceConpoment = aProfile.services.map(renderServices);
        return (
            
            <tbody key={`service-lsit${aProfile.id}`}>
                <tr>
                    <th scope="row">{aProfile.id}</th>
                    <td >
                        <Image
                            src={aProfile.createdBy.userImage}
                            className="rounded-circle avatar-xl mb-1"
                            alt=""
                        />
                    </td>
                    <td>{aProfile.createdBy.firstName} {aProfile.createdBy.lastName}</td>
                    <td>{aProfile.location.lineOne} {aProfile.location.city} {aProfile.location.state.name} {aProfile.location.zip}</td>
                    <td>{serviceConpoment}</td>
               
                </tr>
            </tbody>
        );
    };
    return (
        <React.Fragment>
            {vets.components}     
       </React.Fragment>
    );
};

export default VetList;
