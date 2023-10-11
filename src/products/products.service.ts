import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async createProduct(productData: Product): Promise<Product> {
    const createdProduct = new this.productModel(productData);
    return createdProduct.save();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getProductById(productId: string): Promise<Product> {
    return this.productModel.findById(productId).exec();
  }

  async updateProduct(
    productId: string,
    productData: Product,
  ): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(productId, productData, { new: true })
      .exec();
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.productModel.findByIdAndRemove(productId).exec();
  }
}
