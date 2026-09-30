import { IsArray, IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export const ENTITY_TYPES = [
  "Activos Físicos",
  "Procesos",
  "Personas",
  "Servicio",
  "Proveedor",
  "Curso (LMS)",
  "Documento",
  "Inventario (WMS)",
  "Laboratorio",
  "Dashboard",
  "Red Transversal",
  "Sitio / Mapa",
];
const DOMAINS = ["PROC", "PTE", "IOT", "GPON", "CC", "LAB", "MNT", "RQ", "OF", "CAM"];
const STATUSES = ["Operativo", "Disponible", "Activo", "Certificado", "En proyecto", "Vigente"];

export class CreateCatalogEntityDto {
  @IsString() @MinLength(3) furCode!: string;

  @IsIn(ENTITY_TYPES) entityType!: string;

  @IsOptional() @IsIn(DOMAINS) domain?: string;

  @IsOptional() @IsString() plantCode?: string;

  /** Etapa D01–D18 (solo activos/procesos). */
  @IsOptional() @IsString() zone?: string;

  @IsString() @MinLength(2) @MaxLength(120) title!: string;

  @IsString() @MaxLength(160) subtitle!: string;

  @IsArray() @IsString({ each: true }) meta!: string[];

  @IsIn(STATUSES) status!: string;

  @IsOptional() @IsString() @MaxLength(40) price?: string;

  @IsOptional() @IsNumber() @Min(0) @Max(5) rating?: number;
}

export class UpdateCatalogEntityDto {
  @IsOptional() @IsIn(ENTITY_TYPES) entityType?: string;
  @IsOptional() @IsIn(DOMAINS) domain?: string | null;
  @IsOptional() @IsString() plantCode?: string | null;
  @IsOptional() @IsString() zone?: string | null;
  @IsOptional() @IsString() @MinLength(2) @MaxLength(120) title?: string;
  @IsOptional() @IsString() @MaxLength(160) subtitle?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) meta?: string[];
  @IsOptional() @IsIn(STATUSES) status?: string;
  @IsOptional() @IsString() @MaxLength(40) price?: string | null;
  @IsOptional() @IsNumber() @Min(0) @Max(5) rating?: number | null;
}
