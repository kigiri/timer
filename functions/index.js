const functions = require('firebase-functions')
const cors = res => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  return res
}

exports.now = functions.https.onRequest((_, res) => cors(res).send(`${Date.now()}`))
