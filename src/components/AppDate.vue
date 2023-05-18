<script setup>
import dayjs from 'dayjs'
import {computed} from 'vue'

const props = defineProps({
  timestamp: {
    required: true,
    type: [Number, Object]
  }
})

const normalizedTimestamp = computed(() => props.timestamp?.seconds || props.timestamp)

const humanReadableDate = computed(() => dayjs.unix(normalizedTimestamp.value).format("DD.MM.YYYY [at] HH:mm"))
</script>

<template>
    <span v-if="timestamp">
        {{ humanReadableDate }}
    </span>
</template>

<style scoped>

</style>