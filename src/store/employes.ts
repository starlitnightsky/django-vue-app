import type {IEmployee} from '../model/model';
import axios from 'axios';

//crear un store para empleados
export const useEmployees = ({
        employes: [] as IEmployee[],
        employe: {} as IEmployee,
        getEmployees: async () => {
                try {
                    const res = await axios.get('http://127.0.0.1:8000/api/employees/')
                    useEmployees.employes = res.data
                } catch (err) {
                    console.log(err)
                }
            },
        submitEmployee : async () => {
                try {
                        const res = await axios.post('http://127.0.0.1:8000/api/employees/', {
                            fullname: useEmployees.employe.fullname,
                            dep: useEmployees.employe.dep,
                            birthdate: useEmployees.employe.birthdate,
                            salary: useEmployees.employe.salary
                        })
                } catch (err) {
                    console.log(err)
                }
            }


        })
//store para empleados