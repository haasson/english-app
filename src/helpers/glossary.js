export const groupGlossary = (glossary) => {
    let today = new Date(Date.now())
    const current = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    }
    let result = {}
    Object.keys(glossary || {}).forEach(key => {
        let item = {...glossary[key], id: key}
        let period = new Date(item.created).getFullYear()

        if (period === current.year && getDate(Date.now()) === getDate(item.created)) {
            period = "today"
        }
        item.period = period
        result[period] ? result[period].push(item) : result[period] = [item]
    })

    return result
}

export const deepCopyGlossary = (glossary) => {
    let newGlossary = {}
    Object.keys(glossary || {}).forEach(period => {
        newGlossary[period] = [...glossary[period]]
    })
    return newGlossary
}

const getDate = (timestamp) => {
    return new Date(timestamp).toString().slice(4,15)
}