const { findServer } = require('./serverScript')

findServer().then(res => {
  console.log({ res })
}).catch(err => {
  console.log(err)
})

