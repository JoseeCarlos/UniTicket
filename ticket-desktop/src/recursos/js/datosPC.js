async function obtenerIP() {
  try {
    // eslint-disable-next-line no-undef
    const response = await axios.get('https://api.ipify.org?format=json');
    console.log('IP: ', response);
  } catch (error) {
    console.error(error);
  }
}