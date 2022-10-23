import React, { useState, useEffect } from "react";
import { Card, Tab ,Nav, Col, Row, Table} from "react-bootstrap";
import { useLocation , useNavigate , useParams} from "react-router-dom";
import VetList from "./components/VetList";
import vetProfilesService from "components/vetProfiles/vetProfilesService";
import sabioDebug from "sabio-debug";
import practiceService from "services/practiceService";
import PracticeMap from "./components/PracticeMap";
import ServiceList from "./components/ServiceList";

function Practice(props) {
    const _logger = sabioDebug.extend("Practices Practice");
    const location = useLocation();
    const id = useParams()
    const navigate = useNavigate();
    const [state, setState] = useState( {
        name: "",
        location: { lineOne: "", lineTwo: "", city: "" },
        phone: "",
        fax: "",
        description: "",
        primaryImage: [{ url: "", }],
        siteUrl: "",
        businessEmail:"",
    });
    const [vets, setVets] = useState({
        list: [],
        components: []
    });
    const [center, setCenter] = useState(
        {
            lat: 0,
            lng: 0
        } ,
    )
    const [name, setName] = useState();
    useEffect(() => {
        vetProfilesService
            .getByPracticeId(state.id||id.id)
            .then(getVetsSuccess)
            .catch(getVetsError)
    }, [props])
    useEffect(() => {
        
        practiceService.getById(id.id)
            .then(getPracticeSuccess)
            .catch(getPracticeError)

    }, [])
    const getPracticeSuccess = resp => {
        _logger("getPracticeSuccess", resp);
        setState(resp.item);
        setCenter({
            lat: resp.item.location.latitude,
            lng: resp.item.location.longitude
        })
        setName(resp.item.name)
    };
    const getPracticeError = err => {
        _logger("getPracticeError", err);
        
    };
   
    const mapper= aProfile => {
        return (
            
            <VetList
                key={"vet-list-id" + aProfile.id}
                profile={aProfile}
                
            />
            
        );
        
    };
    
    const getVetsSuccess = resp => {
        _logger("getVetsSuccess", resp);
        setVets({
            list: resp.item.pagedItems,
           
            components: vets.list.map(mapper)
        }
        )
    }
    const getVetsError = err => {
        _logger("getVetsError",err);
    }

    useEffect(() => {
        if (location.state) {
            _logger("use Effect firing")
            setCenter({
                lat: state.location.latitude,
                lng: state.location.longitude
            });
            setName(state.name);
        }
    }, [])
    const onClickGoBack = () => {
        
        navigate("/practices")
    }
    
    return (<React.Fragment>
        <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-secondary">
            
            <div className="container">
                
                <div className="col xl-7 lg-7 md-12 sm-12">
                    <div>
                        <div className="d-md-flex align-items-center justify-content-between">
                            <h1 className="text-white display-4 fw-semi-bold">{state.name}</h1>
                            <button className="practice-btn btn btn-primary practice-btn-primary mb-2" onClick={onClickGoBack}>Go back</button>
                        </div>
                        
                        <h2 className="text-white mb-2 lead"> {state.location.lineOne} {state.location.lineTwo}</h2>
                        <h2 className="text-white mb-3 lead">{state.location.city}</h2>
                        <h3 className="text-white mb-3 lead">Phone: {state.phone} Fax: {state.fax}</h3>
                    </div>
                </div>
            </div>
        </div>
        {/* page content */}
        <div className="pb-10">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12 mt-n8 mb-4 mb-lg-0">
                        <Tab.Container defaultActiveKey={"description"}>
                            <Card>
                                <Nav className="nav-lb-tab">
                                    {['Description', 'Location', 'Vets', 'Services',]
                                        .map((item, index) => (
                                            <Nav.Item key={index}>
                                                <Nav.Link
                                                    // href={`#${item.toLowerCase()}`}
                                                    eventKey={item.toLowerCase()}
                                                    className="mb-sm-3 mb-md-0"
                                                >{item}
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))}
                                </Nav>
                                <Card.Body className="p-0">
                                    <Tab.Content>
                                        <Tab.Pane eventKey={"description"} className="pb-4 pt-3 px-4" >
                                            {/* Description s */}
                                            <Card className="border-0">
                                                <Card.Header>
                                                    <div className="mb-3 mb-lg-0">
                                                        <h3 className="mb-0">Description</h3>
                                                        <p className="mb-0">
                                                            {state.name}
                                                        </p>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    {state.description}

                                                </Card.Body>
                                            </Card>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="location" className="pb-4 p-4">
                                            {/* location */}
                                            <Card className="border-0">
                                                <Card.Header>
                                                    <div className="mb-3 mb-lg-0">
                                                        <h3 className="mb-0">Location</h3>
                                                        <p className="mb-0">
                                                            Map of {state.name}
                                                        </p>
                                                    </div>
                                                </Card.Header>
                                                <PracticeMap latlng={center} name={name}></PracticeMap>
                                            </Card>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="vets" className="pb-4 p-4">
                                            {/* vet profiles */}
                                            <Card className="border-0">
                                                <Card.Header>
                                                    <div className="mb-3 mb-lg-0">
                                                        <h3 className="mb-0">Veterinarians</h3>
                                                        <p className="mb-0">
                                                            List of Vets at {state.name}
                                                        </p>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body className="p-0 pb-5">
                                                    <Row>
                                                        <Col lg={12} md={12} sm={12}>
                                                            <div className="table-responsive ">
                                                                <Table className="text-wrap">
                                                                    <thead className="table-light">
                                                                        <tr>
                                                                            <th scope="col">Id</th>
                                                                            <th scope="col">Picture</th>
                                                                            <th scope="col">Name</th>
                                                                            <th scope="col">Address</th>
                                                                            <th scope="col">Services</th>
                                                                            
                                                                        </tr>
                                                                    </thead>
                                                                    <VetList></VetList>
                                                                </Table>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="services" className="pb-4 p-4">
                                            {/* Services */}
                                            <Card className="border-0">
                                                <Card.Header>
                                                    <div className="mb-3 mb-lg-0">
                                                        <h3 className="mb-0">Services</h3>
                                                        <p className="mb-0">
                                                            Services provided at {state.name}.
                                                        </p>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body className="p-0 pb-5">
                                                    <Row>
                                                        <Col lg={12} md={12} sm={12}>
                                                            <div className="table-responsive ">
                                                                <Table className="text-wrap">
                                                                    <thead className="table-light">
                                                                        <tr>
                                                                            <th scope="col">Id</th>
                                                                            <th scope="col">Type</th>
                                                                            <th scope="col">Name</th>
                                                                            <th scope="col">Description</th>
                                                                            <th scope="col">Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <ServiceList></ServiceList>
                                                                </Table>
                                                            </div>
                                                        </Col>
                                                    </Row>
                    
                                                </Card.Body>
                                            </Card>
                            
                                        </Tab.Pane>
                                    </Tab.Content>

                                </Card.Body>
                            </Card>
                        </Tab.Container>
                    </div>
                    <Col lg={4} md={12} sm={12} className="mt-lg-n22">
                        {/* Card */}
                        <Card className="mb-3 mb-4">
                            <div className="single-practice-img d-flex justify-content-center position-relative rounded border-white border rounded-3 bg-cover">
                                <Card.Img
                                    variant="top"
                                    src={state.primaryImage[0].url}
                                />
                            </div>
                            {/* Card body */}
                            <Card.Body>
                                <div className="mb-3">
                                    <p className="mb-0">Email : </p>
                                    <span className="text-dark fw-bold h6 me-2">{state.businessEmail}</span>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-0">Webstie :</p>
                                    <span className="text-dark fw-bold h6 me-2">{state.siteUrl}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </div>
        </div>
        

    </React.Fragment>)
}
export default Practice