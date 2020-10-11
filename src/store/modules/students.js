import axios from 'axios';

const state = {
    student:{},
    students:[],
    isListStudentsErr:false
};

const getters = {
    students: state => state.students,
    isListStudentsErr: state => state.isListStudentsErr,
    student: state => state.student,
};

const actions = {
    async listStudents({ commit }) {
        // state.isListStudentsErr = true
        commit('setListStudentsErr',true);
        const response = await axios.get('http://192.168.0.102:8080/listStudents');
        commit('listStudents',response.data);
        commit('setListStudentsErr',false);
        
        // axios.get('http://192.168.0.102:8080/listStudents')
        //     .then(
        //         response => {state.students=response.data,
        //         state.isListStudentsErr = false},
        //     )
        //     .catch(function (error) {
        //         console.log(error);
        // })
    },
    async findStudentsByName({ commit },studentName) {
        commit('setListStudentsErr',true);
        const response = await axios.post('http://192.168.0.102:8080/findStudentsByName',{
            name:studentName,
        });
        commit('listStudents',response.data);
        commit('setListStudentsErr',false);
    },
    async findStudentById({ commit },id) {
        commit('setListStudentsErr',true);
        const response = await axios.post('http://192.168.0.102:8080/findStudent',{
            id:id,
        });
        commit('modifyStudent',response.data);
        commit('setListStudentsErr',false);
    }
};

const mutations = {
    listStudents:(state,students) => (state.students = students),
    setListStudentsErr: (state,isListStudentsErr) => (state.isListStudentsErr = isListStudentsErr),
    modifyStudent:(state,student) => (state.student = student),
};

export default {
    state,
    getters,
    actions,
    mutations
};