import {IImageHosting} from "../../interface/imageHosting.interface.js";

export abstract class ImageHostingAbstract {
  /**
   * Upload photos to hosting
   * @param image - Image to upload
   * @returns Promise<IImageHosting>
   */
  abstract upload(image: Buffer): Promise<IImageHosting>;
}
