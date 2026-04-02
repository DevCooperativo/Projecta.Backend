import EquipmentDTO from "application/dtos/equipmentDTO";

interface IEquipmentServices {
    GetAllAsync: () => Promise<EquipmentDTO[]>
    GetByIdAsync: (id: number) => Promise<EquipmentDTO | null>
    CreateAsync: (data: EquipmentDTO) => Promise<EquipmentDTO>
    UpdateAsync: (id: number, data: EquipmentDTO) => Promise<EquipmentDTO>
    DeleteAsync: (id: number) => Promise<boolean>
}

export default IEquipmentServices