import { readFileSync } from "fs"
export const PRIVATE_KEY = readFileSync('private-key.pem', 'utf-8')