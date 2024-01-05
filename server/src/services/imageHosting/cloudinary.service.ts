import { v2 as cloudinary } from 'cloudinary';
import { config } from '../../config/config.js';
import { ImageHostingAbstract } from './imageHosting.abstract.js';
import { Readable } from 'stream';
import {IImageHosting} from "../../interface/imageHosting.interface.js";

export class CloudinaryService implements ImageHostingAbstract {
  public constructor() {
    cloudinary.config(config.cloudinaryAPI);
  }

  /**
   * Upload photos to Cloudinary hosting
   * @param image - Image to upload
   * @returns Promise<IImageHosting>
   */
  public async upload(image: Buffer): Promise<IImageHosting> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({}, (err, result) => {
        if (err || !result) return reject(err);
        return resolve({ publish_id: result.public_id, url: result.url });
      });

      const readStream = new Readable();
      readStream._read = () => {};
      readStream.push(image);
      readStream.push(null);

      readStream.pipe(uploadStream);
    });
  }
}
