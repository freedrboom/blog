import "babel-polyfill"
import { User, Tag, Article, Comment } from "../mongoose/proxy"
import connectMongoose from "../mongoose/connect_mongodb"
import Chance from "chance"
var chance = Chance()
const createUser = () => {
  let userMode = {
    account: chance.word({ length: 5 }),
    password: "111111111",
    email: chance.email(),
    subscribe: chance.bool(),
    profile: chance.paragraph(),
    avatar: chance.avatar({ protocol: "https" }),
    role: 10,
    description: chance.paragraph(),
    location: chance.address(),
    github: chance.url(),
    website: chance.url()
  }
  return User.newAndSave(userMode)
}
const createUsers = async () => {
  for (let i = 0; i < 5; i++) {
    await createUser()
  }
}

const creteTag = user => {
  const data = {
    user,
    name: chance.word({ length: 5 }),
    description: chance.sentence({ words: 5 })
  }
  return Tag.newAndSave(data)
}
const createTags = async () => {
  let users = await User.queryUser()
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 3; j++) {
      await creteTag(users[i]._id)
    }
  }
}
const createArticle = async userId => {
  let tags = await Tag.queryTag({ user: userId })
  let tagIDs = tags.map(value => value._id)
  if (tagIDs.length > 1) {
    tagIDs.sort(() => Math.random() > 0.5)
  }
  const data = {
    user: userId,
    tags: tagIDs.slice(0, tagIDs.length - 1),
    title: chance.sentence({ words: 3 }),
    content: chance.paragraph(),
    cover: ""
  }
  return Article.newAndSave(data)
}
const createArticles = async () => {
  let users = await User.queryUser()
  for (let i = 0; i < users.length; i++) {
    let len = 2 + Math.ceil(Math.random() * 5)
    for (let j = 0; j < len; j++) {
      await createArticle(users[i]._id)
    }
  }
}
const createComment = async article => {
  let tempArtile = await Article.getArticleById(article)
  let allUsers = await User.queryUser()
  let tempUserIDs = allUsers
    .filter(value => value._id !== tempArtile.author)
    .map(val => val._id)
    .sort(() => Math.random() > 0.5)
  const data = {
    user: tempUserIDs[0],
    article,
    type: "article",
    content: chance.paragraph()
  }
  return Comment.newAndSave(data)
}
const createComments = async () => {
  let tempArtiles = await Article.getAllArticle()
  for (let i = 0; i < tempArtiles.length; i++) {
    let len = 6 + Math.ceil(Math.random() * 5)
    for (let j = 0; j < len; j++) {
      await createComment(tempArtiles[i]._id)
    }
  }
}
const run = async () => {
  await createUsers()
  console.log("create users successful")
  await createTags()
  console.log("create tags successful")
  await createArticles()
  console.log("create articles successful")
  await createComments()
  console.log("create comments successful")
}
connectMongoose.then(e => run()).catch(e => console.log(e))
