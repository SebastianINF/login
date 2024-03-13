import { type RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { pool } from '../config/mysql'
import { PRIVATE_KEY } from '../constants/private'
import { RowDataPacket } from 'mysql2'

// ruta protegida obtener información del usuario
export const getUserInfo: RequestHandler = async (req, res) => {
  console.log('info')
  try {
    // @ts-ignore
    res.json(req?.user)
  } catch (error) {
    res.send(error)
  }
}

// Sign Up
export const postSignUp: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body

    console.log()
    const token = jwt.sign({ username, email }, PRIVATE_KEY, { algorithm: 'HS256' })
    // encryptamos la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

   // validar si el email ya ha sido registrado
    const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    console.log(rows)
    if(rows.length > 2) return res.status(409).json({error: 'Email already registered'})

    // insertamos datos a la base de datos
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES (? , ? , ?);',
      [username, email, hashPassword]
    )

    res.cookie('jwt', token, { httpOnly: true, maxAge: 900000, priority: 'high' })
    res.json({ token })
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getLogin: RequestHandler = async (req, res) => {
  try {
    // @ts-ignore
    if(req.user) return res.status(200).json({data: req.user, token: true})
  } catch (error) {
    res.status(500).json(error) 
  }
}

// Login
export const postLogin: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body
    // se busca al usuario en la base de datos
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT password FROM users WHERE username = ? AND email = ? ;',
      [username, email]
    )

    // se compara las contraseñas
    const hashPassword: string = rows[0].password
    const result = await bcrypt.compare(password, hashPassword)
    // se valida si no tiene
    if (!result) return res.status(401).json({ error: 'Credenciales Invalidas' })

    // se crea el token
    const token = jwt.sign({ username, email }, PRIVATE_KEY, { algorithm: 'HS256' })

    // se manda el token otra vez
    res.cookie('jwt', token, { httpOnly: true, maxAge: 900000, priority: 'high' })
    res.json({ token, message: 'Is Authenticated 👌 !!' })
  } catch (error) {
    res.status(404).json(error)
  }
}

export const deleteLogOut: RequestHandler = (req, res) => {
  res.clearCookie('jwt')
  res.end()
}
