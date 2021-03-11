<template>
<div>
  <p>Menu: </p>
  <ul>
    <li v-for="item in itemsSelected" :key="item[0]">
      {{item[0]}} x {{item[1]}}
    </li>
  </ul>
  <button @click="displayTotal=true; sendOrder()"> Calculate Total </button>
  <p v-show="displayTotal">
    Subtotal: ${{subtotal}}<br>
    Grandtotal: ${{grandTotal}}
  </p>
</div>
</template>

<script>
import db from '../firebase.js'

export default {
  name: "Basket",
  data() {
    return {
      displayTotal: false,
      itemsList: [],
    }
  },

  props: {
    itemsSelected: {
      type: Array // [name, count, price]
    },
  },

  computed: {
    subtotal: function() {
      let tot = 0;
      for (let order of this.itemsSelected) {
        tot += order[1] * order[2];
      }
      // console.log("Calculate subtotal: ");
      // console.log(tot);
      return Math.round(tot);
    },
    grandTotal: function() {
      if (this.subtotal) {
        let tot = this.subtotal * 1.07;
        return tot.toFixed(2);
      }
      return 0;
    },
  },

  watch: {

  },

  methods: {
    logArray: function() {
      console.log("Items in the Basket: ");
      console.log(this.itemsSelected);
    },
    fetchItems: function () {
      db.collection('menu').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.itemsList.push(doc.data());
        });
      });
    },
    sendOrder: function() {
      var temp = [];
      for(let order of this.itemsSelected) {
        // Convert inner triplets to objects
        temp.push({
          name: order[0],
          count: order[1],
          price: order[2]
        });
      }

      for(let item of this.itemsList) {
        let flag = true;
        for(let order of temp) {
          if(order.name === item.name) {
            flag = false;
            break;
          }
        }
        if(flag) {
          temp.push({name:item.name,count:0,price:item.price});
        }
      }

      db.collection('orders').add({
        items:temp
      }).then(() => {location.reload()});
    },
  },

  created() {
    this.fetchItems();
  }
}
</script>

<style scoped>
button {
  background-color: darksalmon;
  border-color: antiquewhite;
  font-size: 30px;
}

div {
  font-size: 30px;
  font-width: bold;
}
</style>