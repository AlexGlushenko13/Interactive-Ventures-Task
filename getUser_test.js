Feature('User_tests')

async function checkUserData(I, id, expectedStatus) {
    await I.sendGetRequest('/api/test/user/' + id)
    I.seeResponseCodeIs(expectedStatus)
    if (expectedStatus === 200) {
        I.seeResponseMatchesJsonSchema(joi => {
            return joi.object({
                success: joi.boolean().valid(true),
                errorCode: joi.number().integer().valid(0),
                errorMessage: joi.equal(null),
                result: joi.object({
                    id: joi.number().integer().valid(id),
                    name: joi.string(),
                    gender: joi.string(),
                    age: joi.number(),
                    city: joi.string(),
                    registrationDate: joi.date()
                })
            })
        })
    } else if (expectedStatus === 404) {
        I.seeResponseMatchesJsonSchema(joi => {
            return joi.object({
                success: joi.boolean().valid(false),
                errorCode: joi.number().integer().valid(400),
                errorMessage: joi.equal('NumberFormatException: For input string: ' + id),
                result: joi.equal(null)
            })
        })
    } else {
        I.seeResponseMatchesJsonSchema(joi => {
            return joi.object({
                success: joi.boolean().valid(false),
                errorCode: joi.number().integer().valid(404),
                errorMessage: joi.string(),
                result: joi.equal(null)
            })
        })
    }
}

Scenario('getExistingID', async ({I}) => {
    await checkUserData(I, 15, 200)
})

Scenario('getNonExistingID', async ({I}) => {
    await checkUserData(I, 65000, 404)
})

Scenario('getInvalidID', async ({I}) => {
    await checkUserData(I, 'aa', 400)
})

Scenario('getOutOfRangeID', async ({I}) => {
    await checkUserData(I, -1, 400)
})
