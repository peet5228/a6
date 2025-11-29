<template>
    <v-container fluid class="py-10">
                 <v-card class="pa-4">
                        <h1 class="text-h5 text-center font-weight-bold text-maroon">สถานะการประเมินของกรรมการ</h1>
                    รายชื่อกรรมการประเมิน
                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">กรรมการประเมิน</th>
                                <th class="border text-center">สถานะการประเมิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="text-center border">{{ items.status_commit === 'y' ? 'ประเมินเสร็จสิ้น' : 'ยังไม่ได้ประเมิน' }}</td>
                                <!-- <td class="text-center border">
                                    <v-btn color="success" class="text-white" size="small" @click="add(items.id_eva)">รายละเอียด</v-btn>
                                </td> -->
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
import { useRoute } from 'vue-router';

const id_eva = useRoute().params.id_eva
const api = import.meta.env?.VITE_BASE_API || 'http://localhost:3001/api/Staff'

const result = ref([])


const fetch = async () => {
    try{
      
        const res = await axios.get(`${api}/status/${id_eva}`)
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
} 

const add = (id_eva:number) => {
    router.push({path:`Status2/${id_eva}`})
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