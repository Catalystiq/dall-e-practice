import {Configuration, OpenAIApi} from 'openai'
import {writeFileSync} from 'fs'
import * as dotenv from 'dotenv'
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const prompt = `A  poker card with a picture of a black hole in the middle`

const result = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    user: "Catalystic",
})

const url = result.data.data[0].url
console.log(url)

//Save Image URL to Disk
const imgResult = await fetch(url)
const blob = await imgResult.blob()
const buffer = Buffer.from(await blob.arrayBuffer())
writeFileSync(`./img/${Date.now()}.png`, buffer)