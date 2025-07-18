import { ref } from "vue";

import { Preferences } from "@capacitor/preferences";

import { Curriculum } from "@/utils/types/curriculum.types";

const curricula = ref<Curriculum[]>([]);

export function useCrudCurriculum() {
  const fetchCurricula = async () => {
    const { value } = await Preferences.get({ key: "curricula" });

    value ? (curricula.value = JSON.parse(value)) : (curricula.value = []);
  };

  const fetchCurriculumById = async (queryId: string) => {
    const { value } = await Preferences.get({ key: "curricula" });
    const curricula: Curriculum[] = value ? JSON.parse(value) : [];

    const curriculum = curricula.find(({ id }) => id === queryId);

    return curriculum;
  };

  const createCurriculum = async (curriculum: Curriculum) => {
    const newCurriculum = {
      ...curriculum,
      id: curriculum.id ?? crypto.randomUUID(),
    };

    curricula.value.push(newCurriculum);

    await Preferences.set({
      key: "curricula",
      value: JSON.stringify(curricula.value),
    });

    await fetchCurricula();
  };

  const updateCurriculum = async (
    id: string,
    updatedCurriculum: Curriculum,
  ) => {
    const index = curricula.value.findIndex((curriculum) =>
      curriculum.id === id
    );

    if (index !== -1) {
      const updatedList = [...curricula.value];

      updatedList[index] = updatedCurriculum;

      curricula.value = updatedList;

      await Preferences.set({
        key: "curricula",
        value: JSON.stringify(updatedList),
      });
    }
  };

  const deleteCurriculum = async (id: string) => {
    const index = curricula.value.findIndex((curriculum) =>
      curriculum.id === id
    );

    if (index !== -1) {
      const updatedCurricula = [...curricula.value];
      updatedCurricula.splice(index, 1);

      curricula.value = updatedCurricula;

      await Preferences.set({
        key: "curricula",
        value: JSON.stringify(updatedCurricula),
      });
    }
  };

  return {
    curricula,
    fetchCurricula,
    fetchCurriculumById,
    createCurriculum,
    updateCurriculum,
    deleteCurriculum,
  };
}
