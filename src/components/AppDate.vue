<script setup>
import dayjs from "dayjs";

const props = defineProps({
  timestamp: {
    required: true,
    type: Number
  }
})

const humanReadableDate = () => {
  return dayjs.unix(props.timestamp).format("DD.MM.YYYY [at] HH:mm")
}
</script>

<template>
    <span>
        {{ humanReadableDate() }}
    </span>
</template>

<style scoped>

</style>