module.exports = {
    name: 'ping',
    description: 'Sends a ping!',
    execute(message, args) {
        message.channel.send("Pong!");
    }
}