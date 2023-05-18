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
        cluster.isMaster ? this.initClusters() : this.initServer()
    }

    initClusters() {
        /**
         * @description - 1 ядро оставляем свободным всегда
         */
        const cpus = this.cCPUs > 1 ? this.cCPUs - 1 : this.cCPUs

        for (let i = 0; i < cpus; i += 1) {
            cluster.fork()
        }

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

const app = new Cluster(server)
