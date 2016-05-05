export default {
  "Query": {
    "user": {
      "type": "User"
    }
  },
  "User": {
    "posts": {
      "type": "Post"
    }
  },
  "Post": {
    "comments": {
      "type": "Comment"
    },
    "user": {
      "type": "User"
    }
  },
  "Comment": {
    "post": {
      "type": "Post"
    }
  }
}