import { server } from './appServer'

server.listen(process.env.SERVER_PORT, () => {
    console.log(
        `⚡️ Server started on port ${process.env.SERVER_PORT}!`,
    );
})