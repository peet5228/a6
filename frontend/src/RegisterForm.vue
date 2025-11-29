<template>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
            <v-col cols="12" md="8" lg="6">
                <v-form @submit.prevent="saveMember">
                    <v-card class="pa-4">
                        <h1 class="text-h5 text-center font-weight-bold text-maroon">สมัครสมาชิก</h1>
                        <p class="mt-2 text-sm text-center">ระบบประเมินบุคลากรวิทยาลัยเทคนิคน่าน</p>
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
                                <v-text-field v-model="form.password" :error-messages="error.password" label="รหัสผ่าน"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="confirmPassword" :error-messages="error.confirmPassword" label="ยืนยันรหัสผ่าน"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select v-model="form.role" :items="roles" item-title="text" item-value="value" :error-messages="error.role" label="เลือกประเภทสมาชิก"></v-select>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <v-btn type="submit" class="btn-maroon text-white">สมัคร</v-btn>
                                <p class="mt-2 text-sm text-center">มีบัญชีอยู่แล้ว? <router-link to="/login" class="text-maroon"><u>เข้าสู่ระบบ</u></router-link></p>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
const roles = [
    {text:'ฝ่ายบุคลากร',value:'ฝ่ายบุคลากร'},
    {text:'กรรมการประเมิน',value:'กรรมการประเมิน'},
    {text:'ผู้รับการประเมินผล',value:'ผู้รับการประเมินผล'},
]
const saveMember = async () =>{
    try{
        await axios.post(`http://localhost:3001/api/auth/regis`,form.value)
        alert('สมัครสำเร็จ')
        router.push({path:'/login'})
    }catch(err){
        console.error('สมัครไม่สำเร็จ',err)
    }
}
</script>

<style scoped>
.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>