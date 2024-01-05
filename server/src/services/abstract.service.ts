export abstract class AbstractService {
  protected abstract readonly model: any;

  public async list(filters: any = {}, pageSize = 10, offset = 1) {
    return await this.model.paginate(filters, { page: offset, limit: pageSize, sort: { createdAt: -1 } });
  }

  public async get(filters = {}): Promise<any | null> {
    return this.model.findOne({ $and: [filters] });
  }

  public async create(data: any = {}): Promise<any> {
    return this.model.create(data);
  }

  public async update(filters: any = {}, data: any = {}, withOldModel = false): Promise<any | null> {
    const entityModel = await this.get(filters);

    if (entityModel === null) return null;

    const updatedEntityModel = await this.model.findByIdAndUpdate(entityModel._id, data, { new: true });

    if (withOldModel) {
      return { oldModel: entityModel, updatedModel: updatedEntityModel };
    }

    return updatedEntityModel;
  }
}
