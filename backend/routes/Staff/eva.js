const express = require('express')
const db = require('../../db')
const router = express.Router()

// ============================== Demo ================================
// API สำหรับ Get ข้อมูล =============================================
// router.get('/',async (req,res) => {
//     try{
//         const [rows] = await db.query(``)
//         res.json(rows)
//     }catch(err){
//         console.error('Error Get',err)
//         res.status(500).json({message:'Error Get'})
//     }
// })
// ============================== Demo ================================

// API สำหรับ Get ข้อมูล =============================================
router.get('/round',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_system where status_sys='y' order by id_sys desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

router.get('/eva',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_system,tb_eva,tb_member where tb_eva.id_member=tb_member.id_member and tb_system.id_sys=tb_eva.id_sys and status_eva=1 order by id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

router.get('/',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_system,tb_eva,tb_member where tb_eva.id_member=tb_member.id_member and tb_system.id_sys=tb_eva.id_sys order by id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

router.get('/',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_system,tb_eva,tb_member where tb_eva.id_member=tb_member.id_member and tb_system.id_sys=tb_eva.id_sys and status_eva=1 order by id_eva desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ Insert ข้อมูล =============================================
router.post('/',async (req,res) => {
    try{
        const {day_eva,id_member,id_sys} = req.body
        const [rows] = await db.query(`insert into tb_eva (day_eva,id_member,id_sys,status_eva) values (?,?,?,?)`,[day_eva,id_member,id_sys,1])
        res.json(rows)
    }catch(err){
        console.error('Error Post',err)
        res.status(500).json({message:'Error Post'})
    }
})

// API สำหรับ Update ข้อมูล =============================================
router.put('/:id_eva',async (req,res) => {
    try{
        const {id_eva} = req.params
        const {day_eva,id_member,id_sys} = req.body
        const [rows] = await db.query(`update tb_eva set day_eva=?,id_member=?,id_sys=? where id_eva='${id_eva}'`,[day_eva,id_member,id_sys])
        res.json(rows)
    }catch(err){
        console.error('Error Update',err)
        res.status(500).json({message:'Error Update'})
    }
})

// API สำหรับ Delete ข้อมูล =============================================
router.delete('/:id_eva',async (req,res) => {
    try{
        const {id_eva} = req.params
        const [rows] = await db.query(`delete from tb_eva where id_eva='${id_eva}'`)
        res.json(rows)
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({message:'Error Delete'})
    }
})

module.exports = router