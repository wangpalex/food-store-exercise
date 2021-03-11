<template>
<div>
  <ul>
    <li v-for="order in this.orders" :key="order.id">
      <!-- <pre>{{orderString(order.items)}}</pre> -->
      <p v-for="item in order.items" :key="item.name">
        {{item.name}}: {{item.count}}
      </p>
      
      <button v-bind:orderId="order.id"
              @click="logOrders(); deleteOrder($event)">
        Delete </button>

      <button v-bind:orderId="order.id"
              @click="route($event)"> Modify </button>
    </li>
  </ul>
</div>
</template>

<script>
import db from "../firebase"

export default {
  name: "Orders",

  data() {
    return {
      orders: [],
      allItems:[],
    }
  },

  methods: {
    fetchOrders: function() {
      db.collection('orders').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log("Loaded order Information: ");
          console.log([doc.id, doc.data().items]);
          this.orders.push({id:doc.id, items:doc.data().items});
        });
      });

      console.log(this.orders);
    },
    logOrders: function() {
      console.log("this.orders: ");
      console.log(this.orders);
    },
    orderString: function(order) {
      let s = ""
      for(let item of order) {
        s += item.name + ": " + item.count + "\n"
      }
      return s
    },
    deleteOrder: function(event) {
      let docRef = db.collection('orders').doc(event.target.getAttribute('orderId'));
      docRef.delete().then(()=>{location.reload()});
    },
    route(event) {
      let doc_id = event.target.getAttribute('orderId');
      console.log("doc_id before route:");
      console.log(doc_id);
      this.$router.push({name:"modify", params: {doc_id: doc_id}});
    }
  },


  // LifeCycle hooks
  created() {
    this.fetchOrders();
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>