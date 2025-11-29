<template>
    <v-container fluid class="py-10">
                 <v-card class="pa-4">
                        <h1 class="text-h5 text-center font-weight-bold text-maroon">จัดการตัวชี้วัด</h1>
                <v-form @submit.prevent="saveMember">
                   
                        <hr class="mt-4">
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-select v-model="form.id_topic" label="หัวข้อ" :items="topic.map(t => ({title:t.name_topic,value:t.id_topic}))" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.name_indicate" label="ชื่อตัวชี้วัด" />
                            </v-col>       
                            <v-col cols="12" md="12">                   
                                <v-textarea rows="3" v-model="form.detail_indicate" label="รายละเอียด" />
                            </v-col>
                            <v-col cols="12" md="6">                   
                                <v-text-field v-model="form.point_indicate" type="number" label="น้ำหนักคะแนน" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select v-model="form.check_indicate" label="ลักษณะตัวเลือกคะแนน" :items="[{title:'มี',value:'y'},{title:'ไม่มี',value:'n'}]" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="submit" color="blue" class="w-full text-white">{{ form.id_indicate ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="reset" color="error" class="w-full text-white">ยกเลิก</v-btn></v-col>
                        </v-row>
                    </v-form>

                    <br>

                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">หัวข้อ</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_topic">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.name_topic }}</td>
                                <td class="text-center border">
                                    <v-btn color="warning" class="text-white" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                    <v-btn color="error" class="text-white" size="small" @click="del(items.id_topic)">ลบ</v-btn>
                                </td>
                            </tr>
                            <tr v-if="result.length === 0">
                                <td class="text-center border text-gray-500" colspan="7">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const api = import.meta.env?.VITE_BASE_API || 'http://localhost:3001/api/Staff'

const result = ref([])
const topic = ref([])

const form = ref({
    id_indicate:null,
    id_topic:'',
    name_indicate:'',
    detail_indicate:'',
    point_indicate:'',
    check_indicate:'',
})

const reset = () => {
    form.value = {
       id_indicate:null,
    id_topic:'',
    name_indicate:'',
    detail_indicate:'',
    point_indicate:'',
    check_indicate:'',
    }
}

const fetch = async () => {
    try{
        const t = await axios.get(`${api}/topic`)
        topic.value = t.data
        const res = await axios.get(`${api}/indicate`)
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
} 

const error = ref<Record<string,string>>({})

function vaildateForm(){
    error.value = {}
    const f = form.value
    if(!f.name_topic)error.value.name_topic='กรุณากรอกชื่อ'
    return Object.keys(error.value).length === 0
}

const saveMember = async () =>{
    if(!vaildateForm())return
    try{
        if(form.value.id_topic){
            await axios.put(`${api}/topic/${form.value.id_topic}`,form.value)
        }else{
            await axios.post(`${api}/topic`,form.value)
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const edit = (items:string) => {
    form.value = {...items}
}

const del = async (id_topic:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/topic/${id_topic}`)
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