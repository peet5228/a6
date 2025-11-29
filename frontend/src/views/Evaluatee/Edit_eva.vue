<template>
    <v-container >
        <v-row >
            <v-col cols="12">
                <v-form @submit.prevent="saveMember">
                    <v-card class="pa-4">
                        <h1 class="text-h5 text-center font-weight-bold text-maroon">แก้ไขข้อมูลส่วนตัว</h1>
                        <hr class="mt-4">
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.first_name" :error-messages="error.first_name" label="ชื่อ"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.last_name" :error-messages="error.last_name" label="นามสกุล"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.email" :error-messages="error.email" label="อีเมล"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.username" :error-messages="error.username" label="ชื่อผู้ใช้"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="newPassword" :error-messages="error.newPassword" label="รหัสผ่าน"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="confirmPassword" :error-messages="error.confirmPassword" label="ยืนยันรหัสผ่าน"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-alert>{{ form.role }}</v-alert>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <v-btn type="submit" class="btn-maroon text-white">แก้ไข</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const newPassword = ref('')
const router = useRouter()
const form = ref({
    first_name:'',
    last_name:'',
    email:'',
    username:'',
    password:'',
    role:'',
})
const confirmPassword = ref('')
const error = ref<Record<string,string>>({})
const token = localStorage.getItem('')
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Eva/me`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        form.value = res.data
        newPassword.value = ''
        confirmPassword.value = ''
    }catch(err){
        console.error('โหลดข้อมูลไม่สำเร็จ',err)
    }
}
const saveMember = async () =>{
    try{
        await axios.post(`http://localhost:3001/api/Eva/me`,form.value,{
            headers:{Authorization:`Bearer ${token}`}
        })
        alert('แก้ไขสำเร็จ')
        localStorage.removeItem('token')
        router.push({path:'/login'})
    }catch(err){
        console.error('แก้ไขไม่สำเร็จ',err)
    }
}
onMounted(fetchUser)
</script>

<style scoped>
.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>