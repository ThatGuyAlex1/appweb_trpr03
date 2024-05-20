import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StudentList from '../StudentList.vue'
import { createTestingPinia } from '@pinia/testing'

describe('StudentList.vue', () => {

  it("Peut afficher des étudiants", async () => {

    const students = [
        {"id": 1, "email": "mail@something.com", "name": "name", "password": "passssssss"},
        {"id": 2, "email": "mail2@something.com", "name": "name2", "password": "passssssss222"}
      ];

    const wrapper = mount(StudentList, {
        props:{
            students: students
        },
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })
      const rows = wrapper.findAll('#studentList');
      expect(rows.length).toBe(students.length);

      students.forEach((student, index) => {
        const row = rows[index];
        //aidé de chatGPT
        expect(row.find('td:nth-child(1)').text()).toBe(student.name);
        expect(row.find('td:nth-child(2)').text()).toBe(student.email);
      });
  })

  it("Peut afficher aucun étudiant", async () => {
    const wrapper = mount(StudentList, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })
      const rows = wrapper.findAll('#studentList');
      expect(rows.length).toBe(0);
  })

  it("Sur click du button supprimer, doit émettre un événement.", async () => {
    const students = [
        {"id": 1, "email": "mail@something.com", "name": "name", "password": "passssssss"},
        {"id": 2, "email": "mail2@something.com", "name": "name2", "password": "passssssss222"}
      ];
  
      const wrapper = mount(StudentList, {
        props: {
          students: students
        },
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });
  
      await wrapper.find('button.btn-danger').trigger('click');
  
      expect(wrapper.emitted()).toHaveProperty('deleteStudent')
  })
})
