
<script setup lang="ts">

import axios from 'axios';
import { onMounted, ref } from 'vue'
import { useEmployees } from '../store/employes'

const storeEmployees = useEmployees;

onMounted(() => {
    storeEmployees.getEmployees();
})


const fullname = ref('')
const dep = ref('')
const birthdate = ref('')
const salary = ref('')
const isEditing = ref(false)

const submitEmployee = async () => {
    try {
        if (useEmployees.employe.fullname == '' || useEmployees.employe.dep == '' || useEmployees.employe.birthdate == '' || useEmployees.employe.salary == '') {
            alert('Please fill all the fields')
        } else {
            useEmployees.submitEmployee()
            useEmployees.employe.fullname = ''
            useEmployees.employe.dep = ''
            useEmployees.employe.birthdate = ''
            useEmployees.employe.salary = ''
            useEmployees.getEmployees()
        }
    } catch (err) {
        console.log(err)
    }
}



const editEmployee = async (employee: any) => {
    try {
        isEditing.value = true
        console.log(employee)
        fullname.value = employee.fullname
        dep.value = employee.dep
        birthdate.value = employee.birthdate
        salary.value = employee.salary
    } catch (err) {
        console.log(err)
    }
}

const deleteEmployee = async (employee: any) => {
    if (confirm('Are you sure you want to delete this employee?')) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/employees/${employee.id}/`)
        } catch (err) {
            console.log(err)
        }
    }
}



</script>
<template>
    <div class="content">
        <h2>Hi, this is a employees app</h2>

        <div class="add_form">
            <form v-on:submit.prevent="submitEmployee">
                <input type="text" class="form-control" placeholder="Full name" v-model="useEmployees.employe.fullname">
                <input type="text" class="form-control" placeholder="Department" v-model="useEmployees.employe.dep">
                <input type="text" class="form-control" placeholder="Birth Date" v-model="useEmployees.employe.birthdate">
                <input type="text" class="form-control" placeholder="Salary" v-model="useEmployees.employe.salary">
                <button type="submit" class="btn btn-primary">
                    {{ isEditing ? 'Update' : 'Add' }}
                </button>
            </form>
        </div>

        <div class="list">
            <div class="list_content">
                <h3>Employee List</h3>
                <li v-for="employee in useEmployees.employes" :key="employee.id">
                    <h4>{{ employee.fullname }}</h4>
                    <h4>{{ employee.dep }}</h4>
                    <h4>{{ employee.birthdate }}</h4>
                    <h4>{{ employee.salary }}</h4>
                    <div class="list_buttons">
                        <button @click="editEmployee(employee)" class="btn btn-primary">Edit</button>
                        <button @click="deleteEmployee(employee)" class="btn btn-danger">Delete</button>
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>


<style scoped></style>