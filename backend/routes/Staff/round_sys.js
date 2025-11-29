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
router.get('/',async (req,res) => {
    try{
        const [rows] = await db.query(`select * from tb_system order by id_sys desc`)
        res.json(rows)
    }catch(err){
        console.error('Error Get',err)
        res.status(500).json({message:'Error Get'})
    }
})

// API สำหรับ Insert ข้อมูล =============================================
router.post('/',async (req,res) => {
    try{
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`insert into tb_system (day_open,day_out,round_sys,year_sys,status_sys) values (?,?,?,?,?)`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json(rows)
    }catch(err){
        console.error('Error Post',err)
        res.status(500).json({message:'Error Post'})
    }
})


// API สำหรับ Update ข้อมูล =============================================
router.put('/:id_sys',async (req,res) => {
    try{
        const {id_sys} = req.params
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`update tb_system set day_open=?,day_out=?,round_sys=?,year_sys=?,status_sys=? where id_sys='${id_sys}'`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json(rows)
    }catch(err){
        console.error('Error Put',err)
        res.status(500).json({message:'Error Put'})
    }
})

// API สำหรับ Delete ข้อมูล =============================================
router.delete('/:id_sys',async (req,res) => {
    try{
        const {id_sys} = req.params
        const [rows] = await db.query(`delete from tb_system where id_sys='${id_sys}'`)
        res.json(rows)
    }catch(err){
        console.error('Error Delete',err)
        res.status(500).json({message:'Error Delete'})
    }
})

module.exports = router