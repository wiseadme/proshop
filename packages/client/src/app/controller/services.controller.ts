import { useProductService } from '@modules/product/service/product.service'
import { useCategoryService } from '@modules/category/service/category.service'
import { useAttributeService } from '@modules/attribute/service/attribute.service'
import { useFilesService } from '@shared/services/files.service'
import { useUnitService } from '@modules/unit/service/unit.service'

export class ServicesController {
  products: ReturnType<typeof useProductService>
  categories: ReturnType<typeof useCategoryService>
  attributes: ReturnType<typeof useAttributeService>
  units: ReturnType<typeof useUnitService>
  files: ReturnType<typeof useFilesService>

  constructor({
    products,
    categories,
    attributes,
    units,
    files
  }){
    this.products = products
    this.categories = categories
    this.attributes = attributes
    this.units = units
    this.files = files

    this.products.add('get:attributes', this.attributes.onGetAttributes.bind(attributes))
    this.products.add('get:categories', this.categories.onGetCategories.bind(categories))
    this.products.add('get:units', this.units.onGetUnits.bind(units))
    this.products.add('create:data', this.files.createFormData.bind(files))
    this.products.add('upload:file', this.files.uploadFile.bind(files))
    this.products.add('update:file', this.files.updateFile.bind(files))
    this.products.add('delete:file', this.files.deleteFile.bind(files))

    this.categories.add('delete:file', this.files.deleteFile.bind(files))
    this.categories.add('upload:file', this.files.uploadFile.bind(files))
    this.categories.add('create:data', this.files.createFormData.bind(files))
  }

  static install(){
    new ServicesController(
      {
        products: useProductService(),
        categories: useCategoryService(),
        attributes: useAttributeService(),
        units: useUnitService(),
        files: useFilesService()
      }
    )
  }
}
