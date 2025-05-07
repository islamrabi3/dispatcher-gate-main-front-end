<template>
  <v-data-table
    :items="items"
    :headers="headersWithDefaultCols"
    :items-per-page="''"
    @click:row="
      (event: any, item: any) => {
        if (showPage) router.push(`${route.path}/${item.item.id}`)
      }
    "
    class="rounded-lg"
  >
    <template #[`item.actions`]="{ item }">
      <v-container data-name="operations-component" class="d-flex flex-row-reverse">
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn elevation="0" density="compact" icon="mdi-dots-vertical" v-bind="props"> </v-btn>
          </template>

          <v-list>
            <slot name="customOperations" :item="item"></slot>
            <div v-for="(operation, operationIndex) in operations" :key="operationIndex">
              <v-list-item link>
                <v-list-item-title
                  class="font-weight-medium cursor-pointer text-capitalize"
                  @click="$emit(operation, item)"
                >
                  {{ operation }}
                </v-list-item-title>
              </v-list-item>
              <v-divider
                v-if="
                  operations &&
                  operations.length &&
                  checkShowDivider(operationIndex, operations.length - 1)
                "
              />
            </div>
          </v-list>
        </v-menu>
      </v-container>
    </template>
    <template #bottom></template>
    <template #[`item.image_url`]="{ item }">
      <v-img v-if="item" :src="handleImage(item)" width="50"></v-img>
    </template>
    <template #[`item.createdAt`]="{ item }">
      <p>{{ customDateFormat(item.createdAt) }}</p>
    </template>
    <template #[`item.pickupDate`]="{ item }">
      <p>{{ customDateFormat(item.pickupDate) }}</p>
    </template>
    <template #[`item.deliveryDate`]="{ item }">
      <p>{{ customDateFormat(item.deliveryDate) }}</p>
    </template>
    <template #[`item.status`]="{ item }">
      <v-chip color="primary">{{ item.status }}</v-chip>
    </template>
    <template #[`item.isBlocked`]="{ item }">
      <v-chip :color="item.isBlocked ? 'error' : 'success'">{{
        item.isBlocked ? 'yes' : 'no'
      }}</v-chip>
    </template>
    <template #[`item.verificationStatus`]="{ item }">
      <v-chip
        :color="
          item.verificationStatus === 'pending'
            ? 'primary'
            : item.verificationStatus === 'rejected'
              ? 'error'
              : 'success'
        "
        >{{ item.verificationStatus }}</v-chip
      >
    </template>
    <template #[`item.id`]="{ index }">
      <div>{{ index }}</div>
    </template>
    <template #[`header.id`]>
      <div>#</div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router/auto'
import { customDateFormat, setImageUrl } from '@/utils'

const handleImage = (item: any) => {
  return setImageUrl(item.image_url)
}
const router = useRouter()
const route = useRoute()
const props = withDefaults(
  defineProps<{
    headers: any[]
    items: any[]
    operations: string[]
    showPage: boolean
  }>(),
  {
    showPage: true
  }
)

const headersWithDefaultCols = computed(() => {
  return [{ title: 'id', align: 'start', key: 'id' }, ...props.headers]
})

const checkShowDivider = (index: number, lastIndex: number) => {
  return index !== lastIndex
}
</script>

<style scoped></style>
