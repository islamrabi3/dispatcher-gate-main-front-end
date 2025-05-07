<script setup lang="ts">
defineProps<{
  submitting: boolean
}>()

defineEmits<{
  (e: 'submit', data: any): void
}>()
</script>

<template>
  <div>
    <pages-auth-auth-form
      :title="''"
      :paragraph="''"
      :height="760"
      :image="false"
    >
      <template #form>
        <inputs-form-wrapper formId="step5-form" @submit="$emit('submit', $event)">
          <v-row class="py-5">
            <v-col cols="6" class="py-1">
              <inputs-dynamic-input
                type="text"
                jsonKey="agent_name"
                rules="required"
                label="agent name"
              />
            </v-col>
            <v-col cols="6" class="py-1">
              <inputs-dynamic-input
                type="text"
                jsonKey="agent_phone"
                rules="required"
                label="agent phone"
              />
            </v-col>
            <v-col cols="6">
              <inputs-dynamic-input
                type="text"
                jsonKey="agent_email"
                rules="required|email"
                label="agent email"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="text"
                jsonKey="cargo_policy_number"
                rules="required"
                label="cargo policy number"
                place-holder="AUTO123"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="text"
                jsonKey="auto_policy_number"
                rules="required"
                label="auto policy number"
                place-holder="AUTO123"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="text"
                input-type="number"
                jsonKey="deductible"
                rules="required"
                label="deductible"
                place-holder="500"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="text"
                input-type="number"
                jsonKey="cargo_limit"
                rules="required"
                label="cargo limit"
                place-holder="500"
                hint="cargo limit"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="text"
                input-type="number"
                jsonKey="largest_trailer_capacity"
                rules="required"
                label="largest capacity"
                place-holder="500"
                hint="the largest capacity yor vehicle can hold"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="text"
                jsonKey="mc_number"
                rules="required"
                label="mc number"
                place-holder="MC123456"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="text"
                input-type="number"
                jsonKey="in_business_since_year"
                rules="required|digits:4"
                label="in business since"
                place-holder="2023"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="file"
                jsonKey="certificate_of_insurance"
                accept="pdf"
                inner-icon="mdi-paperclip"
                rules="required"
                label="certificate of insurance"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="file"
                jsonKey="w9_form"
                accept="pdf"
                inner-icon="mdi-paperclip"
                rules="required"
                label="w9 form"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="text"
                input-type="number"
                jsonKey="usdot_number"
                accept="pdf"
                rules="required"
                label="usdot number"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="text"
                input-type="date"
                jsonKey="expiration_date"
                accept="pdf"
                inner-icon="mdi-paperclip"
                rules="required"
                label="expiration date"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <inputs-dynamic-input
                type="file"
                jsonKey="usdot_certificate"
                accept="pdf"
                inner-icon="mdi-paperclip"
                rules="required"
                label="usdot certificate"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                variant="flat"
                class="rounded-lg"
                color="primary"
                type="submit"
                form="step5-form"
                :loading="submitting"
                >submit</v-btn
              >
            </v-col>
          </v-row>
        </inputs-form-wrapper>
      </template>
    </pages-auth-auth-form>
  </div>
</template>

<style scoped></style>
