const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken} = require('../../Middleware/authMiddleware')

router.get('/:id_eva',async (req,res) => {
    try{
        const id_eva = req.params
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s where e.id_eva=? and e.id_member=m.id_member and e.id_sys=s.id_sys order by e.id_eva desc`,
            [id_eva]
        )
        res.json(rows[0])
    }catch(err){
        console.error('GET User Failed',err)
        res.status(500).json({message:'GET User Failed'})
    }
})

router.get('/indicate/:id_eva',async (req,res) => {
    try{
        const id_eva = req.params
        const [topics] = await db.query(`select * from tb_topic`)
        const [indicates] = await db.query(`select * from tb_indicate i,tb_evadetail d where i.id_indicate=d.id_indicate and d.id_eva=? and status_eva=?`,
            [id_eva,1]
        )
        const result = topics.map( t =>({
            ...t,
            indicates:indicates.filter((i) => i.id_topic === t.id_topic)
        }))
        res.json(result)
    }catch(err){
        console.error('GET Topic and Indicate Failed',err)
        res.status(500).json({message:'GET Topic and Indicate Failed'})
    }
})

module.exports = router