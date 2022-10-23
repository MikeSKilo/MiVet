import React, { useEffect , useState } from "react";
import sabioDebug from "sabio-debug";
import serviceProvidedService from "services/serviceProvidedService";
import { useParams } from "react-router-dom";


function ServiceList(props) {
    const _logger = sabioDebug.extend("ServiceList");
    _logger("ServiceList firing", props);
    const id = useParams()
    const [services, setServices] = useState(
        {
            arrayOfServices: [],
            serviceComponent: [],
        }
    );
    useEffect(() => {
        serviceProvidedService
            .getServiceProvidedByPractice(0, 10, id.id)
            .then(getServicesSuccess)
            .catch(getServicesError)

    }, [props])
    const mapper = aService => {
        return (
            <tbody key={`service-lsit${aService.id}`}>
                <tr>
                    <th scope="row">{aService.id}</th>
                    <td>{aService.serviceType.name}</td>
                    <td>{aService.name}</td>
                    <td>{aService.description}</td>
                    <td>{aService.total}</td>
                </tr>
            </tbody>
        )
    }
    const getServicesSuccess = resp => {
        _logger("getServicesSuccess", resp);
        setServices(prevState => {
            return {
                ...prevState,
                arrayOfServices: resp.item.pagedItems,
                serviceComponent: services.arrayOfServices.map(mapper)
            }
        })

    }
    const getServicesError = err => {
        _logger("getServicesError", err);
    }
    return (
        <React.Fragment>
            {services.serviceComponent}
        </React.Fragment>
    )
}

export default ServiceList;