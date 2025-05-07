export const jsonToFormData = (JsonObject: any) => {
  const formData = new FormData()
  for (const key in JsonObject) {
   console.log(JsonObject[key])
    if (Array.isArray(JsonObject[key]) && JsonObject[key].length === 1)
      formData.append(key, JsonObject[key][0])
    else formData.append(key, JsonObject[key])
  }
  return formData
}

export const setImageUrl = (imagePath: string) => {
  return `${import.meta.env.VITE_BASE_URL + imagePath}`
}

export async function createFile(imageUrl: string) {
  const response = await fetch(imageUrl)
  const data = await response.blob()
  const metadata = {
    type: 'image/jpeg'
  }
  return new File([data], 'test.jpg', metadata)
}

interface dateOptions {
  month: string
  day: string
  year: string
}

export const customDateFormat = (
  dateNeedFormat: string,
  dateOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  },
  lang: string = 'en'
) => {
  const date = new Date(dateNeedFormat)

  return date.toLocaleString(lang, dateOptions)
}
