<script setup lang="ts">
import { setImageUrl, customDateFormat } from '@/utils'

// Define props
const props = defineProps<{
  data: Record<string, any>
  title: string
}>()

// Key formatting utility
const formatKey = (key: any): string => {
  if (typeof key !== 'string') return String(key)
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
    .replace(/_/g, ' ')         // Replace underscores with spaces
    .trim()
    .toLowerCase()
}

// Check key types
const checkId = (key: string) => key.includes('Id')
const checkKey = (key: string) => key.includes('url')
const checkStatusKey = (key: string) => key === 'status'
const checkDate = (key: string) =>
  ['createdAt', 'updatedAt', 'expiration_date'].some(k => key.includes(k)) || key.includes('Date')
</script>

<template>
  <v-card flat rounded="lg" class="border-0">
    <v-card-title v-if="props.title" class="font-weight-bold bg-primary py-4 px-6">
      {{ props.title }}
    </v-card-title>

    <v-card-text class="font-weight-bold text-capitalize pa-4">
      <v-row class="ma-0 d-flex flex-wrap">
        <v-col
          v-for="(value, key) in props.data"
          :key="key"
          cols="12"
          md="6"
          class="py-2"
        >
          <div class="pa-3 rounded-lg bg-grey-lighten-5 h-100">
            <p class="text-capitalize text-grey-darken-1 pb-2 text-subtitle-2 font-weight-medium">
              {{ formatKey(key) }}
            </p>

            <div class="d-flex align-center gap-2">
              <!-- Image URL View Button -->
              <a
                v-if="checkKey(key)"
                :href="setImageUrl(value)"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none"
              >
                <v-btn color="primary" variant="elevated" rounded="pill" size="small">
                  <v-icon start icon="mdi-eye"></v-icon>
                  View
                </v-btn>
              </a>

              <!-- Date Field -->
              <p v-else-if="checkDate(key)" class="text-body-1 font-weight-medium mb-0">
                <v-icon icon="mdi-calendar" size="small" class="mr-1"></v-icon>
                {{ customDateFormat(value) }}
              </p>

              <!-- Status Field -->
              <div v-else-if="checkStatusKey(key)" class="text-body-1 font-weight-medium">
                <v-chip 
                  color="primary" 
                  variant="elevated" 
                  class="text-capitalize"
                  :class="{
                    'bg-success': value === 'completed' || value === 'approved',
                    'bg-error': value === 'rejected' || value === 'cancelled',
                    'bg-warning': value === 'pending' || value === 'in progress'
                  }"
                >
                  <v-icon start size="small" icon="mdi-information-outline"></v-icon>
                  {{ value }}
                </v-chip>
              </div>

              <!-- Default Field -->
              <p v-else class="text-body-1 font-weight-medium mb-0">
                {{ value === '' ? '--' : value }}
              </p>
            </div>
          </div>
        </v-col>

        <!-- Optional custom slot for extra columns -->
        <slot name="customCol" />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.text-subtitle-2 {
  font-size: 0.875rem;
}

.bg-grey-lighten-5 {
  transition: all 0.2s ease;
}

.bg-grey-lighten-5:hover {
  background-color: #f5f5f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.v-chip {
  font-weight: 500;
}

.v-btn {
  text-transform: capitalize;
}
</style>
