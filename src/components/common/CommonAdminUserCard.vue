<template>
  <v-col cols="6">
    <v-card class="pa-5" rounded="lg" flat>
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex gap-5">
          <v-avatar :image="setImageUrl(data.image_url)" size="80"></v-avatar>
          <div class="d-flex justify-center flex-column">
            <div class="d-flex justify-start align-center">
              <v-card-title class="text-capitalize font-weight-bold py-0">
                {{ data.name }}
              </v-card-title>
              <div
                v-if="data.isBlocked"
                class="py-1 px-3 bg-red-lighten-5 text-red-darken-2 rounded-xl text-capitalize text-caption"
              >
                blocked
              </div>
            </div>
            <v-card-subtitle>{{ customDateFormat(data.createdAt) }}</v-card-subtitle>
          </div>
        </div>
        <div class="d-flex flex-column justify-end align-end">
          <div>
            <v-btn
              color="secondary"
              prepend-icon="mdi-eye-outline"
              variant="text"
              @click="$emit('view', data.id)"
            >
              view
            </v-btn>
            <v-btn
              v-if="!data.isBlocked"
              color="red"
              prepend-icon="mdi-cancel"
              variant="text"
              :loading="data.blocking"
              @click="$emit('block', data.id)"
            >
              block
            </v-btn>
            <v-btn
              v-else
              color="primary"
              variant="text"
              :loading="data.unblocking"
              @click="$emit('unblock', data.id)"
            >
              unblock
            </v-btn>
          </div>
          <div v-if="!data.verificationStatus">
            <v-btn
              v-if="showVerify"
              color="green"
              prepend-icon="mdi-check"
              variant="text"
              :loading="data.verifying"
              @click="$emit('verify', data.id)"
            >
              verify
            </v-btn>
            <v-btn
              v-if="showReject"
              color="red"
              prepend-icon="mdi-cancel"
              variant="text"
              :loading="data.rejecting"
              @click="$emit('reject', data.id)"
            >
              reject
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import { customDateFormat, setImageUrl } from '@/utils/index'
withDefaults(
  defineProps<{
    data: any
    showReject?: boolean
    showVerify?: boolean
  }>(),
  {
    showVerify: false,
    showReject: false
  }
)
</script>

<style scoped></style>
