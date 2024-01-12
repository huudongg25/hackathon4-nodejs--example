import * as fs from 'fs'

const writeFileCommon = (path: string, data: any): void => {
    fs.writeFileSync(path, JSON.stringify(data))
}

export default writeFileCommon