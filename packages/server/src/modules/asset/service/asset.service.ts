import { inject, injectable } from 'inversify'
import { TYPES } from '@common/schemes/di-types'
// Types
import { IAssetsService } from '../types/service'
import { IAssetsRepository } from '../types/repository'
import { IEventBusService } from '@/types/services'

@injectable()
export class AssetService implements IAssetsService {
  constructor(
    @inject(TYPES.REPOSITORIES.IAssetsRepository) private repository: IAssetsRepository,
    @inject(TYPES.SERVICES.IEventBusService) private events: IEventBusService
  ){
    this.addEventListeners()
  }

  async saveFile(req, res){
    return await this.repository.save(req, res)
  }

  async updateFile(updates){
    return await this.repository.update(updates)
  }

  async deleteFile(asset){
    return await this.repository.deleteOne(asset)
  }

  async deleteFiles(id) {
    return await this.repository.deleteAll(id)
  }

  addEventListeners(){
    this.events.on('update:assets', this.updateFile.bind(this))
    this.events.on('delete:option', this.deleteFile.bind(this))
    this.events.on('delete:product', this.deleteFiles.bind(this))
    this.events.on('delete:category', this.deleteFiles.bind(this))
  }
}
