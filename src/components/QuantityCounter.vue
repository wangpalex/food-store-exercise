<template>
  <div>
    <button v-on:click="plus"> + </button>
    <span> {{counter}} </span>
    <button @click="minus"> - </button>
  </div>
</template>

<script>
export default {
  name: "QuantityCounter",

  data() {
    return {
      counter:0,
    }
  },

  methods: {
    plus:function() {
      if(this.counter < 10) {
        this.counter++;
      } else {
        alert("You cannot buy more than 10 items.");
      }
      this.$emit('counter', this.item, this.counter)
    },
    minus: function() {
      if(this.counter > 0) {
        this.counter--;
      }
      this.$emit('counter', this.item, this.counter)
    },

  },

  props: {
    item: {
      type:Object,
    }
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