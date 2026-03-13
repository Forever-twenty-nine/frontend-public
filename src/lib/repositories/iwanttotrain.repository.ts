import { CreateIWantToTrainDTO } from "@dto/index";
import { IWantToTrain, IIWantToTrain } from "@models/mongo/iwanttotrain.model";

class IWantToTrainRepository {
  private readonly model = IWantToTrain;

  constructor() {}

  /**
   * Creates a new IWantToTrain document
   * @param data DTO with fields required to create the document
   * @returns Created document
   */
  async create(data: CreateIWantToTrainDTO): Promise<IIWantToTrain> {
    const created = await this.model.create(data as Partial<IIWantToTrain>);
    return created as unknown as IIWantToTrain;
  }
}

export default IWantToTrainRepository;
