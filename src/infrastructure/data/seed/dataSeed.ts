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

class DataSeed {

    public static async run() {
        try {
            await DataSeed.SeedData()
        } catch (ex) {
            SequelizeErrorHandler().throwNormalizedSequelizeError(ex)
        }
    }

    public static async SeedData() {
        // 1. Entidades sem dependências
        const coordinations = await CoordinationEntityMapping.bulkCreate([
            { area: "Engenharia de Software", block: "A", description: "Coordenação do curso de Engenharia de Software" },
            { area: "Ciência da Computação", block: "B", description: "Coordenação do curso de Ciência da Computação" },
            { area: "Sistemas de Informação", block: "C", description: "Coordenação do curso de Sistemas de Informação" },
            { area: "Engenharia de Computação", block: "D", description: "Coordenação do curso de Engenharia de Computação" },
        ]);

        await AdministratorEntityMapping.bulkCreate([
            { email: "admin1@projecta.com" },
            { email: "admin2@projecta.com" },
            { email: "admin3@projecta.com" },
            { email: "admin4@projecta.com" },
        ]);

        const equipmentCategories = await EquipmentCategoryEntityMapping.bulkCreate([
            { powerSource: "Elétrica", fragile: true, description: "Equipamentos eletrônicos sensíveis a variações de tensão" },
            { powerSource: "Bateria", fragile: false, description: "Equipamentos portáteis alimentados por bateria" },
            { powerSource: "Solar", fragile: true, description: "Equipamentos de captação e conversão de energia solar" },
            { powerSource: "Manual", fragile: false, description: "Equipamentos manuais sem necessidade de fonte de energia" },
        ]);

        const laboratories = await LaboratoryEntity.bulkCreate([
            { name: "Laboratório de Redes", maxOccupants: 30, storageSpace: true, description: "Laboratório dedicado a redes de computadores e infraestrutura" },
            { name: "Laboratório de Inteligência Artificial", maxOccupants: 20, storageSpace: false, description: "Laboratório de pesquisa em inteligência artificial e aprendizado de máquina" },
            { name: "Laboratório de Hardware", maxOccupants: 15, storageSpace: true, description: "Laboratório de hardware embarcado e sistemas de controle" },
            { name: "Laboratório de Engenharia de Software", maxOccupants: 25, storageSpace: false, description: "Laboratório de desenvolvimento e qualidade de software" },
        ]);

        const projectCategories = await ProjectCategoryEntityMapping.bulkCreate([
            { name: "Pesquisa Aplicada", commerciallyRelevant: true, area: "Tecnologia", description: "Projetos de pesquisa aplicada com foco em soluções tecnológicas" },
            { name: "Extensão Universitária", commerciallyRelevant: false, area: "Educação", description: "Projetos de extensão com impacto educacional na comunidade" },
            { name: "Inovação Tecnológica", commerciallyRelevant: true, area: "Inovação", description: "Projetos voltados ao desenvolvimento de tecnologias inovadoras" },
            { name: "Desenvolvimento Social", commerciallyRelevant: false, area: "Social", description: "Projetos que aplicam tecnologia para promover desenvolvimento social" },
        ]);

        // 2. Professor e Student (sem FK obrigatória no entity mapping)
        const professors = await ProfessorEntityMapping.bulkCreate([
            { name: "Carlos Silva", email: "carlos.silva@projecta.com", telephone: "(11) 99999-1111", registration: "PROF001" },
            { name: "Ana Oliveira", email: "ana.oliveira@projecta.com", telephone: "(11) 99999-2222", registration: "PROF002" },
            { name: "Roberto Santos", email: "roberto.santos@projecta.com", telephone: "(11) 99999-3333", registration: "PROF003" },
            { name: "Fernanda Costa", email: "fernanda.costa@projecta.com", telephone: "(11) 99999-4444", registration: "PROF004" },
        ]);

        const students = await StudentEntityMapping.bulkCreate([
            { name: "Lucas Pereira", email: "lucas.pereira@aluno.com", registration: "ALU001", birthdate: new Date("2002-03-15"), term: 4, shift: "MORNING" },
            { name: "Mariana Alves", email: "mariana.alves@aluno.com", registration: "ALU002", birthdate: new Date("2001-07-22"), term: 6, shift: "AFTERNOON" },
            { name: "Pedro Ferreira", email: "pedro.ferreira@aluno.com", registration: "ALU003", birthdate: new Date("2003-01-10"), term: 2, shift: "NIGHT" },
            { name: "Julia Lima", email: "julia.lima@aluno.com", registration: "ALU004", birthdate: new Date("2000-11-30"), term: 8, shift: "MORNING" },
        ]);

        // 3. Project (depende de Laboratory e ProjectCategory)
        const projects = await ProjectEntityMapping.bulkCreate([
            { name: "Sistema de Monitoramento IoT", description: "Desenvolvimento de sistema de monitoramento distribuído usando IoT", startDate: new Date("2025-03-01"), status: "Em andamento", laboratoryId: laboratories[0].id, projectCategoryId: projectCategories[0].id },
            { name: "Plataforma de Aprendizado Adaptativo", description: "Plataforma de aprendizado adaptativo com inteligência artificial e personalização", startDate: new Date("2025-06-01"), status: "Em andamento", laboratoryId: laboratories[1].id, projectCategoryId: projectCategories[1].id },
            { name: "Kit de Robótica Educacional", description: "Desenvolvimento de kit de robótica para uso no ensino fundamental", startDate: new Date("2025-01-15"), endDate: new Date("2025-12-31"), status: "Concluído", laboratoryId: laboratories[2].id, projectCategoryId: projectCategories[2].id },
            { name: "Análise de Dados Biomédicos", description: "Análise de grandes volumes de dados biomédicos com aprendizado de máquina", startDate: new Date("2025-09-01"), status: "Planejamento", laboratoryId: laboratories[3].id, projectCategoryId: projectCategories[3].id },
        ]);

        // 4. Researcher (depende de Project; Student e Professor opcionais)
        const researchers = await ResearcherEntityMapping.bulkCreate([
            { name: "Pesquisador Alpha", functionName: "Engenheiro de Software", weeklyHours: 20, startDate: new Date("2025-03-01"), projectId: projects[0].id, studentId: students[0].id },
            { name: "Pesquisador Beta", functionName: "Cientista de Dados", weeklyHours: 30, startDate: new Date("2025-06-01"), projectId: projects[1].id, professorId: professors[1].id },
            { name: "Pesquisador Gamma", functionName: "Engenheiro de Hardware", weeklyHours: 40, startDate: new Date("2025-01-15"), projectId: projects[2].id, studentId: students[2].id },
            { name: "Pesquisador Delta", functionName: "Analista de Dados", weeklyHours: 20, startDate: new Date("2025-09-01"), projectId: projects[3].id, professorId: professors[3].id },
        ]);

        // 5. Coordinator (depende de Professor e Project)
        await CoordinatorEntityMapping.bulkCreate([
            { area: "Engenharia de Software", startDate: new Date("2025-03-01"), professorId: professors[0].id, projectId: projects[0].id },
            { area: "Inteligência Artificial", startDate: new Date("2025-06-01"), professorId: professors[1].id, projectId: projects[1].id },
            { area: "Robótica e Sistemas Embarcados", startDate: new Date("2025-01-15"), endDate: new Date("2025-12-31"), professorId: professors[2].id, projectId: projects[2].id },
            { area: "Análise e Ciência de Dados", startDate: new Date("2025-09-01"), professorId: professors[3].id, projectId: projects[3].id },
        ]);

        // 6. Equipment (depende de Project, Laboratory e EquipmentCategory)
        const equipments = await (EquipmentEntity as any).bulkCreate([
            { name: "Sensor de Temperatura DHT11", laboratoryId: laboratories[0].id, projectId: projects[0].id, equipmentCategoryId: equipmentCategories[0].id },
            { name: "Raspberry Pi 4 Model B 8GB", laboratoryId: laboratories[1].id, projectId: projects[1].id, equipmentCategoryId: equipmentCategories[0].id },
            { name: "Kit Arduino Mega 2560", laboratoryId: laboratories[2].id, projectId: projects[2].id, equipmentCategoryId: equipmentCategories[1].id },
            { name: "GPU NVIDIA RTX 3090 24GB", laboratoryId: laboratories[3].id, projectId: projects[3].id, equipmentCategoryId: equipmentCategories[1].id },
        ]) as any[];

        // 7. Borrow (depende de Item; Student, Professor e Researcher opcionais)
        await BorrowEntityMapping.bulkCreate([
            { equipmentId: equipments[0].id, borrowDate: new Date("2026-01-10"), returnDate: new Date("2026-02-10"), studentId: students[0].id },
            { equipmentId: equipments[1].id, borrowDate: new Date("2026-01-15"), returnDate: new Date("2026-02-15"), professorId: professors[1].id },
            { equipmentId: equipments[2].id, borrowDate: new Date("2026-02-01"), returnDate: new Date("2026-03-01"), researcherId: researchers[2].id },
            { equipmentId: equipments[3].id, borrowDate: new Date("2026-02-10"), returnDate: new Date("2026-03-10"), studentId: students[3].id },
        ]);
    }
}

export default DataSeed