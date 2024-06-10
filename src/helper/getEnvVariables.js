export const getEnvVariables = () => {
  import.meta.env
  console.log(import.meta.env.BACKEND_API_URL)
  return {
    ...import.meta.env,
  }
}
