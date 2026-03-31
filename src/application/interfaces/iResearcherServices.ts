import ResearcherDTO from "../dtos/researcherDTO"

interface IResearcherServices {
    GetAllAsync: () => Promise<ResearcherDTO[]>
    GetByIdAsync: (id: number) => Promise<ResearcherDTO | null>
    CreateAsync: (data: ResearcherDTO) => Promise<ResearcherDTO>
    UpdateAsync: (id: number, data: ResearcherDTO) => Promise<ResearcherDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IResearcherServices
