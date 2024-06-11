Feature('Gender_tests')

async function genderRequest(I, gender, expectedStatus) {
    let errorMessage = 'No enum constant com.coolrocket.app.api.test.qa.Gender.' + gender

    await I.sendGetRequest('/api/test/users?gender=' + gender)

    I.seeResponseCodeIs(expectedStatus)
    if (expectedStatus === 200) {
        I.seeResponseMatchesJsonSchema(joi => {
            return joi.object({
                success: joi.boolean().equal(true),
                errorCode: joi.number().integer().equal(0),
                errorMessage: joi.equal(null),
                result: joi.array().items(joi.number()),
            })
        })
    } else {
        I.seeResponseMatchesJsonSchema(joi => {
            return joi.object({
                timestamp: joi.date(),
                status: joi.number().integer().equal(500),
                error: joi.string().valid('https://http.cat/status/500'),
                message: joi.string().valid(errorMessage),
            })
        })
    }
}

async function checkUsersData(I, gender) {
    await I.sendGetRequest('/api/test/users?gender=' + gender)
    I.seeResponseContainsKeys('idList')

    const data = await I.getResponseData()
    data.idList.forEach(function (value, i) {
        I.sendGetRequest('/api/test/user/' + value)
        I.seeResponseCodeIsSuccessful()
        I.seeResponseContainsJson({user: {gender: gender, id: value}})
    })
}

Scenario('getFemaleList', async ({I}) => {
    await genderRequest(I, 'female', 200)
})

Scenario('checkFemaleList', async ({I}) => {
    await checkUsersData(I, 'female')
})

Scenario('getMaleList', async ({I}) => {
    await genderRequest(I, 'male', 200)
})

Scenario('checkMaleList', async ({I}) => {
    await checkUsersData(I, 'male')
})

Scenario('getInvalidList', async ({I}) => {
    await genderRequest(I, 'Other', 400)
})

Scenario('getUpRegList', async ({I}) => {
    await genderRequest(I, 'Male', 400)
})

Scenario('getEmptyList', async ({I}) => {
    await genderRequest(I, '', 400)
})

Scenario('getGender3List', async ({I}) => {
    await genderRequest(I, 'magic', 400)
})

Scenario('getGender4List', async ({I}) => {
    await genderRequest(I, 'McCloud', 400)
})
