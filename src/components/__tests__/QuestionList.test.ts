import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import QuestionList from '../QuestionListComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { questionService } from '@/services/questionService'

describe('QuestionList.vue', () => {

  it("Peut afficher des questions", async () => {

    const questions = [
        {"id": 1, "studentId": 2, "description": "question1", "priorityLevel": 4, "questionCategoryId": 1},
        {"id": 2, "studentId": 1, "description": "question2", "priorityLevel": 5, "questionCategoryId": 1}
      ];

    const categories = [
        {"id": 1, "name": "Catégory inconnu"}
    ]

    const students = [
        {"id": 1, "email": "gougougaga@what.com", "password": "password", "name": "name1"},
        {"id": 2, "email": "AAAAAAAAAAAAH@what.com", "password": "password", "name": "name2"}
    ]

    const wrapper = mount(QuestionList, {
        props:{
            questions: questions,
            categories: categories,
            students: students,
            isTeacher: true
        },
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })

      const rows = wrapper.findAll('#questionList');
      expect(rows.length).toBe(questions.length);

      questions.forEach((question, index) => {
        const row = rows[index];
        //aidé de chatGPT
        expect(row.find('td:nth-child(1)').text()).toBe(question.description);
        expect(row.find('td:nth-child(2)').text()).toBe(String(question.priorityLevel));
        expect(row.find('td:nth-child(3)').text()).toBe("Catégory inconnu");
        expect(row.find('td:nth-child(4)').text()).toBe(students[question.studentId-1].name);
      });
  })

  it("Peut afficher aucun étudiant", async () => {
    const wrapper = mount(QuestionList, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })
      const rows = wrapper.findAll('#studentList');
      expect(rows.length).toBe(0);
  })

  it("Sur click du button supprimer, doit émettre un événement.", async () => {
    const questions = [
        {"id": 1, "studentId": 2, "description": "question1", "priorityLevel": 4, "questionCategoryId": 2},
        {"id": 2, "studentId": 1, "description": "question2", "priorityLevel": 5, "questionCategoryId": 1}
      ];

    const categories = [
        {"id": 1, "name": "gougougaga"},
        {"id": 2, "name": "AAAAAAAAAAAAH"}
    ]

    const students = [
        {"id": 1, "email": "gougougaga@what.com", "password": "password", "name": "name1"},
        {"id": 2, "email": "AAAAAAAAAAAAH@what.com", "password": "password", "name": "name2"}
    ]

    const wrapper = mount(QuestionList, {
        props:{
            questions: questions,
            categories: categories,
            students: students,
            isTeacher: true
        },
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      })

      const rows = wrapper.findAll('#questionList');
  
      await wrapper.find('button.btn-danger').trigger('click');
  
      expect(wrapper.emitted()).toHaveProperty('deleteQuestion')
  })
})
