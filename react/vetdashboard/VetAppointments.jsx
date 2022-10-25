import React, { useCallback, useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Card, Row, Col, Table, Modal} from 'react-bootstrap';
import sabioDebug from "sabio-debug";
import Swal from "sweetalert2";
import { FiMoreVertical } from "react-icons/fi";
import withReactContent from "sweetalert2-react-content";
import { formatDateTime } from "utils/dateFormater";
import ProfileLayout from "./ProfileLayout";
import {
    deleteAppointment, getByVetId,
    getByVetIdByMonth, getByVetIdByUpcomingDay
} from "../../../services/appointmentService"
import Appointment from "components/appoinments/Appointment";


const MySwal = withReactContent(
    Swal.mixin({
        customClass: {
            confirmButton: "btn btn-outline-danger m-3",
            cancelButton: "btn btn-outline-warning",
        },
        buttonsStyling: false,
    })
);

function VetAppointments(props) {
    
    const navigate = useNavigate();
    const _logger = sabioDebug.extend("VetDashboard-appointments");
    const [vetAppointments, setVetAppointments] = useState(
        {
            arrayOfAppointments: [],
            appointmentsComponents: [],
        }
    );
    const [filter, setFilter] = useState(0);
    _logger(props);

   
    useEffect(() => {
       
            getByVetId(4)
                .then(getByVetIdSuccess)
                .catch(getByVetIdError)
       
    }, []);

    const onClickAptFilter = e => {
        
        
        _logger("onClickAptFilter", typeof e.target.value);
        const value = parseInt(e.target.value, 10);
        setFilter(value);
        if (value === 6 || value === 2)
        {
            getByVetIdByMonth(4, value)
                .then(getByVetIdSuccess)
                .catch(getByVetIdError)
        }
        else if (value === 7)
        {
            
            getByVetIdByUpcomingDay(4 , value)
                .then(getByVetIdSuccess)
                .catch(getByVetIdError)
        }
        else if (value !==0)
        {
            getByVetId(4)
                .then(getByVetIdSuccess)
                .catch(getByVetIdError)
        }
        
    }

    //#region Appointment-table-Component
    const [modalView, setModalView] = useState({ isOpen: false, data: {} });
    const modalHandleClose = () => {
        setModalView((prevState) => {
            const newView = { ...prevState };
            newView.isOpen = false;
            return newView;
        });
    };
    const modalHandleEdit = () => {
        const stateToTransport = {
            type: "APPOINTMENT_INFO",
            data: { ...modalView.data },
        };
        _logger("STATE =>", stateToTransport);
        navigate(`/appointments/${modalView.data.id.toString()}/edit`, {
            state: stateToTransport,
        });
    };
    const deleteAppointmentOnSuccess = (id) => {
        setVetAppointments((prevState) => {
            const newState = { ...prevState };
            newState.arrayOfAppointments = newState.arrayOfAppointments.filter((element) => element.id !== id);
            newState.appointmentsComponents = newState.arrayOfAppointments.map(aptMapper);
            return newState;
        });

        MySwal.fire("Deleted", "Appointment has been canceled", "success");
    };

    const deleteAppointmentOnError = (error) => {
        _logger(error);
    };

    const dropDownEvents = useCallback((btn, info) => {
    switch (btn) {
      case "cancel":
        MySwal.fire({
          title: "Would you like to cancel this appointment?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            const deleteHandler = deleteAppointmentOnSuccess(info.id);
            deleteAppointment(info.id)
              .then(deleteHandler)
              .catch(deleteAppointmentOnError);
          }
        });
        break;

      case "details":
        setModalView((prevState) => {
          const newView = { ...prevState };
          newView.isOpen = true;
          newView.data = info;
          return newView;
        });

        break;

      case "edit":
        const stateToTransport = { type: "APPOINTMENT_INFO", data: info };
        navigate(`/appointments/${info.id.toString()}/edit`, { state: stateToTransport });
        break;

      default:
        return;
    }
    }, []);
    //#endregion
    
    const aptMapper = anAppointment => {
        _logger("aptMapper", anAppointment)
        return (
            

            <Appointment
                key={anAppointment.id}
                appointment={anAppointment}
                dropDownEvents={dropDownEvents} />
                
           
        )
    }
	const getByVetIdSuccess = resp => {
		_logger("getByVetIdSuccess", resp);
        setVetAppointments(prevState => {
            const pd = { ...prevState };
            pd.arrayOfAppointments = resp.item.pagedItems;
            pd.appointmentsComponents = resp.item.pagedItems.map(aptMapper);

            return pd;
        });
        
	};
	const getByVetIdError = err => {
		_logger("getByVetIdError", err);
        Swal.fire("No appointment Found. change the filter")
        setVetAppointments(prevState => {
            const pd = { ...prevState };
    
            pd.appointmentsComponents = [];

            return pd;
        });
	};

    return (
        <ProfileLayout >
            <Card className="border-0 ">
                <Card.Header>
                    <h3 className="mb-0 h4">Appointments</h3>
                </Card.Header>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col lg={3} md={6} className="pe-md-0 mb-2 mb-lg-0">
                            <select name className="form-select" value={filter} onChange={onClickAptFilter}>
                                <option value={0} className="text-muted">Upcoming Appointments</option>
                                <option value={7} className={"text-dark"} >Upcoming 7 days</option>
                                <option value={2} className={"text-dark"} >Last 2 months</option>
                                <option value={6} className={"text-dark"} >Last 6 months</option>

                            </select>
                        </Col>
                        
                        
                    </Row>
                </Card.Body>
                <Card >
                    <Card.Body className="p-0 pb-4">
                        <div className="table-responsive ">
                            <Table className="text-nowrap">
                                <thead className="table-light " >
                                    <tr className="text-center">
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Vet</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Last Modified</th>
                                        <th scope="col"><FiMoreVertical /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vetAppointments.appointmentsComponents}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>

            </Card>
            <Modal show={modalView.isOpen} onHide={modalHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {formatDateTime(modalView.data.appointmentStart)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <label htmlFor="modal-notes" className="form-label">
                            Notes
                        </label>
                        <textarea
                            id="modal-notes"
                            className="form-control border-0"
                            rows="5"
                            value={modalView?.data?.notes && modalView.data.notes}
                            readOnly
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-light" onClick={modalHandleEdit}>
                        Edit
                    </button>
                    <button className="btn btn-danger" onClick={modalHandleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </ProfileLayout>

    );
}

export default VetAppointments;