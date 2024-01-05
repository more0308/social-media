import { Model } from 'mongoose';

import { AbstractService } from './abstract.service.js';
import ImageModel, { IImageModel } from '../db/models/image.model.js';
import { ImageHostingAbstract } from './imageHosting/imageHosting.abstract.js';
import { CloudinaryService } from './imageHosting/cloudinary.service.js';
import {IMulterFile} from "../interface/multerFile.interface.js";
import {IImageHosting} from "../interface/imageHosting.interface.js";



export class ImageService extends AbstractService {
  protected readonly model: Model<IImageModel> = ImageModel;
  protected readonly hostingService: ImageHostingAbstract = new CloudinaryService();

  /**
   * Upload pictures to hosting.
   * @param images - Pictures from clipboard.
   * @return Promise<IImageHosting[]>
   */
  public async uploads(images: IMulterFile[]): Promise<IImageHosting[]> {
    const uploadedImages: IImageHosting[] = [];

    for (const file of images) {
      uploadedImages.push(await this.upload(file.buffer));
    }

    return uploadedImages;
  }

  /**
   * Upload picture to hosting.
   * @param image - Picture from clipboard
   * @return Promise<IImageHosting>
   */
  public async upload(image: Buffer): Promise<IImageHosting> {
    return await this.hostingService.upload(image)
  }

  /**
   * Save pictures to database.
   * @param images - Array of pictures
   * @return Promise<string[]> - Array with image IDs
   */
  public async save(images: IImageHosting[]): Promise<string[]> {
    const insertedImages = await ImageModel.insertMany(images);
    return insertedImages.map((image) => image._id);
  }
}
