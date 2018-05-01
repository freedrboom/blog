import mongoose from 'mongoose'
mongoose.Promise = global.Promise
const url = 'mongodb://root:toor@localhost:27017/graphql'
const options = {}
export default mongoose.connect(url, options)
