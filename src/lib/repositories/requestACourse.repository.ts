import { CreateRequestACourseDTO } from "@dto/index";
import { RequestACourse, IRequestACourse } from "@models/mongo/requestACourse.model";

class RequestACourseRepository {
  private readonly model = RequestACourse;

  constructor() {}

  /**
   * Crea un nuevo documento de solicitud de curso.
   * @param data DTO con los campos necesarios para crear el documento
   * @returns Documento creado
   */
  async create(data: CreateRequestACourseDTO): Promise<IRequestACourse> {
    const created = await this.model.create(data as Partial<IRequestACourse>);
    return created as unknown as IRequestACourse;
  }
}

export default RequestACourseRepository;
