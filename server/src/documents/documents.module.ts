import { Module, Controller, Get } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

interface FurDocument {
  type: string;
  name: string;
  version: string;
  status: string;
}

@Controller("api/v1/documents")
class DocumentsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list() {
    const records = await this.prisma.furRecord.findMany({
      select: { furCode: true, name: true, domain: true, documents: true },
    });
    return records.flatMap((r) =>
      (r.documents as unknown as FurDocument[]).map((d) => ({
        ...d,
        furCode: r.furCode,
        furName: r.name,
        domain: r.domain,
      }))
    );
  }
}

@Module({
  controllers: [DocumentsController],
  providers: [PrismaService],
})
export class DocumentsModule {}
