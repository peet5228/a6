<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-2 mt-2">
                        <p>ชื่อ : {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>

                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-2">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <thead class="bg-grey">
                                    <tr>
                                        <th class="border text-center">ตัวชี้วัด</th>
                                        <th class="border text-center">รายละเอียด</th>
                                        <th class="border text-center">น้ำหนักคะแนน</th>
                                        <th class="border text-center">คะแนนเต็ม</th>
                                        <th class="border text-center">คะแนนที่ได้</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="indicate in topic.indicates" :key="indicate.id_indicate">
                                        <td class="border text-center">{{ indicate.name_indicate }}</td>
                                        <td class="border text-center">{{ indicate.detail_indicate }}</td>
                                        <td class="border text-center">{{ indicate.point_indicate }}</td>
                                        <td class="border text-center">{{ indicate.point_indicate*4 }}</td>
                                        <td class="border text-center">{{ indicate.score_member*indicate.point_indicate }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                    <div class="mt-4 text-center">
                        <v-alert type="success" class="text-end pa-2">คะแนนรวมสุทธิ : {{ totalScore }} คะแนน</v-alert>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" type="info">คุณยังไม่ได้กรอกแบบประเมิน</v-alert>
                <v-alert v-else type="warning">คุณกรอกแบบประเมินแล้ว</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
const totalScore = ref(0)
const user = ref({})
const topics = ref([])
const token = localStorage.getItem('token')
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/check_eva`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        user.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ประเมินไม่สำเร็จ',err)
    }
}
const fetchTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/check_eva/indicate`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        topics.value = res.data
        res.data.forEach(score =>
            score.indicates.forEach((i) =>{
                totalScore.value += (i.score_member)*(i.point_indicate)
            })
        )
    }catch(err){
        console.error('โหลดข้อมูลตัวชี้วัดไม่สำเร็จ',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchUser(),fetchTopic()])
})

</script>

<style scoped>

</style>