import BaseModel from "../abstractions/BaseModel";

class FundingNotice extends BaseModel {
    name: string
    fundingAgency: string
    noticeCode: string
    individualValue: number
    constructor(name: string, fundingAgency: string, noticeCode: string, individualValue: number) {
        super()
        this.name = name
        this.fundingAgency = fundingAgency
        this.noticeCode = noticeCode
        this.individualValue = individualValue
    }
}
export default FundingNotice