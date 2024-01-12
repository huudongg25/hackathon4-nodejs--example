import * as fs from 'fs'

const readFileCommon = (path: string) => {
    const result = fs.readFileSync(path, 'utf-8')
    return JSON.parse(result)
}

export default readFileCommon