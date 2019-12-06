function User(data) {
  this.userId = data.userId
  this.username = data.username
  this.email = data.email
  this.occupation = data.occupation
  this.theme = data.theme
}

function Label(data) {
    this.labelName = data.labelName
    this.color = data.color
    this.icon = data.icon
    this.activated = data.activated
    this.labelId = data.labelId
    this.element = $('<div>', {
        "class": "label",
    }).css({
        backgroundImage: "url(" + this.icon + ")",
        backgroundColor: this.color
    })
}