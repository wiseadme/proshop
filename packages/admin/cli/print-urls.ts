export const printUrls = {
    name: 'print-urls',
    configureServer(server) {

        server.printUrls = () => {
            console.log('  Proshop dev server is running at:')
            console.log('  Local: http://localhost:3002')

            return server
        }
    }
}
