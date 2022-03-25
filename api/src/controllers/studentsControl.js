const getAllStudentsRouter = require('express').Router()

const getOneStudentRouter = require('express').Router()

const getAssiRouter = require('express').Router()

const postUserRouter = require('express').Router()

const updatedUserRouter = require('express').Router()

const updatedProfileRouter = require('express').Router()

const getInterestStudent = require('express').Router()

const getInfoStudent = require('express').Router()

const Profile = require('../db/models/Profile')

const User = require('../db/models/User')

const bcrypt = require('bcrypt')

getAllStudentsRouter.get('/', async (req, res) => {
  const getAllStudents = await Profile.find({}).populate('user_id', {
    name: 1,
    middleName: 1,
    lastName: 1,
    age: 1,
    gender: 1,
    secondSurname: 1,
    role: 1,
    email: 1,
    interestsStudent: 1,
    state: 1
  })
  // .then(getAllStudents => {
  //   if (getAllStudents.length) return res.status(200).send({ getAllStudents })
  //   return res.status(204).json({ message: 'NO CONTENT' })
  // })
  // .catch(err => res.status(500).json({ err }))

  res.json(getAllStudents)
})

getOneStudentRouter.get('/:id', async (req, res) => {
  const getOneStudent = await Profile.find({ user_id: req.params.id })
    .populate('user_id', {
      name: 1,
      middleName: 1,
      lastName: 1,
      secondSurname: 1
    })

  res.json(getOneStudent)
})

getAssiRouter.get('/:id', async (req, res)=>{
  const getAssi = await Profile.find({ user_id: req.params.id }, {assigned: 1})

  res.json(getAssi)
})

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

postUserRouter.post('/', async (req, res) => {
  const profile = {
    gender: req.body.gender,
    actualAge: req.body.actualAge,
    interestsStudent: req.body.interestsStudent,
    assigned: req.body.assigned,
    interests: req.body.interests
  }
  // const gender = (req.body.gender);
  // const actualAge = (req.body.actualAge)

  let { name, email, password, contactNumber, role, cohorte } = req.body
  console.log(name, email, password, contactNumber, role, cohorte)

  if (!name || !email || !password || !role || !contactNumber || !cohorte){
    return res.status(400).json({ msg: 'Please fill in all fields.' })}

  if (!validateEmail(email))
      return res.status(400).json({ msg: 'Invalid emails.' })

  const user = await User.findOne({ email })
  if(user){
    return res.status(400).json({ msg: 'This email already exists.' })
  }

  if (password.length < 6)
      return res
        .status(400)
        .json({ msg: 'Password must be at least 6 characters.' })

  const passwordHash = await bcrypt.hash(password, 12)

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: passwordHash,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    secondSurname: req.body.secondSurname,
    contacNumber: req.body.contacNumber,
    role: req.body.role,
  })

  // await User.create(req.body)

  await newUser.save()
  .then(function (dbProfile) {
      // If we were able to successfully create a Product, send it back to the client
      Profile.create({
        user_id: dbProfile.id,
        gender: profile.gender,
        actualAge: profile.actualAge,
        interestsStudent: profile.interestsStudent,
        assigned: profile.assigned,
        interests: profile.interests
      })
      res.json(dbProfile)
    })

    .catch(function (err) {
      res.json(err)
    })
})

updatedUserRouter.post('/', (req, res) => {
  const body = req.body

  User.updateOne(
    { _id: body.id },
    {
      $set: {
        name: body.name,
        email: body.email,
        password: body.password,
        middleName: body.middleName,
        lastName: body.lastName,
        secondSurname: body.secondSurname,
        contactNumber: body.contactNumber,
        role: body.role,
        avatar: body.avatar,
        program: body.program,
        cohorte: body.cohorte,
        state: body.state
      }
    }
  ).then(function (error, info) {
    if (error) {
      res.json({
        result: false,
        msg: 'No se pudo modificar el usuario',
        error
      })
    } else {
      res.json({
        result: true,
        info: info
      })
    }
  })
})

updatedProfileRouter.post('/:id', async (req, res) => {
  const profile = {
    gender: req.body.gender,
    actualAge: req.body.actualAge,
    interestsStudent: req.body.interestsStudent,
    assigned: req.body.assigned
  }

  const idprofile = await Profile.find(
    { user_id: req.params.id },
    { _id: 1 }
  )

  // console.log(idprofile)

  Profile.updateOne(
    { _id: idprofile[0]._id },
    {
      $set: {
        gender: profile.gender,
        actualAge: profile.actualAge,
        interestsStudent: profile.interestsStudent,
        assigned: profile.assigned
      }
    },
    function (error, info) {
      if (error) {
        res.json({
          resultado: false,
          msg: 'No se pudo modificar el cliente',
          error
        })
      } else {
        res.json({
          result: true,
          info: info
        })
      }
    }
  )
})

getInterestStudent.get('/:id', async (req, res) => {
  const interestsStudent = await Profile.find(
    { user_id: req.params.id },
    { interestsStudent: 1 }
  )
  res.json(interestsStudent)
})

getInfoStudent.get('/', async (req, res) => {
  try {
    const infoProfile = await Profile
      .find({}, { actualAge: 1, assigned: 1, actualAge: 1, gender: 1 ,assigned: 1, interestsStudent: 1 })
      .populate('user_id', { name: 1, email: 1, middleName: 1, lastName: 1, secondSurname: 1, contactNumber: 1, state: 1, program : 1, cohorte: 1, role: 1  })
      
    const infoUser = await User
      .find({role: 1})
     
    const arrayInfoStudents = []

      for (let e = 0; e < infoUser.length; e++) {
        for (let i = 0; i < infoProfile.length; i++) {
          if (
            infoUser[e].email ===
            infoProfile[i].user_id.email
          ) {
            arrayInfoStudents.push(infoProfile[i])
          }
        }
      }
    res.json(arrayInfoStudents)
  } catch (error) {
    next(error)
  }
})


module.exports = {
  getAllStudentsRouter,
  getOneStudentRouter,
  getAssiRouter,
  updatedUserRouter,
  postUserRouter,
  updatedProfileRouter,
  getInterestStudent,
  getInfoStudent
}
