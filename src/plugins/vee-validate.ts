import { defineRule, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import {
  required,
  image,
  min_value,
  max_value,
  email,
  regex,
  mimes,
  min,
  numeric,
  confirmed,
  digits
} from '@vee-validate/rules'

import en from '@vee-validate/i18n/dist/locale/en.json'

// Install English and Arabic locales.
configure({
  generateMessage: localize({
    en
  })
})

// No message specified.
defineRule('required', required)
defineRule('image', image)
defineRule('min_value', min_value)
defineRule('numeric', numeric)
defineRule('max_value', max_value)
defineRule('email', email)
defineRule('regex', regex)
defineRule('min', min)
defineRule('mimes', mimes)
defineRule('digits', digits)

defineRule('confirmed', confirmed)
