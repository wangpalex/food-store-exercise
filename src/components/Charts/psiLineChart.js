import { Line } from "vue-chartjs"
import axios from "axios"

export default {
    extends: Line,

    data() {
        return {
            results:[],

            datacollection: {
                labels: [],
                datasets: [
                    {
                        label:'',
                        data: [],
                        fill: false,
                    },
                ]
            },
            options: {
                legend: {
                    display: true,

                },
                title: {
                    display: true,
                    text: 'PSI Twenty Four Hourly (By Region)',
                    fontSize: 24
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },

    methods: {
        fetchItems: function () {
            let colors = ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#e7a240"]
            // Initialize datasets
            for(let i=0; i < 6; i++) {
                this.datacollection.datasets[i] = {label:'', data: [], fill: false, borderColor: colors[i]}
            }
            // Fetch data
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`).then(response => {
                this.results = response.data.items
                console.log(this.results[0])
                this.results.forEach(item => {
                    this.datacollection.labels.push(item.timestamp)
                    let data = item.readings.psi_twenty_four_hourly
                    let keys = Object.keys(data)
                    let vals = Object.values(data) // data values of 6 locations
                    for(let i=0; i < keys.length; i++) {
                        this.datacollection.datasets[i].label = keys[i]
                        this.datacollection.datasets[i].data.push(vals[i])
                    }
                })

                this.renderChart(this.datacollection, this.options)
            })
        }
    },

    created () {
        this.fetchItems()
    }
}