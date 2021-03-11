<template>
  <div>
    <h1 style="background-color: aquamarine; font-size: 50px; text-align: center">
      Some Food Store
    </h1>
    <!--
    <pgContent :items-list="itemsList"></pgContent>
    -->
    <!--
    <pgContent></pgContent>
    -->
    <div id="navigation">
      <ul>
        <li>
          <!-- Router link to other components -->
          <router-link to="/"> Home </router-link>
        </li>
        <li>
          <router-link to="/orders"> Orders </router-link>
        </li>
        <li>
          <router-link to="dashboard"> Dash </router-link>
        </li>
      </ul>
    </div>

    <!-- Router view will be raplaced with each routed components' view -->
    <router-view></router-view>
  </div>
</template>

<script>
// import PageContent from "@/components/PageContent";
import database from './firebase.js'

export default {
  data() {
    return {
      /*
      itemsList: [
        {
          id: "#000",
          name: "Prawn omelette",
          imageURL:
              "https://3.bp.blogspot.com/-SMxoySoXcK0/T696enjIijI/AAAAAAAACoc/A5bFWd024KY/s1600/IMG_5140.JPG",
          price: 5,
        },
        {
          id: "#025",
          name: "Dry Beef Hor Fun",
          imageURL:
              "https://delishar.com/wp-content/uploads/2016/04/Dry-Beef-Hor-Fun-3.jpg",
          price: 15,
        },
        {
          id: "#067",
          name: "Sambal KangKung",
          imageURL:
              "https://minikitchenlab.com/wp-content/uploads/2017/09/Kangkung-Belacan-e1506580822679-1300x1300.jpg",
          show: false,
          price: 10,
        },
        {
          id: "#077",
          name: "Pork Fried Rice",
          imageURL:
              "https://hazeldiary.com/wp-content/uploads/2020/08/King-of-Fried-Rice-Golden-Mile-Tower-XO-Fried-Rice.jpg",
          show: false,
          price: 6,
        },
        {
          id: "#099",
          name: "Mapo Tofu",
          imageURL:
              "https://i2.wp.com/seonkyounglongest.com/wp-content/uploads/2020/09/Mapo-Tofu-12-minijpg.jpg?fit=1000%2C1500&ssl=1",
          show: false,
          price: 10,
        },
        {
          id: "#200",
          name: "Cereal Prawn",
          imageURL:
              "https://i.pinimg.com/originals/ad/87/eb/ad87eb2113e4d6480a21acdbb5f36114.jpg",
          show: false,
          price: 12,
        },
      ],
       */
    }
  },

  methods: {
    uploadData: function() {
      for (let item of this.itemsList) {
        database.collection('menu').doc(item.id).set({
          imageURL: item.imageURL,
          name: item.name,
          price: item.price,
        });
      }
    }
  },

  components: {
    // pgContent: PageContent,
  }

}
</script>

<style>
#navigation ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#navigation li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>
