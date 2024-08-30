import cluster from 'cluster'
import { server } from './server'
import consola from 'consola'
import cCPUs from 'os'
import { Application } from 'express'

class Cluster {
    cCPUs: number
    server: Application

    constructor(server) {
        this.cCPUs = cCPUs.cpus().length
        this.server = server

        this.initApp()
    }

    initApp() {
        cluster.isMaster ? this.initCluster() : this.initServer()
    }

    initCluster() {
        // for (let i = 0; i < this.cCPUs; i += 1) {
        cluster.fork()
        // }

        cluster.on('online', (worker) => {
            consola.success('Worker ' + worker.process.pid + ' is online.')
        })

        cluster.on('exit', (worker, code, signal) => {
            consola.info('worker ' + worker.process.pid + ' died.')
        })
    }

    initServer() {
        this.server.listen()
    }
}

export const app = new Cluster(server)
