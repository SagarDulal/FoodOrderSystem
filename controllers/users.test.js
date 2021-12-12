const users = require("./users")
// @ponicode
describe("users.getLogin", () => {
    test("0", () => {
        let result = users.getLogin(404, { locals: { user: "George" }, redirect: () => "https://", render: () => true })
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = users.getLogin(400, { locals: { user: "Michael" }, redirect: () => "http://base.com", render: () => true })
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result = users.getLogin(200, { locals: { user: "Edmond" }, redirect: () => "http://base.com", render: () => true })
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result = users.getLogin(200, { locals: { user: "Pierre Edouard" }, redirect: () => "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", render: () => true })
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = users.getLogin(500, { locals: { user: "George" }, redirect: () => "https://croplands.org/app/a/confirm?t=", render: () => true })
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result = users.getLogin(Infinity, { locals: { user: "" }, redirect: () => "", render: () => true })
        expect(result).toMatchSnapshot()
    })
})
