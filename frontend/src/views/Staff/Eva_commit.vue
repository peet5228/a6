<template>
    <v-container fluid class="py-10">
                 <v-card class="pa-4">
                        <h1 class="text-h5 text-center font-weight-bold text-maroon">ตั้งค่ากรรมการ</h1>
                        <p class="text-gray-500 font-weight-bold text-h6">ข้อมูลผู้ถูกประเมิน</p>
                        <p class="text-gray-500 font-weight-bold text-h6">ชื่อ : {{ header.first_name }} {{ header.first_name }}</p>
                        <p class="text-gray-500 font-weight-bold text-h6">รอบการประเมิน : รอบที่ {{ header.round_sys }} ปี {{ header.year_sys }}</p>
                <v-form @submit.prevent="saveMember">
                   
                        <hr class="mt-4">
                        <v-row class="mt-4">
                            <v-col cols="12" md="12" class="text-center"><v-btn type="submit" color="blue" class="w-full text-white">บันทึก</v-btn></v-col>
                        </v-row>
                    </v-form>

                    <br>

                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">กรรมการ</th>
                                <th class="border text-center">ตำแหน่ง</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_commit">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ nameOf(items.id_member) }}</td>
                                <td class="text-center border">{{ items.role }}</td>
                                <td class="text-center border">
                                    <v-btn color="error" class="text-white" size="small" @click="del(items.id_commit)">ลบ</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted,computed } from 'vue';
import { useRoute } from 'vue-router';

const id_eva = useRoute().params.id_eva
const api = import.meta.env?.VITE_BASE_API || 'http://localhost:3001/api/Staff'

const people = ref([])
const header = ref([])
const role = ['ประธาน','กรรมการ','เลขา']
const List = ref([
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
])


const fetch = async () => {
    try{
        const m = await axios.get(`${api}/commit/header/${id_eva}`)
        header.value = m.data
       
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const nameMap = computed( () => Object.fromEntries(people.value.map(p => [p.id_member,p.fullname])) )
const nameOf = (id:number) => nameMap.value[id]

const MEMBER = (idx:number) => {
    const picked = List.value.map( (c,i) => (i !== idx ? c.id_member : null) )
    return people.value.filter()
}

const saveMember = async () =>{
    try{
        if(form.value.id_eva){
            await axios.put(`${api}/eva/${form.value.id_eva}`,form.value)
        }else{
            await axios.post(`${api}/eva`,form.value)
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_eva:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/eva/${id_eva}`)
        await fetch()
        await reset()
    }catch(err){
        console.error('Error Delete',err)
    }
}


onMounted(fetch)

</script>

<style scoped>
.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>