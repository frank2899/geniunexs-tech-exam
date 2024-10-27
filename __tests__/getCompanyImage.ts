import { getCompanyImage } from '@/lib/utils/getCompanyImage'
import { COMPANY_MOCKUP } from '@/__mockup__/company'

describe('getCompanyImage', () => {
    it('should return the correct path for each company', () => {
        COMPANY_MOCKUP.forEach((company) => {
            const expectedPath = `/companies/${company.toLowerCase()}.png`
            expect(getCompanyImage(company)).toBe(expectedPath)
        })
    })

    it('should return path in lowercase regardless of input case', () => {
        expect(getCompanyImage('META')).toBe('/companies/meta.png')
        expect(getCompanyImage('Plaid')).toBe('/companies/plaid.png')
        expect(getCompanyImage('bOaT')).toBe('/companies/boat.png')
    })
})
