module.exports = {
    name: 'ping',
    description: 'sends a ping!',
    execute(message, args) {
        message.channel.send("Pong!");
    }
}