import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

const DOMAINS = ["PROC", "PTE", "IOT", "GPON", "CC", "LAB", "MNT", "RQ", "OF", "CAM"];
const STATUSES = ["Operativo", "En mantenimiento", "Fuera de servicio", "En proyecto"];
const CRITICALITIES = ["Alta", "Media", "Baja"];
const MATURITIES = ["D0", "D1", "D2", "D3", "D4", "D5"];

export class HoldDto {
  @IsIn(["TBC", "HOLD"])
  level!: "TBC" | "HOLD";

  @IsString()
  description!: string;
}

export class CreateFurDto {
  @IsString()
  furCode!: string;

  @IsIn(DOMAINS)
  domain!: string;

  @IsString()
  name!: string;

  @IsString()
  family!: string;

  @IsOptional()
  @IsIn(STATUSES)
  status?: string;

  @IsOptional()
  @IsIn(CRITICALITIES)
  criticality?: string;

  @IsOptional()
  @IsIn(MATURITIES)
  maturity?: string;

  @IsString()
  zone!: string;

  @IsString()
  area!: string;

  @IsString()
  process!: string;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  supplier?: string;
}

export class UpdateFurDto {
  @IsOptional()
  @IsIn(STATUSES)
  status?: string;

  @IsOptional()
  @IsIn(CRITICALITIES)
  criticality?: string;

  @IsOptional()
  @IsIn(MATURITIES)
  maturity?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  dataQualityPercent?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HoldDto)
  holds?: HoldDto[];
}
