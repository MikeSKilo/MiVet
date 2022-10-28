import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "react-bootstrap";
import ApexCharts from "../analytics/ApexCharts";


const VetDashboardCharts = (props) => {
    function ShowChart(chartName, chartData) {
        switch (chartName) {
            case "Appointments":
                return (
                    <ApexCharts
                        options={chartData.appointment.AppointMentsChartOptions}
                        series={chartData.appointment.AppointMentsChartSeries}
                        height={60}
                        type="area"
                    />
                );
            case "NewClient":
                return (
                    <ApexCharts
                        options={chartData.newClient.NewClientChartOptions}
                        series={chartData.newClient.NewClientChartSeries}
                        height={60}
                        type="area"
                    />
                )
            default:
                return chartName + " chart is undefiend";
        }
    }
    const {
        title,
        value,
        summaryValue,
        summaryIcon,
        isSummaryIconShown,
        classValue,
        chartName,
        chartData
    } = props;

    return (
        <Card border="light" className={`${classValue}`}>
            <Card.Body>
                <Row>
                    <Col md={12} lg={12} xl={12} sm={12}>
                        <span className="fw-semi-bold text-uppercase fs-6">{title}</span>
                    </Col>
                    <Col md={6} lg={6} xl={6} sm={6}>
                        <h1 className="fw-bold mt-2 mb-0 h2">{value}</h1>
                        <p
                            className={`text-${summaryIcon === "up" ? "success" : "danger"
                                } fw-semi-bold mb-0`}
                        >
                            {isSummaryIconShown && (
                                <i className={`fe fe-trending-${summaryIcon} me-1`}></i>
                            )}
                            {summaryValue}
                        </p>
                    </Col>
                    <Col
                        md={6}
                        lg={6}
                        xl={6}
                        sm={6}
                        className="d-flex align-items-center"
                    >
                        {ShowChart(chartName, chartData)}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

VetDashboardCharts.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    summaryValue: PropTypes.string.isRequired,
    summaryIcon: PropTypes.string.isRequired,
    isSummaryIconShown: PropTypes.bool.isRequired,
    classValue: PropTypes.string.isRequired,
    chartName: PropTypes.string.isRequired,
    chartData: PropTypes.shape({
        appointment: PropTypes.shape({
            AppointMentsChartOptions: PropTypes.shape({
                chart: PropTypes.shape({
                    height: PropTypes.number.isRequired,
                    type: PropTypes.string.isRequired,
                    toolbar: PropTypes.shape({
                        show: PropTypes.number.isRequired
                    }),
                    sparkline: PropTypes.shape({
                        enabled: PropTypes.number.isRequired,
                    }),
                    grid: PropTypes.shape({
                        show: PropTypes.number.isRequired,
                        padding: PropTypes.shape({
                            left: PropTypes.number.isRequired,
                            right: PropTypes.number.isRequired,
                        })
                    })
                }),
                labels: PropTypes.arrayOf(PropTypes.string).isRequired
            }),
            AppointMentsChartSeries: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    type: PropTypes.string.isRequired,
                    data: PropTypes.arrayOf(PropTypes.number).isRequired
                })
            ).isRequired,
        })
    })
};

export default VetDashboardCharts;
