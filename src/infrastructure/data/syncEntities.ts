import ProfessorEntity from "./entityMapping/professorEntity"
import CoordinatorEntity from "./entityMapping/coordinatorEntity"
// import BorrowEntity from "./entityMapping/borrowEntity"
import FundingNoticeEntity from "./entityMapping/fundingNoticeEntity"
// import ItemEntity from "./entityMapping/itemEntity"
// import LaboratoryEntity from "./entityMapping/laboratoryEntity"
import StudentEntity from "./entityMapping/studentEntity"
import ProjectEntity from "./entityMapping/projectEntity"
import ResearcherEntity from "./entityMapping/researcherEntity"

const syncEntities = async () => {
    // await FundingNoticeEntity.sync()
    await ProfessorEntity.sync()
    // await StudentEntity.sync()
    // await LaboratoryEntity.sync()
    // await CoordinatorEntity.sync()
    // await ResearcherEntity.sync()
    // await ProjectEntity.sync()
    // await ItemEntity.sync()
    // await BorrowEntity.sync()


}
export default syncEntities