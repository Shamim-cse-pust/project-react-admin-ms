import React, { useEffect, useState } from 'react';
import Wrapper from "../Wrapper";
import c3 from 'c3';
import axios from 'axios';
import 'c3/c3.css'; // Ensure C3 styles are loaded

const Dashboard = () => {
    const [chart, setChart] = useState(null);

    useEffect(() => {
        // Initialize C3 Chart
        const newChart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [
                    ['x'],
                    ['Sales'],
                ],
                types: {
                    Sales: 'bar'
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d',
                        fit: false, // Prevents forced fitting of ticks
                        rotate: 30, // Rotates the labels for better readability
                        culling: {
                            max: 5 // Limits the number of labels shown to avoid overlap
                        }
                    }
                }
            }
            
        });

        setChart(newChart); // Store chart instance

        // Fetch Data
        const fetchData = async () => {
            try {
                const response = await axios.get('chart');
                const records = response.data.data;

                newChart.load({
                    columns: [
                        ['x', ...records.map(r => r.date)],
                        ['Sales', ...records.map(r => r.sum)]
                    ]
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Wrapper>
            <h2>Daily Sales</h2>
            <div id="chart"/>
        </Wrapper>
    );
};

export default Dashboard;
