import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function () {
        return {
            itemCount: {},

            datacollection: {
                labels: [],
                datasets: [
                    {
                        label: "",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#e7a240"],
                        data: []
                    },
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total number of each dish',
                    fontSize: 24
                },
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    yAxes:[{
                        ticks:{ min:0 }
                    }],
                }
            }
        }
    },
    methods: {
        fetchItems: function () {
            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    doc.data().items.forEach(item => {
                        if(!(item.name in this.itemCount)) {
                            this.itemCount[item.name] = Number(item.count)
                        } else {
                            this.itemCount[item.name] += Number(item.count)
                        }
                    })
                })
                console.log("Item count: ")
                console.log(this.itemCount)
                for(let key in this.itemCount) {
                    console.log(key)
                    console.log(this.itemCount[key])
                    this.datacollection.labels.push(key)
                    this.datacollection.datasets[0].data.push(this.itemCount[key])
                    //this.datacollection.datasets[0].backgroundColor.push(this.itemCount[key])
                }

                this.renderChart(this.datacollection, this.options)
            })
        }
    },
    created () {
        this.fetchItems()
    }
}