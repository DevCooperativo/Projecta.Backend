import CoordinationEntityMapping from "../entityMapping/coordinationEntityMapping";
import AdministratorEntityMapping from "../entityMapping/administratorEntityMapping";
import EquipmentCategoryEntityMapping from "../entityMapping/equipmentCategoryEntityMapping";
import LaboratoryEntity from "../entityMapping/laboratoryEntity";
import ProjectCategoryEntityMapping from "../entityMapping/projectCategoryEntityMapping";
import ProfessorEntityMapping from "../entityMapping/professorEntityMapping";
import StudentEntityMapping from "../entityMapping/studentEntityMapping";
import ProjectEntityMapping from "../entityMapping/projectEntityMapping";
import ResearcherEntityMapping from "../entityMapping/researcherEntityMappping";
import CoordinatorEntityMapping from "../entityMapping/coordinatorEntityMapping";
import EquipmentEntity from "../entityMapping/equipmentEntity";
import BorrowEntityMapping from "../entityMapping/borrowEntityMapping";
import { SequelizeErrorHandler } from "infrastructure/helpers/sequelizeErrorHandler";
import Laboratory from "domain/models/laboratory";
import Project from "domain/models/project";
import Professor from "domain/models/professor";
import Student from "domain/models/student";
import EquipmentCategory from "domain/models/equipmentCategory";
import { Model } from "sequelize";
import Coordination from "domain/models/coordination";
import Equipment from "domain/models/equipment";

class DataSeed {

    public static async run() {
        try {
            await DataSeed.SeedData()
        } catch (ex) {
            SequelizeErrorHandler().throwNormalizedSequelizeError(ex)
        }
    }

    public static async SeedData() {
        const ensureSeeded = async (Model: any, seeds: any[], uniqueKey?: string) => {
            if (!seeds || seeds.length === 0) return [];
            const anyRow = await Model.findOne();
            if (anyRow === null) {
                const created = await Model.bulkCreate(seeds);
                return created;
            }

            const results: any[] = [];
            for (const seed of seeds) {
                let where: any = {};
                if (uniqueKey && seed[uniqueKey] !== undefined) {
                    where[uniqueKey] = seed[uniqueKey];
                } else if (seed.name) {
                    where.name = seed.name;
                } else if (seed.email) {
                    where.email = seed.email;
                } else if (seed.registration) {
                    where.registration = seed.registration;
                }

                let found = null;
                if (Object.keys(where).length > 0) {
                    found = await Model.findOne({ where });
                }
                if (!found) {
                    found = await Model.findOne(); // fallback to any existing record
                }
                if (found) results.push(found);
            }
            return results;
        };

        // 1. Entidades sem dependências
        const coordinationSeeds = [
            { area: "Engenharia de Software", block: "A", description: "Coordenação do curso de Engenharia de Software" },
            { area: "Ciência da Computação", block: "B", description: "Coordenação do curso de Ciência da Computação" },
            { area: "Sistemas de Informação", block: "C", description: "Coordenação do curso de Sistemas de Informação" },
            { area: "Engenharia de Computação", block: "D", description: "Coordenação do curso de Engenharia de Computação" },
        ];
        const coordinations = await ensureSeeded(CoordinationEntityMapping, coordinationSeeds, 'area');

        const adminSeeds = [
            { email: "admin1@projecta.com" },
            { email: "admin2@projecta.com" },
            { email: "admin3@projecta.com" },
            { email: "admin4@projecta.com" },
        ];
        await ensureSeeded(AdministratorEntityMapping, adminSeeds, 'email');

        const equipmentCategorySeeds = [
            { powerSource: "Elétrica", fragile: true, description: "Equipamentos eletrônicos sensíveis a variações de tensão" },
            { powerSource: "Bateria", fragile: false, description: "Equipamentos portáteis alimentados por bateria" },
            { powerSource: "Solar", fragile: true, description: "Equipamentos de captação e conversão de energia solar" },
            { powerSource: "Manual", fragile: false, description: "Equipamentos manuais sem necessidade de fonte de energia" },
        ];
        const equipmentCategories = await ensureSeeded(EquipmentCategoryEntityMapping, equipmentCategorySeeds, 'powerSource');

        const laboratorySeeds = [
            { name: "Laboratório de Redes", maxOccupants: 30, storageSpace: true, description: "Laboratório dedicado a redes de computadores e infraestrutura" },
            { name: "Laboratório de Inteligência Artificial", maxOccupants: 20, storageSpace: false, description: "Laboratório de pesquisa em inteligência artificial e aprendizado de máquina" },
            { name: "Laboratório de Hardware", maxOccupants: 15, storageSpace: true, description: "Laboratório de hardware embarcado e sistemas de controle" },
            { name: "Laboratório de Engenharia de Software", maxOccupants: 25, storageSpace: false, description: "Laboratório de desenvolvimento e qualidade de software" },
        ];
        const laboratories = await ensureSeeded(LaboratoryEntity, laboratorySeeds, 'name');

        const projectCategorySeeds = [
            { name: "Pesquisa Aplicada", commerciallyRelevant: true, area: "Tecnologia", description: "Projetos de pesquisa aplicada com foco em soluções tecnológicas" },
            { name: "Extensão Universitária", commerciallyRelevant: false, area: "Educação", description: "Projetos de extensão com impacto educacional na comunidade" },
            { name: "Inovação Tecnológica", commerciallyRelevant: true, area: "Inovação", description: "Projetos voltados ao desenvolvimento de tecnologias inovadoras" },
            { name: "Desenvolvimento Social", commerciallyRelevant: false, area: "Social", description: "Projetos que aplicam tecnologia para promover desenvolvimento social" },
        ];
        const projectCategories = await ensureSeeded(ProjectCategoryEntityMapping, projectCategorySeeds, 'name');

        // 2. Professor e Student (dependem de Coordination se criados agora)
        const professorSeeds = [
            { name: "Carlos Silva", email: "carlos.silva@projecta.com", telephone: "(11) 99999-1111", registration: "PROF001", coordinationId: (coordinations[0] as Coordination)?.id },
            { name: "Ana Oliveira", email: "ana.oliveira@projecta.com", telephone: "(11) 99999-2222", registration: "PROF002", coordinationId: (coordinations[1] as Coordination)?.id },
            { name: "Roberto Santos", email: "roberto.santos@projecta.com", telephone: "(11) 99999-3333", registration: "PROF003", coordinationId: (coordinations[2] as Coordination)?.id },
            { name: "Fernanda Costa", email: "fernanda.costa@projecta.com", telephone: "(11) 99999-4444", registration: "PROF004", coordinationId: (coordinations[3] as Coordination)?.id },
        ];
        const professors = await ensureSeeded(ProfessorEntityMapping, professorSeeds, 'registration');

        const studentSeeds = [
            { name: "Lucas Pereira", email: "lucas.pereira@aluno.com", registration: "ALU001", birthdate: new Date("2002-03-15"), term: 4, shift: "MORNING" },
            { name: "Mariana Alves", email: "mariana.alves@aluno.com", registration: "ALU002", birthdate: new Date("2001-07-22"), term: 6, shift: "AFTERNOON" },
            { name: "Pedro Ferreira", email: "pedro.ferreira@aluno.com", registration: "ALU003", birthdate: new Date("2003-01-10"), term: 2, shift: "NIGHT" },
            { name: "Julia Lima", email: "julia.lima@aluno.com", registration: "ALU004", birthdate: new Date("2000-11-30"), term: 8, shift: "MORNING" },
        ];
        const students = await ensureSeeded(StudentEntityMapping, studentSeeds, 'registration');

        // 3. Project (depende de Laboratory e ProjectCategory)
        const projectSeeds = [
            { name: "Sistema de Monitoramento IoT", description: "Desenvolvimento de sistema de monitoramento distribuído usando IoT", startDate: new Date("2025-03-01"), status: "Em andamento", laboratoryId: (laboratories[0] as Laboratory)?.id, projectCategoryId: (projectCategories[0] as Project)?.id },
            { name: "Plataforma de Aprendizado Adaptativo", description: "Plataforma de aprendizado adaptativo com inteligência artificial e personalização", startDate: new Date("2025-06-01"), status: "Em andamento", laboratoryId: (laboratories[1] as Laboratory)?.id, projectCategoryId: (projectCategories[1] as Project)?.id },
            { name: "Kit de Robótica Educacional", description: "Desenvolvimento de kit de robótica para uso no ensino fundamental", startDate: new Date("2025-01-15"), endDate: new Date("2025-12-31"), status: "Concluído", laboratoryId: (laboratories[2] as Laboratory)?.id, projectCategoryId: (projectCategories[2] as Project)?.id },
            { name: "Análise de Dados Biomédicos", description: "Análise de grandes volumes de dados biomédicos com aprendizado de máquina", startDate: new Date("2025-09-01"), status: "Planejamento", laboratoryId: (laboratories[3] as Laboratory)?.id, projectCategoryId: (projectCategories[3] as Project)?.id },
        ];
        const projects = await ensureSeeded(ProjectEntityMapping, projectSeeds, 'name');

        // 4. Researcher (depende de Project; Student e Professor opcionais)
        const researcherSeeds = [
            { name: "Pesquisador Alpha", functionName: "Engenheiro de Software", weeklyHours: 20, startDate: new Date("2025-03-01"), projectId: (projects[0] as Project)?.id, studentId: (students[0] as Student)?.id },
            { name: "Pesquisador Beta", functionName: "Cientista de Dados", weeklyHours: 30, startDate: new Date("2025-06-01"), projectId: (projects[1] as Project)?.id, professorId: (professors[1] as Professor)?.id },
            { name: "Pesquisador Gamma", functionName: "Engenheiro de Hardware", weeklyHours: 40, startDate: new Date("2025-01-15"), projectId: (projects[2] as Project)?.id, studentId: (students[2] as Student)?.id },
            { name: "Pesquisador Delta", functionName: "Analista de Dados", weeklyHours: 20, startDate: new Date("2025-09-01"), projectId: (projects[3] as Project)?.id, professorId: (professors[3] as Professor)?.id },
        ];
        await ensureSeeded(ResearcherEntityMapping, researcherSeeds, 'name');

        // 5. Coordinator (depende de Professor e Project)
        const coordinatorSeeds = [
            { area: "Engenharia de Software", startDate: new Date("2025-03-01"), professorId: (professors[0] as Professor)?.id, projectId: (projects[0] as Project)?.id },
            { area: "Inteligência Artificial", startDate: new Date("2025-06-01"), professorId: (professors[1] as Professor)?.id, projectId: (projects[1] as Project)?.id },
            { area: "Robótica e Sistemas Embarcados", startDate: new Date("2025-01-15"), endDate: new Date("2025-12-31"), professorId: (professors[2] as Professor)?.id, projectId: (projects[2] as Project)?.id },
            { area: "Análise e Ciência de Dados", startDate: new Date("2025-09-01"), professorId: (professors[3] as Professor)?.id, projectId: (projects[3] as Project)?.id },
        ];
        await ensureSeeded(CoordinatorEntityMapping, coordinatorSeeds, 'area');

        // 6. Equipment (depende de Project, Laboratory e EquipmentCategory)
        const equipmentSeeds = [
            { name: "Sensor de Temperatura DHT11", laboratoryId: (laboratories[0] as Laboratory)?.id, projectId: (projects[0] as Project)?.id, equipmentCategoryId: (equipmentCategories[0] as EquipmentCategory)?.id },
            { name: "Raspberry Pi 4 Model B 8GB", laboratoryId: (laboratories[1] as Laboratory)?.id, projectId: (projects[1] as Project)?.id, equipmentCategoryId: (equipmentCategories[0] as EquipmentCategory)?.id },
            { name: "Kit Arduino Mega 2560", laboratoryId: (laboratories[2] as Laboratory)?.id, projectId: (projects[2] as Project)?.id, equipmentCategoryId: (equipmentCategories[1] as EquipmentCategory)?.id },
            { name: "GPU NVIDIA RTX 3090 24GB", laboratoryId: (laboratories[3] as Laboratory)?.id, projectId: (projects[3] as Project)?.id, equipmentCategoryId: (equipmentCategories[1] as EquipmentCategory)?.id },
        ];
        const equipments = await ensureSeeded(EquipmentEntity as any, equipmentSeeds, 'name') as any[];

        // 7. Borrow (depende de Item; Student, Professor e Researcher opcionais)
        const borrowSeeds = [
            { equipmentId: (equipments[0] as Equipment)?.id, borrowDate: new Date("2026-01-10"), returnDate: new Date("2026-02-10"), studentId: (students[0] as Student)?.id },
            { equipmentId: (equipments[1] as Equipment)?.id, borrowDate: new Date("2026-01-15"), returnDate: new Date("2026-02-15"), professorId: (professors[1] as Professor)?.id },
            { equipmentId: (equipments[2] as Equipment)?.id, borrowDate: new Date("2026-02-01"), returnDate: new Date("2026-03-01"), studentId: (students[2] as Student)?.id },
            { equipmentId: (equipments[3] as Equipment)?.id, borrowDate: new Date("2026-02-10"), returnDate: new Date("2026-03-10"), studentId: (students[3] as Student)?.id },
        ];
        await ensureSeeded(BorrowEntityMapping, borrowSeeds);
    }
}

export default DataSeed