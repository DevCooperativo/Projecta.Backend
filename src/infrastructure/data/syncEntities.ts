// import ProfessorEntity from "./entityMapping/professorEntityMapping"
// import CoordinatorEntityMapping from "./entityMapping/CoordinatorEntityMapping"
// // import BorrowEntityMapping from "./entityMapping/BorrowEntityMapping"
import FundingNoticeEntity from "./entityMapping/fundingNoticeEntityMapping"
import EquipmentEntity from "./entityMapping/equipmentEntity"
import LaboratoryEntity from "./entityMapping/laboratoryEntity"
import StudentEntity from "./entityMapping/studentEntityMapping"
import ProjectEntity from "./entityMapping/projectEntityMapping"
import ResearcherEntity from "./entityMapping/researcherEntity"
import ProjectCategoryEntity from "./entityMapping/projectCategoryEntityMapping"
import EquipmentCategoryEntityMapping from "./entityMapping/equipmentCategoryEntityMapping"

const syncEntities = async () => {
    // await FundingNoticeEntity.sync()
    // await ProfessorEntity.sync()
    await StudentEntity.sync()
    await LaboratoryEntity.sync()
    // await CoordinatorEntityMapping.sync()
    await ResearcherEntity.sync()
    await ProjectEntity.sync()
    await EquipmentEntity.sync()
    await ProjectCategoryEntity.sync()
    await EquipmentCategoryEntityMapping.sync()
    // await BorrowEntityMapping.sync()


}
// export default syncEntities