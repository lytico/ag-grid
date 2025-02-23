const data = [
    {
        beverage: 'Coffee',
        Q1: 450,
        Q2: 560,
        Q3: 600,
        Q4: 700
    },
    {
        beverage: 'Tea',
        Q1: 270,
        Q2: 380,
        Q3: 450,
        Q4: 520
    },
    {
        beverage: 'Milk',
        Q1: 180,
        Q2: 170,
        Q3: 190,
        Q4: 200
    },
];

const options = {
    data: data,
    container: document.body,
    title: {
        text: 'Beverage Expenses'
    },
    subtitle: {
        text: 'per quarter'
    },
    theme: {
        baseTheme: 'ag-default-dark',
        overrides: {
            polar: {
                series: {
                    pie: {
                        highlightStyle: {
                            fill: 'cyan',
                            stroke: 'blue',
                            series: {
                                dimOpacity: 0.2
                            }
                        }
                    }
                }
            }
        }
    },
    series: [{
        type: 'pie',
        title: {
            text: 'Q1'
        },
        label: {
            enabled: false,
        },
        angleKey: 'Q1',
        labelKey: 'beverage',
        showInLegend: true,
        outerRadiusOffset: 0,
        innerRadiusOffset: -20
    }, {
        type: 'pie',
        title: {
            text: 'Q2'
        },
        label: {
            enabled: false,
        },
        angleKey: 'Q2',
        labelKey: 'beverage',
        outerRadiusOffset: -40,
        innerRadiusOffset: -60
    }, {
        type: 'pie',
        title: {
            text: 'Q3'
        },
        label: {
            enabled: false,
        },
        angleKey: 'Q3',
        labelKey: 'beverage',
        outerRadiusOffset: -80,
        innerRadiusOffset: -100
    }, {
        type: 'pie',
        title: {
            text: 'Q4'
        },
        label: {
            enabled: false,
        },
        angleKey: 'Q4',
        labelKey: 'beverage',
        outerRadiusOffset: -120,
        innerRadiusOffset: -140
    }]
};

agCharts.AgChart.create(options);