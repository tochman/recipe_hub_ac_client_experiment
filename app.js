const acServer = "http://localhost:3000/cable"

cable = ActionCable.createConsumer(acServer)
cable.subscriptions.create({channel: 'NotificationsChannel'}, {
  connected() {
    console.log('connected to WS server')
  },
  received(data) {
    debugger
    console.log(data)
  },

  disconnected() {
    console.log('disconnected from WS server')
  }
})