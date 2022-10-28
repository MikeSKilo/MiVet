

export const chartData = {
    totalClient: {
        TotalClientChartOptions: {
            height: 'auto',
            labels: [
                'Jan',
                'Feb',
                'March',
                'April',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
        },
        TotalClientChartSeries: [{
            name: "Current Month",
            data: [10, 20, 15, 25, 18, 28, 22, 32, 24, 34, 26, 38],
        },],

    },
    newClient: {

        NewClientChartOptions: {
            height: 'auto',
  
            xaxis: { tickPlacement: 'on', },
            chart: {
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true | '<img src="/static/icons/reset.png" width="20">',
                        customIcons: []
                    }
                },
            },
            labels: [
                'Jan',
                'Feb',
                'March',
                'April',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
        },
        NewClientChartSeries: [{ data: [4, 6, 5, 3, 5, 6, 8, 9] }],
    },
    appointment: {
				
        AppointMentsChartOptions: {
            chart: {
                height: 60, type: "line",
                toolbar: { show: 0 },
                sparkline: { enabled: 1 },
                grid: { show: 0, padding: { left: 0, right: 0 } },
    
            },
  
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        AppointMentsChartSeries: [{
            name: "Closed",
            type: "column",
            data: [12, 18, 20, 32, 19, 25, 30],
        },
        {
            name: "New",
            type: "line",
            data: [20, 32, 28, 50, 38, 35, 49],
        },],
    }
			
}