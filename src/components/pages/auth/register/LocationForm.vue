<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCountries, getCities, getStates } from '@/services/countryCityState'

defineEmits<{
  (e: 'nextStep', data: any): void
}>()

const countries = ref<any>({})
const cities = ref<any>({})
const states = ref<any>({})
const chosenCountry = ref('')
const countriesLoading = ref(true)
const citiesLoading = ref(false)
const statesLoading = ref(false)

onMounted(async () => {
  countries.value = await getCountries()
  countriesLoading.value = false
})
const fetchStates = async ($event: any) => {
  chosenCountry.value = $event
  statesLoading.value = true
  states.value = await getStates({ country: $event })
  statesLoading.value = false
}
const fetchCities = async ($event: any) => {
  citiesLoading.value = true
  cities.value = await getCities({ country: chosenCountry.value, state: $event })
  citiesLoading.value = false
}

defineProps<{
  clientType: 'carrier' | 'shipper'
}>()
</script>

<template>
  <div>
    <pages-auth-auth-form
      :title="'register'"
      :paragraph="'please fill your Personal information'"
      :height="630"
    >
      <template #form>
        <inputs-form-wrapper :form-id="'step2-form'" @submit="$emit('nextStep', $event)">
          <v-row class="py-5">
            <!-- COUNTRIES -->
            <v-col cols="12" class="py-1">
              <inputs-dynamic-input
                type="select"
                jsonKey="country"
                rules="required"
                label="country"
                :items="countries.data?.data"
                item-title="name"
                item-value="name"
                :loading="countriesLoading"
                @get:model-value="fetchStates($event)"
              />
            </v-col>
            <!-- STATES -->
            <v-col cols="6" class="py-1">
              <inputs-dynamic-input
                type="select"
                jsonKey="state"
                rules="required"
                label="state"
                :items="states.data?.data.states"
                item-title="name"
                item-value="name"
                :loading="statesLoading"
                @get:model-value="fetchCities($event)"
              />
            </v-col>
            <!-- CITIES -->
            <v-col cols="6" class="py-1">
              <inputs-dynamic-input
                type="select"
                jsonKey="city"
                rules="required"
                label="city"
                :items="cities.data?.data"
                item-title="name"
                item-value="name"
                :loading="citiesLoading"
              />
            </v-col>
            <v-col cols="12" class="py-1">
              <inputs-dynamic-input
                type="textarea"
                jsonKey="address"
                rules="required"
                label="address"
                hint="enter your home address"
                placeholder="Paul and Mary Moore, 1313 E Main St"
              />
            </v-col>
            <v-col cols="12" class="py-1">
              <inputs-dynamic-input
                type="text"
                jsonKey="zip_code"
                rules="required|numeric|min:5"
                label="zip code"
                hint="enter your nearest post zip code"
                placeholder="21500"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                variant="flat"
                color="primary"
                type="submit"
                block
                form="step2-form"
              >
                next
              </v-btn>
            </v-col>
          </v-row>
        </inputs-form-wrapper>
      </template>
      <template #cardImage>
        <pages-auth-register-card-image :clientType="clientType" />
      </template>
    </pages-auth-auth-form>
  </div>
</template>

<style scoped></style>
