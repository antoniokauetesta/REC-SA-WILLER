import "dotenv/config";
import express from "express";
import { prisma } from "../src/lib/prisma.ts";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            mensagem: "Servidor funcionando!",
            banco: "PostgreSQL conectado!"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao conectar com o banco de dados"
        });
    }
});

app.get("/medicos", async (req, res) => {
    try {
        const medicos = await prisma.medico.findMany({
            include: {
                especialidades: {
                    include: {
                        especialidade: true
                    }
                }
            }
        });

        res.json(medicos);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar médicos"
        });
    }
});

app.get("/medicos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const medico = await prisma.medico.findUnique({
            where: { id },
            include: {
                especialidades: {
                    include: {
                        especialidade: true
                    }
                }
            }
        });

        if (!medico) {
            return res.status(404).json({
                erro: "Médico não encontrado"
            });
        }

        res.json(medico);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar médico"
        });
    }
});

app.post("/medicos", async (req, res) => {
    try {
        const { nome, crm } = req.body;

        const medico = await prisma.medico.create({
            data: {
                nome,
                crm
            }
        });

        res.status(201).json(medico);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao cadastrar médico"
        });
    }
});

app.post("/especialidades", async (req, res) => {
    try {
        const { nome, descricao } = req.body;

        const especialidade = await prisma.especialidade.create({
            data: {
                nome,
                descricao
            }
        });

        res.status(201).json(especialidade);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao cadastrar especialidade"
        });
    }
});

app.post("/medicos/vincular", async (req, res) => {
    try {
        const { medicoId, especialidadeId } = req.body;

        const vinculo = await prisma.medicoEspecialidade.create({
            data: {
                medicoId,
                especialidadeId
            }
        });

        res.status(201).json(vinculo);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao vincular especialidade"
        });
    }
});

app.get("/medicos/:id/especialidades", async (req, res) => {
    try {
        const medicoId = Number(req.params.id);

        const especialidades = await prisma.medicoEspecialidade.findMany({
            where: {
                medicoId
            },
            include: {
                especialidade: true
            }
        });

        res.json(especialidades);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao buscar especialidades"
        });
    }
});

app.put("/medicos", async (req, res) => {
    try {
        const { id, nome, crm } = req.body;

        const medico = await prisma.medico.update({
            where: { id },
            data: {
                nome,
                crm
            }
        });

        res.json(medico);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao atualizar médico"
        });
    }
});

app.put("/especialidades", async (req, res) => {
    try {
        const { id, nome, descricao } = req.body;

        const especialidade = await prisma.especialidade.update({
            where: { id },
            data: {
                nome,
                descricao
            }
        });

        res.json(especialidade);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao atualizar especialidade"
        });
    }
});

app.delete("/medicos/:id/especialidades/:especialidadeId", async (req, res) => {
    try {
        const medicoId = Number(req.params.id);
        const especialidadeId = Number(req.params.especialidadeId);

        await prisma.medicoEspecialidade.delete({
            where: {
                medicoId_especialidadeId: {
                    medicoId,
                    especialidadeId
                }
            }
        });

        res.json({
            mensagem: "Especialidade desvinculada com sucesso!"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao desvincular especialidade"
        });
    }
});

app.delete("/medicos/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.medico.delete({
            where: { id }
        });

        res.json({
            mensagem: "Médico excluído com sucesso!"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: "Erro ao excluir médico"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});