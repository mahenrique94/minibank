const environment = {
  api: {
    host: process.env.API_HOST || '0.0.0.0',
    port: process.env.API_PORT || 8080,
  },
}

export { environment }
