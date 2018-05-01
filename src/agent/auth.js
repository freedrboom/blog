import requests from "./request"

export default {
  current: () => requests.get("/user"),
  login: (account, password) =>
    requests.post("/users/login", { user: { account, password } }),
  register: (username, account, password) =>
    requests.post("/users", { user: { username, account, password } }),
  save: user => requests.put("/user", { user }),
}
