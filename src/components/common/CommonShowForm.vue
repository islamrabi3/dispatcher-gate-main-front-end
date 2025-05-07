<script setup lang="ts">
import { setImageUrl, customDateFormat } from '@/utils'

defineProps<{
  data: any
  title: string
}>()

const checkId = (key: any) => {
  return key.includes('Id')
}

const checkKey = (key: any) => {
  return key.includes('url')
}
const checkStatusKey = (key: any) => {
  return key === 'status'
}
const checkDate = (key: any) => {
  return (
    key.includes('createdAt') ||
    key.includes('updatedAt') ||
    key.includes('Date') ||
    key.includes('expiration_date')
  )
}
</script>

<template>
  <v-card flat rounded="lg">
    <v-card-title class="font-weight-bold bg-primary">{{ title }}</v-card-title>
    <v-card-text class="font-weight-bold text-capitalize">
      <div class="ma-0 d-flex flex-wrap">
        <v-col v-for="(value, key) in data" :key="key" cols="6">
          <p class="font-weight-light text-capitalize text-grey pb-1 text-subtitle">
            {{ key }}
          </p>
          <div class="d-flex gap-1 align-center gap-2">
            <a
              v-if="checkKey(key)"
              :href="setImageUrl(value)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-btn exact color="primary" flat rounded="xl"> view </v-btn>
            </a>

            <!-- <div v-else-if="typeof value === 'object'">
              <v-col cols="6" v-for="(childValue, childKey) in value" :key="childKey">
                <p class="font-weight-light text-capitalize text-grey pb-1 text-subtitle">
                  {{ childKey }}
                </p>
                <div class="d-flex gap-1 align-center gap-2">
                  <p class="text-body-1 font-weight-bold">{{ childValue }}</p>
                </div>
              </v-col>
            </div> -->
            <p v-else-if="checkDate(key)" class="text-body-1 font-weight-bold">
              {{ customDateFormat(value) }}
            </p>
            <p v-else-if="checkStatusKey(key)" class="text-body-1 font-weight-bold">
              <v-chip color="primary">{{ value }}</v-chip>
            </p>
            <p v-else class="text-body-1 font-weight-bold">
              {{ value === '' ? '--' : value }}
            </p>
          </div>
          <v-divider class="my-2"></v-divider>
        </v-col>

        <slot name="customCol" />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
