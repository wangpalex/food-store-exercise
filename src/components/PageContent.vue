<template>
<div>
  <ul id="itemsList">
    <li v-for="item in this.itemsList" :key="item.id">
        <p id="itemName">{{item.name}}</p>
        <img v-bind:src="item.imageURL">
        <p id="price">${{item.price}}</p>
        <qtyCtr v-bind:item="item" v-on:counter="onCounter"></qtyCtr>
    </li>
  </ul>
  <basket v-bind:itemsSelected="this.itemsSelected" id="shoppingBasket"></basket>
</div>
</template>

<script>
import QuantityCounter from "@/components/QuantityCounter";
import Basket from "@/components/Basket";
import db from "@/firebase";

export default {
  name: "PageContent",
  //:subtotal="this.subtotal" :grandTotal="this.grandTotal"
  data() {
    return {
      itemsList: [],
      itemsSelected:[], // [name,count,price]
    }
  },

  props: {
    /*
    itemsList: {
      type: Array,
    }
     */
  },

  methods: {
    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in itemsSelected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
        console.log("Push in new item: ");
        console.log(this.itemsSelected);
      } else {
        // Loop through everything to check what is not in the basket
        let len = this.itemsSelected.length;
        let updated = false;
        for (let i = 0; i < len; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          if (item_name === item.name && count > 0) {
            // Update existing item's count
            this.itemsSelected.splice(i, 1, [item.name,count,item.price]);
            // this.$set(this.itemsSelected, i, [item.name,count,item.price])
            updated = true;
            break;
          } else if (item_name === item.name && count === 0) {
            // Delete existing item if count==0
            this.itemsSelected.splice(i,1);
            updated = true;
            break;
          }
        }

        if(!updated && count > 0) {
          // Push new item in.
          this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    },
    fetchItems: function () {
      db.collection('menu').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.itemsList.push(doc.data());
        });
      });
    },
  },

  computed: {

  },

  components: {
    qtyCtr: QuantityCounter,
    basket: Basket,
  },

  // LifeCycle methods
  beforeCreate: function() {

  },
  created() {
    this.fetchItems();
  },
  beforeMount() {

  },
  mounted() {

  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
}
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>