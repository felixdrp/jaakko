export function reportError(message = '', deepMessage = '', code = '', uuid = '') {
  return {
    type: 'error',
    message,
    deepMessage,
    code,
    uuid
  }
}
