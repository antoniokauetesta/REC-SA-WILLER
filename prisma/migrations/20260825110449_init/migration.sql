-- CreateTable
CREATE TABLE "Medico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "crm" TEXT NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especialidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Especialidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicoEspecialidade" (
    "id" SERIAL NOT NULL,
    "medicoId" INTEGER NOT NULL,
    "especialidadeId" INTEGER NOT NULL,

    CONSTRAINT "MedicoEspecialidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "MedicoEspecialidade_medicoId_especialidadeId_key" ON "MedicoEspecialidade"("medicoId", "especialidadeId");

-- AddForeignKey
ALTER TABLE "MedicoEspecialidade" ADD CONSTRAINT "MedicoEspecialidade_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicoEspecialidade" ADD CONSTRAINT "MedicoEspecialidade_especialidadeId_fkey" FOREIGN KEY ("especialidadeId") REFERENCES "Especialidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
