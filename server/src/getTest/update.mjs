import "babel-polyfill"
import { User, Tag, Article, Comment } from "../mongoose/proxy"
import connectMongoose from "../mongoose/connect_mongodb"
import fs from "fs"

const readFiles = (arr = []) => {
  return Promise.all(arr.map(file => readAFile(file)))
}
const readAFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(err, data) {
      console.log(err, data)
      if (err) {
        reject(err)
      } else {
        resolve(data.toString())
      }
    })
  })
}
const updateArticle = async () => {
  let files = await readFiles(["./es6.md"])
  let articles = await Article.getAllArticle()
  for (const article of articles) {
    const data = {
      content: files[0]
    }
    await Article.updateArticle(article._id, data)
  }
}
const run = async () => {
  await updateArticle()
  console.log("update comments successful")
}
connectMongoose.then(e => run()).catch(e => console.log(e))
