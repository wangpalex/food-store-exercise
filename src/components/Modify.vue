<template>
<div>
  <ul>
    <li v-for="(item, index) in datapacket" :key="index">
      {{item.name}}: {{item.count}}
      <input id="index" v-model.lazy="dataCopy[index].count" type="number" placeholder="0" min="0" max="10">
    </li>
    <button @click="updateOrder"> Update Order </button>
  </ul>

  <!-- <button @click="logData()"> log data copy </button> -->
</div>
</template>

<script>
import db from "../firebase"

export default {
  name: "Modify",

  data() {
    return {
      datapacket:[],
      dataCopy:[],
    }
  },

  methods: {
    fetchItems() {
      console.log("$route.params after route: ");
      console.log(this.$route.params);
      const docRef = db.collection('orders').doc(this.$route.params.doc_id);

      docRef.get().then(doc => {
        if(doc.exists) {
          this.datapacket = doc.data().items;

          // Deep copy data
          // this.data = JSON.parse(JSON.stringify(this.datapacket))
          this.datapacket.forEach(item => {
            this.dataCopy.push({name:item.name, count:item.count, price:item.price})
          });
          console.log("Modify page data fetch: ");
          console.log(doc.data().items);
        } else {
          console.log("No such document!");
        }
      });
    },

    updateOrder: function () {
      const docRef = db.collection('orders').doc(this.$route.params.doc_id);

      docRef.update({
        items: this.dataCopy
      }).then(() => { this.$router.push("orders") });
    },

    logData() {
      console.log("datapacket: ");
      console.log(this.datapacket);
      console.log("dataCopy: ");
      console.log(this.dataCopy);
    },

  },

  // Lifecycle hooks
  created() {
    this.fetchItems();
  }
}
</script>

<style scoped>
button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>