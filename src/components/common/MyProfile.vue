<template>
  <div>
    <v-card min-height="500" flat rounded="lg" class="pa-5">
      <v-col cols="12">
        <v-avatar
          size="150"
          color="primary"
          :image="setImageUrl(profileImage)"
          icon="mdi-account"
        ></v-avatar>
      </v-col>
      <v-col>
        <common-common-show-form :data="dataForm"></common-common-show-form>
      </v-col>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { setImageUrl,  } from '@/utils'
defineProps<{
  profileImage: string
  dataForm: any
}>()
</script>

<style scoped></style>
