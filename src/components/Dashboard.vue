<template>
<div class="chart">
  <bar-chart></bar-chart>
  <LineChart></LineChart>
</div>
</template>

<script>
import BarChart from "@/components/Charts/BarChart";
import LineChart from "@/components/Charts/psiLineChart";

export default {
  name: "Dashboard",
  components: {
    BarChart,
    LineChart,
  }
}
</script>

<style scoped>

</style>