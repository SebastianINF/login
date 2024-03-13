import cors, {type CorsOptions} from 'cors'

 const corsOption: CorsOptions= {
  origin: 'http://localhost:5173',
  credentials: true
}

export {cors, corsOption}