const admin_products = require("./admin_products")
// @ponicode
describe("admin_products.getProduct", () => {
    test("0", () => {
        let result = admin_products.getProduct(429, { render: () => true })
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = admin_products.getProduct(429, { render: () => false })
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result = admin_products.getProduct(500, { render: () => true })
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result = admin_products.getProduct(400, { render: () => true })
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = admin_products.getProduct(200, { render: () => true })
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result = admin_products.getProduct(-Infinity, { render: () => true })
        expect(result).toMatchSnapshot()
    })
})
